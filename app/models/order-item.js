import DS from 'ember-data';

export default DS.Model.extend({
  order: DS.belongsTo("order"),
  item: DS.belongsTo("item"),
  quantity: DS.attr("number"),

  name: function() {
    return this.get("item.name");
  }.property("item.name"),

  total: function() {
    return this.get("quantity") * this.get("item.price");
  }.property("quantity", "item.price"),

  hasQuantity: function() {
    return this.get("quantity") > 0;
  }.property("quantity")
});
