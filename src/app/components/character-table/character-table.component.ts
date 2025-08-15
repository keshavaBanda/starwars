import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-character-table',
  imports: [MatCardModule, MatPaginatorModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss'
})
export class CharacterTableComponent {

}
