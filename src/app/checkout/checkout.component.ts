import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/Models/Basket';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private _FormBuilder:FormBuilder, private _AccountService:AccountService,private _BasketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotals$ = this._BasketService.basketTotal$
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    return this.checkoutForm = this._FormBuilder.group({
      shippingAddressForm: this._FormBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      deliveryForm: this._FormBuilder.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymentForm: this._FormBuilder.group({
        nameOnCard: ['', Validators.required]
      })
    })
  }

  getAddressFormValues() {
    this._AccountService.getUserAddress().subscribe({
      next: (userAddress) => {
        this.checkoutForm.get('shippingAddressForm').patchValue(userAddress);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
