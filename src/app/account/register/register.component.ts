import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPassword } from 'src/app/shared/Validators/password.validator';
import { ValidateEmailNotToken } from 'src/app/shared/Validators/ValidateEmailNotToken.validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: string[];

  constructor(
    private _AccountService: AccountService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _EmailValidator:ValidateEmailNotToken
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._FormBuilder.group(
      {
        displayName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email],
        [this._EmailValidator.ValidateEmailNotIsToken()]],
        password: ['', [Validators.required, Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [confirmPassword]
      }
    );
  }

  get _displayName() {
    return this.registerForm.get('displayName');
  }
  get _email() {
    return this.registerForm.get('email');
  }
  get _password() {
    return this.registerForm.get('password');
  }
  get _confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    this._AccountService.register(this.registerForm.value).subscribe({
      next: (next) => {
        this._Router.navigateByUrl('/shop');
      },
      error: (err) => {
        this.errors = err.error;
      },
    });
  }
}
