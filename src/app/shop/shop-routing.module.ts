import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [

  {path: '', component: ShopComponent, title: 'Shop'},
  {path: ':id', component: ProductDetailsComponent, title: 'ProductDetails'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
