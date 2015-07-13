import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sendOrder: function() {
      if (!this.get("model.clientName.length")) {
        this.get("model.errors").add("clientName", "No puede estar en blanco");
      }
    }
  }
});
