import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/Basket';
import { IUser } from 'src/app/shared/Models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$: Observable<IBasket>;
  currentUser$:Observable<IUser>;
  constructor(private _BasketService:BasketService, private _AccountService:AccountService) { }

  ngOnInit(): void {
    this.basket$ = this._BasketService.basket$;
    this.currentUser$ = this._AccountService.currentUser$;
  }

  logout(){
    this._AccountService.logout();
  }


}
