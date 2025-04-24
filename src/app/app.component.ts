import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './components/grid/grid.component';
import { DialogModule } from 'primeng/dialog';
import { ProductModalComponent } from "./components/product-modal/product-modal.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    GridComponent,
    DialogModule,
    ProductModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'saei-app';
}
