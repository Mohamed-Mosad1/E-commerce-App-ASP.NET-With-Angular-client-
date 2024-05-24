import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private _AccountService: AccountService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.returnUrl = this._ActivatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")]]
    });
  }

  get _email() {
    return this.loginForm.get('email');
  }

  get _password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if(this.loginForm.valid){
      this._AccountService.login(this.loginForm.value).subscribe({
        next: (next) => {
          this._Router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
