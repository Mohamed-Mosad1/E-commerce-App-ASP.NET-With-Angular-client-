import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Models/Basket';
import { environment } from 'src/environments/environment';
import { IProducts } from '../shared/Models/Pagination';
import { IDeliveryMethod } from '../shared/Models/delivery';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl: string = environment.baseUrl;

  private basketSource = new BehaviorSubject<IBasket>(null);

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);

  basketTotal$ = this.basketTotalSource.asObservable();

  basket$ = this.basketSource.asObservable();

  shipping: number = 0;

  constructor(private _HttpClient: HttpClient) {}

  setShippingCost(delviryMethod:IDeliveryMethod){
    this.shipping = delviryMethod.cost;
    this.calculateTotals();
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex((x) => x.id === item.id);
    basket.basketItems[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex((x) => x.id === item.id);
    if (basket.basketItems[foundItemIndex].quantity > 1) {
      basket.basketItems[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some((x) => x.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this._HttpClient.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error: (error) => console.log(error),
    });
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subTotal = basket.basketItems.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subTotal + shipping;
    this.basketTotalSource.next({shipping, total, subTotal});
  }

  getBasket(id: string) {
    return this._HttpClient.get<IBasket>(this.baseUrl + 'basket?basketId=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this._HttpClient.post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basketSource.next(response);
          this.calculateTotals();
        },
        error: (error) => console.log(error),
      });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProducts, quantity: number = 1) {
    const itemToAdd:IBasketItem = this.mapProductItemToBasketItem(item, quantity);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd, quantity);

    this.setBasket(basket);
  }

  private addOrUpdateItem(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProducts, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      category: item.categoryName,
      productPicture: item.productPicture
    }
  }
}
