import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.baseUrl;
  validationErrors: any;

  constructor(private _HttpClient: HttpClient) { }

  ngOnInit(): void {

  }

  get404Error() {
    this._HttpClient.get(this.baseUrl + 'products/999').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    })
  }

  get500Error() {
    this._HttpClient.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    })
  }

  get400Error() {
    this._HttpClient.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    })
  }

  get400ValidationError() {
    this._HttpClient.get(this.baseUrl + 'buggy/badrequest/three').subscribe({
      next: (next) => console.info(next),
      error: (err) => this.validationErrors = err.errors
    })
  }

}
