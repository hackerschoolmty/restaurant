import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("design", function() {
    this.route("orders");
    this.route("order");
  });

  this.route("newOrder", { path: "/" });
  this.route('new-order');
});

export default Router;
