import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSuccessComponent } from '../shared/components/checkout-success/checkout-success.component';

const routes = [
  {path: '', component: CheckoutComponent, title: 'Checkout'},
  {path: 'success', component: CheckoutSuccessComponent, title: 'Checkout Success'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
