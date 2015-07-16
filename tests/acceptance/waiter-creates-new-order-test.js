import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'restaurant/tests/helpers/start-app';
import Pretender from "pretender";

var application;
var server;
var ORDER_ID = Math.floor((Math.random() * 100) + 1);
var ITEMS = {
  items: [
    { id: 1, name: "Tradicional", price: "50.00", image_url: "/images/tradicional.png"},
    { id: 2, name: "Con Jamón", price: "70.00", image_url: "/images/con-jamon.png"}
  ]
};

module('Acceptance | waiter creates new order', {
  beforeEach: function() {
    server = new Pretender(function(){
      this.get('/items', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify(ITEMS)];
      });

      this.post("/orders", function(request) {
        var data = JSON.parse(request.requestBody);
        data.order.id = ORDER_ID;
        return [201, {"Content-Type": "application/json"}, JSON.stringify(data)];
      });
    });

    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('with the right data', function(assert) {
  visit('/');
  fillIn("#client", "Benito");
  fillIn("#table", "M3");
  click(itemWithName("Con Jamón"));
  click(itemWithName("Tradicional"));
  click("#send_order");

  andThen(function() {
    assert.equal(find("h1").text(), "Orden #" + ORDER_ID );
  });
});

function itemWithName(name) {
  return ".thumbnail:contains(" + name + ")";
}
