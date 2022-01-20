import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'gl-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../assets/spinner/spinner.json',
  };
  constructor(
  ) { }
  ngOnInit(): void {
  }
}
