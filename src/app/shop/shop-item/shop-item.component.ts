import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProducts } from 'src/app/shared/Models/Pagination';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() product:IProducts;

  constructor(private _BasketService:BasketService) { }

  ngOnInit(): void {
    console.log();
  }

  addItemsToBasket(){
    this._BasketService.addItemToBasket(this.product);
  }




}
