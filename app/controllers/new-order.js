import Ember from 'ember';

export default Ember.Controller.extend({
  validatePresenceOf: function(attr) {
    if (!this.get("model." + attr + ".length")) {
      this.get("model.errors").add(attr, "No puede estar en blanco");
    }
  },

  actions: {
    sendOrder: function() {
      this.validatePresenceOf("clientName");
      this.validatePresenceOf("tableId");
    }
  }
});
