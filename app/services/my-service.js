import Ember from 'ember';

export default Ember.Service.extend({
  showNewNavItems: false,
  showNav: function (attrs) {
    console.log(attrs);
    this.set('showNewNavItems', true);
  }
});
