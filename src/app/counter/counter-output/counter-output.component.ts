import { Component, OnDestroy, OnInit } from '@angular/core';
import { CounterService } from 'src/app/counter.service';

import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { name } from '../state/counter.action';
import { getCounter } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter!: number;
  counter1!: number;


  counterSubscription: Subscription;
  counter$: Observable<{ counter: number }>;

  constructor(
    private counterSF: CounterService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.counterSubscription = this.counterSF.counterChange.subscribe(
      (counter) => (this.counter = counter)
    );

    // this.counter$ = this.store
    //   .select('counter')

    this.store.select(getCounter).subscribe((data) => {
      this.counter1 = data;
      console.log('counter observable called');
    });
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
