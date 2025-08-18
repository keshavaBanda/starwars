import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, forkJoin, from, map, merge, mergeMap, Observable, of, switchMap, tap } from 'rxjs';

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

  getNextPage(page: number): Observable<IPeople> {
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
  speciesData?: ISpeice
}

export interface IPeople {
  count: number,
  next: string,
  previous: string,
  results: IPeopleDetailsResponse[]
}

export interface IFilm {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: string[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
  created: string,
  edited: string,
  url: string
  _id?: number
}

export interface ISpeice {
  name: string,
  classification: string,
  designation: string,
  average_height: string,
  skin_colors: string,
  hair_colors: string,
  eye_colors: string,
  average_lifespan: string,
  homeworld: string,
  language: string,
  people: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number
}

export interface IVehicle {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  vehicle_class: string,
  pilots: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number
}

export interface IStarship {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: string[],
  films: string[],
  created: string
  edited: string,
  url: string,
  _id?: number
}
export interface IPeopleDetails {
  people: IPeopleDetailsResponse,
  films: (IFilm | null)[],
  species: (ISpeice | null)[],
  vehicles: (IVehicle | null)[],
  starships: (IStarship | null)[]
}

export interface IFilmResponse {
  count: number,
  next: null,
  previous: null,
  results: IFilm[]
}

export interface IVehicleResponse {
  count: number,
  next: null,
  previous: null,
  results: IVehicle[]
}
export interface ISpeiceResponse {
  count: number,
  next: null,
  previous: null,
  results: ISpeice[]
}
export interface IStarshipResponse {
  count: number,
  next: null,
  previous: null,
  results: IStarship[]
}

