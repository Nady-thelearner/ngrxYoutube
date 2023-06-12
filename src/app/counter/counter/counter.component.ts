import { Component } from '@angular/core';
import { CounterService } from 'src/app/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  constructor(private counterSF: CounterService) {}

  onIncrement() {
    this.counterSF.onIncrement();
  }

  onDecrement() {
    this.counterSF.onDecrement();
  }

  onReset() {
    this.counterSF.onReset();
  }
}
