import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'restaurant/tests/helpers/start-app';
import Pretender from "pretender";

var application;
var server;
var ITEMS = {
  items: [
    { id: 1, name: "Tradicional", price: "50.00", image_url: "/images/tradicional.png"},
    { id: 2, name: "Con Jamón", price: "70.00", image_url: "/images/con-jamon.png"}
  ]
};

module('Acceptance | waiter adds item to new order', {
  beforeEach: function() {
    server = new Pretender(function(){
      this.get('/items', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify(ITEMS)];
      });
    });

    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('clicking the item thumbnail', function(assert) {
  visit('/');
  click(itemWithName("Tradicional"));

  andThen(function() {
    assert.equal(orderItemsCount(), 1);
    assert.equal(quantityOfItem(orderItemWithName("Tradicional")), "1");
    assert.equal(totalOfItem(orderItemWithName("Tradicional")), "$50.00");
  });
});

function itemWithName(name) {
  return ".thumbnail:contains(" + name + ")";
}

function orderItemsCount() {
  return find("[data-order-item]").length;
}

function orderItemWithName(name) {
  return find("[data-order-item]:contains(" + name + ")");
}

function quantityOfItem(item) {
  return item.find("[data-quantity]").val();
}

function totalOfItem(item) {
  return item.find("[data-total]").text();
}
