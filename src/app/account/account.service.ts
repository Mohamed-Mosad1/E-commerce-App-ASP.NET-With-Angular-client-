import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/Models/user';
import { Router } from '@angular/router';
import { IAddress } from '../shared/Models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseUrl;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }


  loadCurrentUser(token:string){
    if(token === null) {
      this.currentUser.next(null);
      return of(null);
    }
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    return this._HttpClient.get(this.baseUrl + 'Account/current-user', {headers:header})
    .pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  login(value:any){
    return this._HttpClient.post(this.baseUrl + 'Account/login', value)
    .pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }


  register(value:any){
    return this._HttpClient.post(this.baseUrl + 'Account/register', value)
    .pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this._Router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this._HttpClient.get<boolean>(this.baseUrl + 'Account/isEmailExist?email=' + email);
  }

  getUserAddress(){
    return this._HttpClient.get<IAddress>(this.baseUrl + 'Account/user-address');
  }

  updateUserAddress(userAddress:IAddress){
    return this._HttpClient.put<IAddress>(this.baseUrl + 'Account/update-user-address', userAddress);
  }

}
