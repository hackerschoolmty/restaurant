import DS from 'ember-data';

export default DS.Model.extend({
  items: DS.hasMany("orderItem"),
  clientName: DS.attr(),
  tableId: DS.attr(),

  subTotal: function() {
    return this.get("items").mapBy("total").reduce(function(acc, current) {
      return acc + current;
    }, 0);
  }.property("items.@each.total"),

  iva: function() {
    return this.get("subTotal") * 0.16;
  }.property("subTotal"),

  total: function() {
    return this.get("subTotal") + this.get("iva");
  }.property("subTotal", "iva")
});
