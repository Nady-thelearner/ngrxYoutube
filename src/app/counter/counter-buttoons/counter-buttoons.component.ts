import { Component } from '@angular/core';
import { CounterService } from 'src/app/counter.service';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counter.state';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-buttoons',
  templateUrl: './counter-buttoons.component.html',
  styleUrls: ['./counter-buttoons.component.css'],
})
export class CounterButtoonsComponent {
  constructor(
    private counterSF: CounterService,
    private store: Store<AppState>
  ) {}

  increment() {
    this.counterSF.onIncrement();
    this.store.dispatch(increment());
  }
  decrement() {
    this.counterSF.onDecrement();
    this.store.dispatch(decrement());
  }
  reset() {
    this.counterSF.onReset();
    this.store.dispatch(reset());
  }
}
