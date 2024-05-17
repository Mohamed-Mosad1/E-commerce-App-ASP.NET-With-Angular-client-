import { ShopParams } from './../shared/Models/shopParams';
import { IProducts } from './../shared/Models/Pagination';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { ICategory } from '../shared/Models/Category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;
  products: IProducts[] = [];
  categories: ICategory[] = [];
  shopParams = new ShopParams();
  totalCount: number = 0;
  sortOption = [
    { name: 'Name: ', value: 'Name' },
    { name: 'Price: Max-Min', value: 'PriceDesc' },
    { name: 'Price: Min-Max', value: 'PriceAsc' },
  ];

  constructor(private _shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._shopService.getProduct(this.shopParams).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalCount = res.count;
        this.shopParams.pageNumber = res.pageNumber;
        this.shopParams.pageSize = res.pageSize;
      },
      error: (err) => console.log(err),
    });
  }

  getCategories() {
    this._shopService.getCategory().subscribe({
      next: (res) => {
        this.categories = [{ id: 0, name: 'All', description: '' }, ...res];
      },
      error: (err) => console.log(err),
    });
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: Event) {
    let sortValue = (sort.target as HTMLSelectElement).value;
    this.shopParams.sort = sortValue;
    this.getProducts();
  }

  pageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }


}
