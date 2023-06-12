import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counter: number =0;
  counterChange =new EventEmitter<number>()
  constructor() {}

  onIncrement() {
    this.counter++;
    console.log(this.counter)
    this.counterChange.emit(this.counter);
  }
  onDecrement() {
    this.counter--;
    this.counterChange.emit(this.counter);
    console.log(this.counter)
  }
  onReset() {
    this.counter = 0;
    this.counterChange.emit(this.counter);
    console.log(this.counter)
  }

}
