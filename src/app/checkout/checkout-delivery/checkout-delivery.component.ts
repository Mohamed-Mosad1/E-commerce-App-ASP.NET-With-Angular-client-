import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/Models/delivery';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private _CheckoutService: CheckoutService, private _BasketService:BasketService) {}

  ngOnInit(): void {
    this._CheckoutService.getDeliveryMethods().subscribe({
      next: (res: IDeliveryMethod[]) => {
        console.log(res);
        this.deliveryMethods = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setShippingCost(deliveryMethod: IDeliveryMethod) {
    this._BasketService.setShippingCost(deliveryMethod);
  }


}
