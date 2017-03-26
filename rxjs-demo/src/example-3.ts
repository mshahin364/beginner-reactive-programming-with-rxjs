/*
  Example 3: Observables and Multiple Values
*/

import { Observable } from 'rxjs/Observable';

const observable = new Observable(observer => {
  let count = 0;
  const interval = setInterval(() => {
    observer.next(count++);
  }, 1000);

  return () => {
    clearInterval(interval);
  }
});

const subscription = observable.subscribe(value => console.log(value));
setTimeout(() => subscription.unsubscribe(), 3000);

// ----1----2----3---->