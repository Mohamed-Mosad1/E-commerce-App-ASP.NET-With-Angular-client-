import { IDeliveryMethod } from './../shared/Models/delivery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder, IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.baseUrl;

  constructor(private _HttpClient:HttpClient) { }

  getDeliveryMethods(){
    return this._HttpClient.get(this.baseUrl + 'orders/get-delivery-methods')
    .pipe(
      map((res:IDeliveryMethod[]) =>{
        return res.sort((a, b) => b.cost - a.cost);
      })
    )
  }

  createOrder(order:IOrderToCreate){
    return this._HttpClient.post(this.baseUrl + 'orders/create-order', order);
  }

}
