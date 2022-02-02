import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'gl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
  ) { }
  ngOnInit(): void { }
  onLogin() {

    this.auth.user.subscribe(user => console.log(user));

    const auth = firebase.auth();

    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log(res);
    })
    auth.getRedirectResult().then((res) => console.log(res));
  }
}
