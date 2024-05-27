import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: OrdersComponent, title: 'Orders'},
  {path: ':id', component: OrderDetailsComponent, data: {breadcrumb: {alias: 'OrderDetails'}}, title: 'Order Details'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
