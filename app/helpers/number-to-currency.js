import Ember from 'ember';

export function numberToCurrency(number) {
  return "$" + parseFloat(number, 10).toFixed(2);
}

export default Ember.HTMLBars.makeBoundHelper(numberToCurrency);
