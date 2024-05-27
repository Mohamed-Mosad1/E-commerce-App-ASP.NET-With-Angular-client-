import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/Basket';
import { CheckoutService } from '../checkout.service';
import { state } from '@angular/animations';
import { IOrder } from 'src/app/shared/Models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private _CheckoutService: CheckoutService,
    private _BasketService: BasketService,
    private _Router: Router,
    private _ToasterService: ToastrService
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this._BasketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this._CheckoutService.createOrder(orderToCreate).subscribe({
      next: (order: IOrder) => {
        this._ToasterService.success('Order Created Successfully');
        this._BasketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = {state:order}
        this._Router.navigate(['/checkout/success'],navigationExtras);
        console.log(basket);

      },
      error: (err) => {
        console.log(err);
        this._ToasterService.error(err.message);
      },
    }
    )
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('shippingAddressForm').value,
    };
  }


}
