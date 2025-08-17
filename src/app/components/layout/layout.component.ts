import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/header/header.component";
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showLoader: boolean = false;
}
