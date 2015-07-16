import DS from 'ember-data';

export default DS.Model.extend({
  items: DS.hasMany("orderItem"),
  clientName: DS.attr("string"),
  tableId: DS.attr("string"),

  netTotal: function() {
    return this.get("items").mapBy("total").reduce(function(a, b) {
      return a + b;
    }, 0);
  }.property("items.@each.total"),

  iva: function() {
    return this.get("netTotal") * 0.16;
  }.property("netTotal"),

  total: function() {
    return this.get("netTotal") + this.get("iva");
  }.property("iva", "netTotal")
});
