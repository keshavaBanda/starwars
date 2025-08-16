import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CharacterTableComponent } from "../character-table/character-table.component";
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";

@Component({
  selector: 'app-people-list',
  imports: [CommonModule, CharacterTableComponent, FilterSidebarComponent],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent {

}
