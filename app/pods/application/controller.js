import Ember from 'ember';

export default Ember.Controller.extend({
  myService: Ember.inject.service(),
 appName: 'Ember Twiddle',
 showNewNav: Ember.computed('myService.showNewNavItems', function() {
   return this.get('myService').showNewNavItems;
 }),
 actions: {
   btnHandler: function () {
     this.get('myService').showNav('userNav');
   }
 }
});
