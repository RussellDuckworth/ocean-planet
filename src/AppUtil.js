
var util =
{
	wait: ms => new Promise((r, j) => setTimeout(r, ms)),

	// TODO: use Document.querySelector() instead of homemade
	$: id => {
		if (id.charAt(0) === ".") {
			const c = document.getElementsByClassName(id.substring(1))
			if (c.length === 1) return c[0];
			if (c.length === 0) return null;
			return c;
		} else {
			return document.getElementById( id )
		}
	},

	// todo: array of classes
	rmClass( elm, c ) {
		if (!elm) return;
		if (elm instanceof HTMLCollection) {
			for (var e of elm) util.rmClass( e, c );
			return;
		}
		if (elm.classList) {
			if (elm.classList.contains(c)) {
				elm.classList.remove(c);
			}
		} else {
			console.warn('no classlist');
			console.dir(elm);
		}
	},

	// todo: array of classes
	addClass( elm, c ) {
		if (!elm) return;
		if (elm instanceof HTMLCollection) {
			for (var e of elm) util.addClass( e, c );
			return;
		}
		if (elm.classList) {
			if (!elm.classList.contains(c)) {
				elm.classList.add(c);
			}
		}
		else {
			console.warn('no classlist');
			console.dir(elm);
		}
	},

	dispatch(s, d) {
		window.dispatchEvent(new CustomEvent(s, {detail: d}));
	},

	abbreviateNumber (num, fixed) {
	  if (num === null) { return null; } // terminate early
	  if (num === 0) { return '0'; } // terminate early
	  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
	  var b = (num).toPrecision(2).split("e"), // get power
	      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
	      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
	      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
	      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
	  return e;
	},

	shortNumber( num ) {
		return this.abbreviateNumber( num, 2 );
	},

	cap(s) {
		if (typeof s !== 'string') return ''
		return s.charAt(0).toUpperCase() + s.slice(1)
	}
}

export default util;
