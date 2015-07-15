import DS from 'ember-data';

export default DS.Model.extend({
  items: DS.hasMany("orderItem"),
  clientName: DS.attr("string"),
  tableId: DS.attr("string")
});
