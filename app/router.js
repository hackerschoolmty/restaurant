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

  this.route('menu', { path: "/" }, function() {
    this.resource("newOrder", { path: "/" });
  });
});

export default Router;
