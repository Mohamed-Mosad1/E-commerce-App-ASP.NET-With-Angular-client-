import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Commerce';

  constructor(private _BasketService:BasketService) {}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this._BasketService.getBasket(basketId).subscribe({
        next: () => {console.log('Initialized basket');
        },error: (error) => console.log(error)
      });
    }
  }


}
