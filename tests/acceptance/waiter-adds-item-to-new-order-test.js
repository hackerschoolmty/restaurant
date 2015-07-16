import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'restaurant/tests/helpers/start-app';
import Pretender from "pretender";

var application;
var server;
var ITEMS = {
  items: [
    { id: 1, name: "Tradicional", price: 50.25, image_url: "/images/burger-1.jpg" },
    { id: 2, name: "Con Jamón", price: 70, image_url: "/images/burger-2.jpg" },
  ]
};

module('Acceptance | waiter adds item to new order', {
  beforeEach: function() {
    server = new Pretender(function(){
      this.get("/items", function() {
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

test('', function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));

  andThen(function() {
    assert.equal(orderItemsCount(), 1);
    assert.equal(quantityOfItem(orderItemWithName("Con Jamón")), "1");
    assert.equal(totalOfItem(orderItemWithName("Con Jamón")), "$70.00");
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
