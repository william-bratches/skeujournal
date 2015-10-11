Template.write.onCreated(function(){

  // will control what current journal entry is being viewed
  this.currentViewDate = new ReactiveVar(new Date())
})

Template.write.onRendered(function(){
  var currentViewDate = Template.instance().currentViewDate.get();
  Meteor.subscribe('pages', currentViewDate);

})
