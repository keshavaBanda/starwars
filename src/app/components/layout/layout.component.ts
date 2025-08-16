import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/header/header.component";
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";
import { CharacterTableComponent } from "../character-table/character-table.component";
import { RouterOutlet } from '@angular/router';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FilterSidebarComponent, CharacterTableComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
