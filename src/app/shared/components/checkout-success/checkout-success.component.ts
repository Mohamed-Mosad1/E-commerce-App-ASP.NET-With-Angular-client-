import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../Models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  order:IOrder;

  constructor(private _Router: Router) {
    const navigation = _Router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {

  }



}
