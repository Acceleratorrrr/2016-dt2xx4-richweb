import {Observable} from 'rxjs/Rx';

const display = document.getElementById("display");
const incButton = document.getElementById("increment");
const decButton = document.getElementById("decrement");
const rstButton = document.getElementById("reset");

let counter = {value: 0};
const incr = acc => ( {value: acc.value + 1} );
const decr = acc => ( {value: acc.value - 1} );
const rstr = acc => ( {value: 0} );

const button$ = Observable.merge(
	Observable.fromEvent(incButton, 'click').mapTo(incr),
	Observable.fromEvent(decButton, 'click').mapTo(decr),
	Observable.fromEvent(rstButton, 'click').mapTo(rstr)
)

button$
	.scan((acc, update) => update(acc), counter)
	.subscribe(counter => {
		display.innerHTML = counter.value;
	});

