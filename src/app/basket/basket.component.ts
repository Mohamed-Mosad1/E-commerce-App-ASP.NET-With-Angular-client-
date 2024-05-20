import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;

  constructor(private _BasketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this._BasketService.basket$;
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    this._BasketService.incrementBasketItemQuantity(item);
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    this._BasketService.decrementBasketItemQuantity(item);
  }

  removeItemFromBasket(item: IBasketItem) {
    this._BasketService.removeItemFromBasket(item);
  }

  deleteBasket(basket: IBasket) {
    this._BasketService.deleteBasket(basket);
  }

}
