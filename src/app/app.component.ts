import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Commerce';

  constructor(
    private _BasketService: BasketService,
    private _AccountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadBasket();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this._BasketService.getBasket(basketId).subscribe({
        next: () => {
          console.log('Initialized basket');
        },
        error: (error) => console.log(error),
      });
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    // if (token) {
      this._AccountService.loadCurrentUser(token).subscribe({
        next: () => console.log('user loaded successfully'),
        error: (error) => console.log(error),
      });
    // }
  }
}
