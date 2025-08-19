import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { IFilm, IPeopleDetailsResponse, ISpeice, IStarship, IVehicle } from '../../common/interfaces/swapi-interfaces';
import { StarwarsService } from '../../services/starwars.service';


@Component({
  selector: 'app-filter-sidebar',
  imports: [MatSelectModule, MatCardModule, MatButtonModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent {
  public movieList?: IFilm[];
  public speiceList?: ISpeice[];
  public vehicleList?: IVehicle[];
  public starshipList?: IStarship[];
  @Input('characterDetails') public starwarPeople?: IPeopleDetailsResponse[] = [];

  constructor(private starwarsService: StarwarsService) {

  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.getFilterData()
  }

  getFilterData() {
    forkJoin({
      moviesData: this.starwarsService.getMovies(),
      speciesData: this.starwarsService.getSpecies(),
      vechileData: this.starwarsService.getVechiles(),
      starshipData: this.starwarsService.getStarships()
    }
    ).subscribe((response: {
      moviesData: IFilm[],
      speciesData: ISpeice[],
      vechileData: IVehicle[],
      starshipData: IStarship[]
    }) => {
      this.movieList = response.moviesData;
      this.speiceList = response.speciesData;
      this.vehicleList = response.vechileData;
      this.starshipList = response.starshipData;
    })
  }


  getAllBirthYears(){

  }

}
