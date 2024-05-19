import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderRequestCount:number = 0;

  constructor(private _NgxSpinnerService:NgxSpinnerService) { }

  show(){
    this.loaderRequestCount++;
    this._NgxSpinnerService.show(undefined, {
      type: 'ball-spin-fade',
      bdColor: 'rgba(255, 255, 255, 0.7)',
      color: '#e30808',
      size: 'medium',
    });
  }

  hide(){
    this.loaderRequestCount--;
    if(this.loaderRequestCount <= 0){
      this.loaderRequestCount = 0;
      this._NgxSpinnerService.hide();
    }
  }

}
