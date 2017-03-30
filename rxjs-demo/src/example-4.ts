/*
  Example 4: Observables and Functional Operators
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const interval$ = new Observable<number>(observer => {
  let count = 1;
  const interval = setInterval(() => {
    observer.next(count++);
  }, 1000);

  return () => {
    clearInterval(interval);
  }
});



const subscription1 = interval$
  .map(value => value * value)
  .subscribe(value => console.log(value));

// ----1----2----3----4--->
//      map => x * x
// ----1----4----9----16--->



const subscription2 = interval$
  .filter(value => value % 2 == 0)
  .subscribe(value => console.log(value));

// ----1----2----3----4--->
//          filter
// ---------2---------4--->



const subscription3 = interval$
  .map(value => value * value)
  .filter(value => value % 2 == 0)
  .subscribe(value => console.log(value));

// ----1----2----3----4---->
//      map => x * x
// ----1----4----9----16--->
//          filter
// ---------4---------16--->



setTimeout(() => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
  subscription3.unsubscribe();
}, 4000);