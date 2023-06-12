import { Component, OnInit } from '@angular/core';
import { CounterState } from '../state/counter.state';

import { Store } from '@ngrx/store';
import { customIncrement, name } from '../state/counter.action';
import { getName } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-sustome-counter-input',
  templateUrl: './sustome-counter-input.component.html',
  styleUrls: ['./sustome-counter-input.component.css'],
})
export class SustomeCounterInputComponent implements OnInit {
  value: number;
  name$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  Add() {
    this.store.dispatch(customIncrement({ count: +this.value }));
    console.log(this.value);
  }

  ngOnInit(): void {
    this.name$ = this.store.select(getName);
  }

  updateName() {
    this.store.dispatch(name());
  }
}
