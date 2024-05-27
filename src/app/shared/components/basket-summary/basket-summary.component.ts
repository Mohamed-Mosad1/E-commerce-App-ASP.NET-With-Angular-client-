import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../Models/Basket';
import { IOrderItem } from '../../Models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$ :Observable<IBasket>

  constructor(private _BasketService:BasketService) { }

  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>()
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>()
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>()
  @Input() isBasket : boolean = true
  @Input() orderItems = [];
  @Input() isOrder: boolean = false;
  ngOnInit(): void {
    this.basket$ = this._BasketService.basket$
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    this.decrement.emit(item)
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    this.increment.emit(item)
  }

  removeItemFromBasket(item: IBasketItem) {
    this.remove.emit(item)
  }

}
