import { Injectable } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { map, of, switchMap, timer } from "rxjs";
import { AccountService } from "src/app/account/account.service";

@Injectable({providedIn: 'root'})

export class ValidateEmailNotToken{
  constructor(private _AccountService:AccountService){}

  ValidateEmailNotIsToken() : AsyncValidatorFn {

    return controls => {
      return timer(1000).pipe(
        switchMap(() => {
          if(!controls.value){
            return of(null);
          }
          return this._AccountService.checkEmailExists(controls.value).pipe(
            map((res) => {
              return res ? {emailExists: true} : null
            })
          )
        })
      )
    }
  }
}

