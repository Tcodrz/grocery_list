import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'gl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
  ) { }
  ngOnInit(): void { }
  onLogin() {
    const auth = firebase.auth();
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log(res);
    })
  }
}
