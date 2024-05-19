import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/Models/Pagination';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProducts;

  constructor(
    private _ShopService: ShopService,
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService
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
}
