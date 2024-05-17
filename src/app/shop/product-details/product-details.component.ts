import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/Models/Pagination';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProducts;

  constructor(private _ShopService:ShopService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
this.loadProduct()
  }

  loadProduct(){
    this._ShopService.getProductById(+this._ActivatedRoute.snapshot.paramMap.get('id'))
    .subscribe({
      next: res => {
        this.product = res
      },
      error: err => {
        console.log(err);

      }
    })
  }

}
