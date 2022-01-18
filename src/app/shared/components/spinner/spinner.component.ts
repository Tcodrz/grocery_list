import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppState } from 'src/app/state';

@Component({
  selector: 'gl-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../assets/spinner/spinner.json',
  };
  bShowSpinner$: Observable<boolean>;
  constructor(
    private store: Store<AppState>
  ) { }
  ngOnInit(): void {
    this.bShowSpinner$ = this.store.select('app').pipe(map(state => state.loading));
  }
}
