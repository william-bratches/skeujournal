Router.configure({
 layoutTemplate: 'layout',
});

Router.map(function() {

  this.route('/', {
    name: 'write',
    waitOn: function() {
      return [
        // nothing
      ];
    }
  });

});
