import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
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

    cancelRemoveItem: function(item) {
      item.set("quantity", 1);
    },

    sendOrder: function() {
      var _this = this;
      _this.modelFor("newOrder").save().then(function(order) {
        _this.transitionTo("order", order);
      });
    }
  }
});
