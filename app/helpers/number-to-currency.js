import Ember from 'ember';

export function numberToCurrency(number) {
  return "$" + parseFloat(number).toFixed(2);
}

export default Ember.HTMLBars.makeBoundHelper(numberToCurrency);
