import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("item");
  },

  actions: {
    addItemToOrder: function(item) {
      this.store.createRecord("orderItem", {
        item: item,
        order: this.modelFor("newOrder"),
        quantity: 1
      });
    }
  }
});
