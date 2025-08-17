import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, forkJoin, from, map, merge, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { IFilm, IPeopleDetails, ISpeices, IStarships, IVehicles } from '../components/people-details/people-details.component';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  constructor(private http: HttpClient) { }


  getAllPeople(): Observable<IPeople> {
    return this.http.get<IPeople>(`${environment.apiUrl}people/`)
      .pipe(map((ele: IPeople) => {
        ele.results.map((e: IPeopleDetailsResponse, index: number) => {
          e._id = ((1 - 1) * 10 + (index + 1)) as number;
          return e;
        });
        return ele;
      }))
  }

  getNextPage(page: number): Observable<any> {
    return this.http.get<IPeople>(`${environment.apiUrl}people/?page=${page}`)
      .pipe(map((ele: IPeople) => {
        ele.results.map((e: IPeopleDetailsResponse, index: number) => {
          e._id = (page - 1) * 10 + (index + 1);
          return e;
        });
        return ele;
      }))
      // .pipe(
      //   switchMap((response:IPeople))
      // )
      // .pipe(
      //   switchMap((response:IPeople) => from(response.results).pipe(
      //     mergeMap((person: any) => {
      //       if (person.species.length === 0) {
      //         return of({ ...person, speciesData: [] })
      //       }

      //       console.log("Hi...")
      //       forkJoin(
      //         person.species.map((url: string) => this.http.get(url.replace('https://swapi.dev/api/', environment.apiUrl))
      //           .pipe(
      //             map((speciesData) => ({
      //               ...person,
      //               speciesData
      //             }))
      //           ))
      //       )
      //       return response;
      //     })
      //   ))
      // )
  }

  // getNextPage2(page: number): Observable<IPeople> {
  //   return this.http.get<IPeople>(`${environment.apiUrl}people/?page=${page}`)
  //     .pipe(
  //       switchMap((response) => from(response.results).pipe(
  //         mergeMap((person: any) => {
  //           if (person.species.length === 0) {
  //             return of({ ...person, speciesData: [] })
  //           }

  //           return forkJoin(
  //             person.species.map((url: string) => this.http.get(url.replace('https://swapi.dev/api/', environment.apiUrl))
  //               .pipe(
  //                 map((speciesData) => ({
  //                   ...person,
  //                   speciesData
  //                 }))
  //               ))
  //           )
  //         })
  //       ))
  //     )
  // }

  getPeopleById(id: number): Observable<IPeopleDetails> {
    console.log("Calling..")
    return this.http.get<IPeopleDetailsResponse>(`${environment.apiUrl}people/${id}`).pipe(
      switchMap((people: IPeopleDetailsResponse) => {
        const films$: Observable<(IFilm | null)[]> = people.films.length ? forkJoin(
          people.films.map((url: string) => this.http.get<IFilm>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            tap((res) => console.log("Fetched..", url, res)),
            catchError((error) => {
              console.error(url, error)
              return of(null)
            })
          ))
        ) : of([]);

        const species$: Observable<(ISpeices | null)[]> = people.species.length ? forkJoin(
          people.species.map((url: string) => this.http.get<ISpeices>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            catchError((error) => of(null))
          ))
        ) : of([]);

        const vehicles$: Observable<(IVehicles | null)[]> = people.vehicles.length ? forkJoin(
          people.vehicles.map((url: string) => this.http.get<IVehicles>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            catchError((error) => of(null))
          ))
        ) : of([]);

        const starships$: Observable<(IStarships | null)[]> = people.starships.length ? forkJoin(
          people.starships.map((url: string) => this.http.get<IStarships>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            catchError((error) => of(null))
          ))
        ) : of([]);


        return forkJoin({
          people: of(people),
          films: films$,
          species: species$,
          vehicles: vehicles$,
          starships: starships$
        });
      })
    );
  }
}


export interface IPeopleDetailsResponse {
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: "male" | "female",
  homeworld: string,
  films: string[]
  species: [],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number,
  speciesData?: ISpeices
}

export interface IPeople {
  count: number,
  next: string,
  previous: string,
  results: IPeopleDetailsResponse[]
}