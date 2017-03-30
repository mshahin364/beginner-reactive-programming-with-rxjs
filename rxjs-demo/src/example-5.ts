/*
  Example 5: Observables and Composing Operators
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

const incrementClicks$ = Observable.fromEvent(document.getElementById('increment'), 'click');
const decrementClicks$ = Observable.fromEvent(document.getElementById('decrement'), 'click');

const clicks$ = Observable
  .merge(incrementClicks$, decrementClicks$)
  .map((event: any) => parseInt(event.target.value, 10));

const total$ = clicks$
  .scan((total, value) => total + value, 0);

total$.subscribe(total => {
  document.getElementById('counter').innerText = total.toString();
});

// ----i------------------>
// -------d---------d----->
//          merge
// ----i--d---------d----->
//           map
// ----p--n---------n----->
//           scan
// 0---1--0-------(-1)---->