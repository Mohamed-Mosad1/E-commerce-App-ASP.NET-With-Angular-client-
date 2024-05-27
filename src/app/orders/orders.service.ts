import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl:string = environment.baseUrl

  constructor(private _HttpClient:HttpClient) { }

  getOrdersForUser(){
    return this._HttpClient.get(this.baseUrl + 'orders/get-orders-for-user')
  }

  getOrderDetailed(id:number){
    return this._HttpClient.get(this.baseUrl + 'orders/get-order-by-id/' + id)
  }

}
