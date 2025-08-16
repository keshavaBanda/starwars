import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StarwarsService } from '../../services/starwars.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-table',
  imports: [MatCardModule, MatPaginatorModule, CommonModule, MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss'
})
export class CharacterTableComponent {

  starwarPeople: any = [];
  resultData: any = '';
  showLoader: boolean = false;

  constructor(private starwarsService: StarwarsService) {

  }

  ngOnInit() {
    this.showLoader = true;
    this.starwarsService.getAllPeople().subscribe((data: any) => {
      this.resultData = data;
      this.starwarPeople = data.results;
      this.showLoader = false;
    })
  }

  pageChange(event: PageEvent) {
    console.log("Hey..", event)
    let pageno = event.pageIndex + 1;
    this.showLoader = true;
    this.starwarsService.getNextPage(pageno).subscribe((data: any) => {
      this.starwarPeople = data.results;
      this.showLoader = false;
      // this.starwarPeople.forEach((e:any, index:number) => {
      //   e._id = event.pageIndex * 10 + (index + 1);
      // });
      // console.log("KJkjfsdklf",this.starwarPeople)
    })
  }
}
