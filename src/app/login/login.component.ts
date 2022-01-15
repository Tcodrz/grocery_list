import { User } from './../core/models/user.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../state';
import * as UsersActions from '../state/users/users.actions'
import { Subscription } from 'rxjs';

enum LinkText {
  Register = 'יש לי חשבון',
  Login = 'אני רוצה להירשם'
}

@Component({
  selector: 'gl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  bShowRegister: boolean;
  subscription: Subscription;
  user: User;
  sTitle: string;
  sLinkText: string;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) { }
  get title(): string { return this.bShowRegister ? 'הרשמה' : 'כניסה' }
  ngOnInit(): void {
    this.subscription = this.store.select('userState').subscribe(state => {
      if (state.bIsLoggedIn) this.router.navigate(['admin', { sUserID: state.user._id }]);
      this.bShowRegister = !state.bIsUser;
      if (!this.bShowRegister) {
        this.user = state.user;
        this.sLinkText = LinkText.Login;
      } else {
        this.sLinkText = LinkText.Register;
      }
      this.initForm();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private initForm(): void {
    this.loginForm = this.fb.group({
      sFirstName: this.bShowRegister ? null : ['', null],
      sLastName: this.bShowRegister ? null : ['', null],
      sEmail: [!this.bShowRegister ? this.user.sEmail : '', null],
      sPassword: ['', null]
    });
  }
  onSubmit(): void {
    if (this.bShowRegister) this.store.dispatch(UsersActions.Register({ payload: this.loginForm.value }));
    else this.store.dispatch(UsersActions.Login({ payload: this.loginForm.value }));
  }
  toggleRegistered(): void {
    this.bShowRegister = !this.bShowRegister;
    this.sLinkText = this.bShowRegister ? 'יש לי חשבון' : 'אני רוצה להירשם';
    if (this.bShowRegister) this.loginForm.patchValue({ sEmail: '' });
  }
}
