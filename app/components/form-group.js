import Ember from 'ember';

export default Ember.Component.extend({
  hasErrors: function() {
    return this.get("errors.length") > 0;
  }.property("errors.length")
});
