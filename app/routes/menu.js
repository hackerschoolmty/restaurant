import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("item");
  },

  actions: {
    addItemToOrder: function(item) {
      const order = this.modelFor("newOrder");
      let orderItem = order.get("items").findBy("name", item.get("name"));

      if (orderItem) {
        orderItem.incrementProperty("quantity");
      } else {
        this.store.createRecord("orderItem", {
          item: item,
          order: order,
          quantity: 1
        });
      }
    }
  }
});
