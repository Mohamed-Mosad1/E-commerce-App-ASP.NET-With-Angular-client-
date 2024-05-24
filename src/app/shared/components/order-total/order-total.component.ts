import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../Models/Basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {

  basketTotals$: Observable<IBasketTotals>;

  constructor(private _BasketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotals$ = this._BasketService.basketTotal$
  }

}
