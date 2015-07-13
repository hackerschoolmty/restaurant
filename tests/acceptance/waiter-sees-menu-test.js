import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'restaurant/tests/helpers/start-app';
import Pretender from 'pretender';

var application;
var server;
var ITEMS = {
  items: [
    { id: 1, name: "Tradicional", price: "50.00", image_url: "/images/tradicional.png"},
    { id: 2, name: "Con Jamón", price: "70.00", image_url: "/images/con-jamon.png"}
  ]
};

module('Acceptance | waiter sees menu', {
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

test('with all the items', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(numberOfItems(), 2);
    assert.ok(hasItemWithName("Tradicional"));
    assert.ok(hasItemWithName("Con Jamón"));
  });
});

test('with the price of every item', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(priceOfItemWithName("Tradicional"), "$50.00");
    assert.equal(priceOfItemWithName("Con Jamón"), "$70.00");
  });
});

test('with the image of every item', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(imageOfItemWithName("Tradicional"), "/images/tradicional.png");
    assert.equal(imageOfItemWithName("Con Jamón"), "/images/con-jamon.png");
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

function ImageOfItemWithName(name) {
  return find(".thumbnail:contains(" + name + ") img").attr("src");
}
