import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord("order");
  },

  actions: {
    incrementQuantity: function(item) {
      item.incrementProperty("quantity");
    },

    decrementQuantity: function(item) {
      item.decrementProperty("quantity");
    },

    removeItem: function(item) {
      item.destroyRecord();
    },

    removeItemCancelation: function(item) {
      item.set("quantity", 1);
    }
  }
});
