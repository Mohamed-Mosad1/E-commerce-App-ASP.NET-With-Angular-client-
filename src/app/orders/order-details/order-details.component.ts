import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/shared/Models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  order: IOrder;

  constructor(
    private _OrdersService: OrdersService,
    private _BreadcrumbService: BreadcrumbService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _BreadcrumbService.set('@OrderDetails', ' ');
  }

  ngOnInit(): void {
    const orderId = +this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log(orderId);

    this._OrdersService.getOrderDetailed(orderId).subscribe({
      next: (order:IOrder) => {
        this.order = order;
        console.log(order);
        this._BreadcrumbService.set('@OrderDetails', `Order# ${order.id} - ${order.orderStatus}`);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }


}
