import { Component } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  productCount: number = 0;

  constructor(private shopService: ShopService) {
    this.shopService.$productCount.subscribe(count => this.productCount = count)
  }

}
