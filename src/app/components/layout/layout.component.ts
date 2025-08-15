import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/header/header.component";
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";
import { CharacterTableComponent } from "../character-table/character-table.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FilterSidebarComponent, CharacterTableComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
