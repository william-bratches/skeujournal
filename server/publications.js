Meteor.publish("pages", function(currentViewDate){
  return Pages.find();
});
