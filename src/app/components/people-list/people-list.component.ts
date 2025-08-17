import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";
import { LoaderComponent } from '../../core/loader/loader.component';
import { MatCardModule } from '@angular/material/card';
import { StarwarsService } from '../../services/starwars.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-people-list',
  imports: [
    CommonModule,
    LoaderComponent,
    FilterSidebarComponent,
    MatCardModule,
    MatPaginatorModule,
    RouterModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent {
  starwarPeople: any = [];
  resultData: any = '';
  showLoader: boolean = false;

  constructor(private starwarsService: StarwarsService) {

  }

  ngOnInit() {
    this.showLoader = true;
    this.starwarsService.getAllPeople().subscribe((data: any) => {
      this.resultData = data;
      console.log(data)
      this.starwarPeople = data.results;
      this.showLoader = false;
    })
  }


  pageChange(event: PageEvent) {
    let pageno = event.pageIndex + 1;
    this.showLoader = true;
    this.starwarsService.getNextPage(pageno).subscribe((data: any) => {
      console.log(data)
      this.starwarPeople = data.results;
      this.showLoader = false;
    })

  }
}
