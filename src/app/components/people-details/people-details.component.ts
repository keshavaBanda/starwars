import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../core/loader/loader.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IPeopleDetailsResponse, IFilm, IVehicle, ISpeice, IStarship, IPeopleDetails } from '../../common/interfaces/swapi-interfaces';
import { StarwarsService } from '../../services/starwars.service';

@Component({
  selector: 'app-people-details',
  imports: [MatCardModule, MatButtonModule, CommonModule, LoaderComponent],
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.scss'
})
export class PeopleDetailsComponent {

  public peopleId!: string | null;
  public peopleDetails?: IPeopleDetailsResponse;
  public films?: (IFilm | null)[];
  public vehicles?: (IVehicle | null)[];
  public species?: (ISpeice | null)[];
  public starships?: (IStarship | null)[];
  public showLoader?: boolean = false;

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
      this.peopleDetails = data.people;
      this.films = data.films;
      this.vehicles = data.vehicles;
      this.starships = data.starships;
      this.species = data.species;
      this.showLoader = false;
    })
  }
}


