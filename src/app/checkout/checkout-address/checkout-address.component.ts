import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  constructor(private _AccountService:AccountService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {

  }

  saveUserAddress() {
    let currentAddress = this.checkoutForm.get('shippingAddressForm').value;
    this._AccountService.updateUserAddress(currentAddress).subscribe({
      next:(res)=>{
        this._ToastrService.success('Address saved successfully');
      },
      error:(err)=>{
        this._ToastrService.error(err.message);
      }
    });

  }

  get _firstName() {
    return this.checkoutForm.get('shippingAddressForm.firstName');
  }

  get _lastName() {
    return this.checkoutForm.get('shippingAddressForm.lastName');
  }

  get _street() {
    return this.checkoutForm.get('shippingAddressForm.street');
  }

  get _city() {
    return this.checkoutForm.get('shippingAddressForm.city');
  }

  get _state() {
    return this.checkoutForm.get('shippingAddressForm.state');
  }

  get _zipCode() {
    return this.checkoutForm.get('shippingAddressForm.zipCode');
  }


}
