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

test("and modifies item quantity", function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));
  click(incrementQuantity());
  click(incrementQuantity());
  click(decrementQuantity());

  andThen(function() {
    assert.equal(orderItemsCount(), 1);
    assert.equal(quantityOfItem(orderItemWithName("Con Jamón")), "2");
    assert.equal(totalOfItem(orderItemWithName("Con Jamón")), "$140.00");
  });
});

test("and increments quantity clicking the thumnail again", function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));
  click(itemWithName("Con Jamón"));
  click(itemWithName("Con Jamón"));

  andThen(function() {
    assert.equal(orderItemsCount(), 1);
    assert.equal(quantityOfItem(orderItemWithName("Con Jamón")), "3");
    assert.equal(totalOfItem(orderItemWithName("Con Jamón")), "$210.00");
  });
});

test("and removes it from the order", function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));
  click(decrementQuantity());
  click(removeItemButton());

  andThen(function() {
    assert.equal(orderItemsCount(), 0);
  });
});

test("and tries to remove and item but then cancels the action", function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));
  click(decrementQuantity());
  click(cancelRemoveItemButton());

  andThen(function() {
    assert.equal(orderItemsCount(), 1);
    assert.equal(quantityOfItem(orderItemWithName("Con Jamón")), "1");
    assert.equal(totalOfItem(orderItemWithName("Con Jamón")), "$70.00");
  });
});

test("and sees the order total", function(assert) {
  visit('/');
  click(itemWithName("Con Jamón"));
  click(itemWithName("Tradicional"));

  andThen(function() {
    assert.equal(orderItemsCount(), 2);
    assert.equal(quantityOfItem(orderItemWithName("Con Jamón")), "1");
    assert.equal(quantityOfItem(orderItemWithName("Tradicional")), "1");
    assert.equal(orderValue("net_total"), "$120.00");
    assert.equal(orderValue("iva"), "$19.20");
    assert.equal(orderValue("total"), "$139.20");
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

function incrementQuantity() {
  return "button:contains(+)";
}

function decrementQuantity() {
  return "button:contains(-)";
}

function removeItemButton() {
  return "button:contains(Remover)";
}

function cancelRemoveItemButton() {
  return "button:contains(Cancel)";
}

function orderValue(name) {
  return findWithAssert("#order_" + name).text();
}
