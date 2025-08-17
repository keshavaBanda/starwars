import { HttpClient } from '@angular/common/http';
import { IPeopleDetailsResponse, StarwarsService } from './../../services/starwars.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../core/loader/loader.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
}

export interface ISpeices {
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
  url: string
}

export interface IVehicles {
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
  url: string
}

export interface IStarships {
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
  url: string
}
export interface IPeopleDetails {
  people: IPeopleDetailsResponse,
  films: (IFilm | null)[],
  species: (ISpeices | null)[],
  vehicles: (IVehicles | null)[],
  starships: (IStarships | null)[]
}

@Component({
  selector: 'app-people-details',
  imports: [MatCardModule, MatButtonModule, CommonModule, LoaderComponent],
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.scss'
})
export class PeopleDetailsComponent {

  public peopleId!: string | null;
  public peopleDetails!: IPeopleDetailsResponse;
  public films!: (IFilm | null)[];
  public vehicles!: (IVehicles | null)[];
  public species!: (ISpeices | null)[];
  public starships!: (IStarships | null)[];
  public showLoader: boolean = false;

  constructor(
    private starwarsService: StarwarsService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.peopleId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.showLoader = true;
    this.starwarsService.getPeopleById(Number(this.peopleId)).subscribe((data: IPeopleDetails) => {
      console.log("Response===>", data);
      this.peopleDetails = data.people;
      this.films = data.films;
      this.vehicles = data.vehicles;
      this.starships = data.starships;
      this.species = data.species;
      console.log(this.peopleDetails)
      this.showLoader = false;

      // const filmRequests = people.films.map((url:string)=> {
      //   const proxyUrl = url.replace('https://swapi.dev/api/', environment.apiUrl)
      //   return this.http.get(proxyUrl)
      // });
      // console.log(filmRequests);

      // forkJoin(filmRequests).subscribe((response: any)=>{
      //   console.log(response)
      // })
    })
  }
}


