import { Component, Input, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/Models/Pagination';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() product:IProducts;

  constructor() { }

  ngOnInit(): void {
    console.log();

  }

}
