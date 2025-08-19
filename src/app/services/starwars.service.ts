import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, forkJoin, from, map, merge, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { IFilm, IFilmResponse, IPeople, IPeopleDetails, IPeopleDetailsResponse, ISpeice, ISpeiceResponse, IStarship, IStarshipResponse, IVehicle, IVehicleResponse } from '../common/interfaces/swapi-interfaces';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  constructor(private http: HttpClient) { }


  getAllPeople(): Observable<IPeople> {
    return this.http.get<IPeople>(`${environment.apiUrl}people/`)
      .pipe(map((ele: IPeople) => {
        ele.results.map((e: IPeopleDetailsResponse, index: number) => {
          e._id = (1 - 1) * 10 + (index + 1);
           forkJoin(
            e.species.map((url: string) => this.http.get<any>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
              catchError((error) => of({ err: error }))
            ))
          ).subscribe((data:any)=>{
            e.speciesData = data;
          })
          
          return e;
        });

        return ele;
      }))
  }

  getNextPage(page: number): Observable<IPeople> {
    return this.http.get<IPeople>(`${environment.apiUrl}people/?page=${page}`)
      .pipe(map((ele: IPeople) => {
        ele.results.map((e: IPeopleDetailsResponse, index: number) => {
          e._id = (page - 1) * 10 + (index + 1);
           forkJoin(
            e.species.map((url: string) => this.http.get<any>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
              catchError((error) => of({ err: error }))
            ))
          ).subscribe((data:any)=>{
            e.speciesData = data;
          })
          
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
            catchError((error) => {
              console.error(url, error)
              return of(null)
            })
          ))
        ) : of([]);

        const species$: Observable<(ISpeice | null)[]> = people.species.length ? forkJoin(
          people.species.map((url: string) => this.http.get<ISpeice>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            catchError((error) => of(null))
          ))
        ) : of([]);

        const vehicles$: Observable<(IVehicle | null)[]> = people.vehicles.length ? forkJoin(
          people.vehicles.map((url: string) => this.http.get<IVehicle>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
            catchError((error) => of(null))
          ))
        ) : of([]);

        const starships$: Observable<(IStarship | null)[]> = people.starships.length ? forkJoin(
          people.starships.map((url: string) => this.http.get<IStarship>(url.replace('https://swapi.dev/api/', environment.apiUrl)).pipe(
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

  getMovies(): Observable<IFilm[]> {
    return this.http.get<IFilmResponse>(`${environment.apiUrl}/films/`).pipe(
      map((res: IFilmResponse) => {
        const result = res.results;
        result.map((e: IFilm, i: number) => {
          e._id = i + 1;
          return e;
        })
        return res.results;
      })
    )
  }

  getSpecies() {
    return this.http.get<ISpeiceResponse>(`${environment.apiUrl}/species/`).pipe(
      map((res: ISpeiceResponse) => {
        const result = res.results;
        result.map((e: ISpeice, i: number) => {
          e._id = i + 1;
          return e;
        })
        return res.results;
      })
    )
  }

  getVechiles() {
    return this.http.get<IVehicleResponse>(`${environment.apiUrl}/vehicles/`).pipe(
      map((res: IVehicleResponse) => {
        const result = res.results;
        result.map((e: IVehicle, i: number) => {
          e._id = i + 1;
          return e;
        })
        return res.results;
      })
    )
  }

  getStarships() {
    return this.http.get<IStarshipResponse>(`${environment.apiUrl}/starships/`).pipe(
      map((res: IStarshipResponse) => {
        const result = res.results;
        result.map((e: IStarship, i: number) => {
          e._id = i + 1;
          return e;
        })
        return res.results;
      })
    )

  }
}