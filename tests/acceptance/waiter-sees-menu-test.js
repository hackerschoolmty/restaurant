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

module('Acceptance | waiter sees menu', {
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

test('with all the items', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(numberOfItems(), 2);
    assert.ok(hasItemWithName("Tradicional"), "Expected item with name Tradicional");
    assert.ok(hasItemWithName("Con Jamón"));
  });
});

test("with the price of every item", function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(priceOfItemWithName("Tradicional"), "$50.25");
    assert.equal(priceOfItemWithName("Con Jamón"), "$70.00");
  });
});

test("with the image of every item", function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(imageOfItemWithName("Tradicional"), "/images/burger-1.jpg");
    assert.equal(imageOfItemWithName("Con Jamón"), "/images/burger-2.jpg");
  });
});

function numberOfItems() {
  return find(".thumbnail").length;
}

function hasItemWithName(name) {
  return find(".thumbnail:contains(" + name + ")").length > 0;
}

function priceOfItemWithName(name) {
  return find(".thumbnail:contains(" + name + ") [data-price]").text();
}

function imageOfItemWithName(name) {
  return find(".thumbnail:contains(" + name + ") img").attr("src");
}
