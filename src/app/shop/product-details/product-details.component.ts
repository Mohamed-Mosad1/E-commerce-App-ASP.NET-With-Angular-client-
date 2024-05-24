import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/Models/Pagination';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProducts;
  quantity: number = 1;

  constructor(
    private _ShopService: ShopService,
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService,
    private _BasketService:BasketService
  ) {
    this._BreadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._ShopService
      .getProductById(+this._ActivatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          this.product = res;
          this._BreadcrumbService.set('@productDetails', res.name);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addItemToBasket() {
    this._BasketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
