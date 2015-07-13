import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'restaurant/tests/helpers/start-app';

var application;

module('Acceptance | waiter adds client name to new order', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('writing in the field', function(assert) {
  visit('/');
  fillIn("#client", "Benito");
  click("#send_order");

  andThen(function() {
    assert.equal(errorsFor("client"), "");
  });
});

test('because is needd', function(assert) {
  visit('/');
  click("#send_order");

  andThen(function() {
    assert.equal(errorsFor("client"), "No puede estar en blanco");
  });
});

function errorsFor(field) {
  var formGroup = find("#" + field).parent(".has-error");
  return formGroup.find(".help-block").text();
}
