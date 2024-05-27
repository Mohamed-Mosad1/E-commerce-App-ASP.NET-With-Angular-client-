import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/Models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:IOrder[];

  constructor(private _OrdersService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._OrdersService.getOrdersForUser().subscribe({
      next: (order: IOrder[]) => {
        this.orders = order;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
