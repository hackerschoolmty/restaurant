import DS from 'ember-data';

export default DS.Model.extend({
  clientName: DS.attr("string"),
  tableId: DS.attr("string")
});