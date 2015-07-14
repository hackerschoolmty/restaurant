import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  price: DS.attr("number"),
  imageUrl: DS.attr("string")
});
