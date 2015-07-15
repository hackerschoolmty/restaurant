import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import Pretender from "pretender";

new Pretender(function(){
  this.get("/items", function() {
    var items = {
      items: [
        { id: 1, name: "Tradicional", price: "50", image_url: "/images/burger-1.jpeg"},
        { id: 2, name: "Funky bread", price: "70", image_url: "/images/burger-2.jpeg"},
        { id: 3, name: "Con queso", price: "60", image_url: "/images/burger-3.jpeg"},
        { id: 4, name: "Con jamón", price: "80", image_url: "/images/burger-4.jpeg"},
        { id: 5, name: "Especial", price: "50", image_url: "/images/burger-1.jpeg"},
        { id: 6, name: "La nice", price: "70", image_url: "/images/burger-2.jpeg"},
        { id: 7, name: "La del chavo", price: "60", image_url: "/images/burger-3.jpeg"},
        { id: 8, name: "La del barrio", price: "80", image_url: "/images/burger-4.jpeg"}
      ]
    };

    return [200, {"Content-Type": "application/json"}, JSON.stringify(items)];
  });
});

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
