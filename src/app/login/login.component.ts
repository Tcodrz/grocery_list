import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from './../core/models/user.interface';
import { LoginService } from './../core/services/login.service';

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
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
  ) { }
  get title(): string { return this.bShowRegister ? 'הרשמה' : 'כניסה' }
  get linkText(): string { return this.bShowRegister ? 'יש לי חשבון' : 'אני רוצה להירשם'; }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      sFirstName: ['', null],
      sLastName: ['', null],
      sEmail: ['', null],
      sPassword: ['', null]
    });

    this.loginService.isUser().subscribe(bIsUser => {
      this.bShowRegister = !bIsUser;
    });
    this.loginService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.loginForm.patchValue({ sEmail: user.sEmail });
      }
    });
  }
  ngOnDestroy(): void { }
  onSubmit(): void {
    this.loginService.onLogin(this.loginForm.value, this.bShowRegister);
  }
  toggleRegistered(): void {
    this.bShowRegister = !this.bShowRegister;
    if (this.bShowRegister) this.loginForm.patchValue({ sEmail: '' });
    else if (!!this.user && this.user.sEmail) this.loginForm.patchValue({ sEmail: this.user.sEmail });
  }
}
