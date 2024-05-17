import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { map } from 'rxjs';
import { ShopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:44392/api/';

  constructor(private _HttpClient: HttpClient) {}

  getProduct(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.categoryId !== 0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this._HttpClient
      .get<IPagination>(this.baseUrl + 'Products/get-all-products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  getCategory() {
    return this._HttpClient.get<ICategory[]>(this.baseUrl + 'Categories');
  }
}
