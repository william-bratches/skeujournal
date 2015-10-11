Meteor.publish("pages", function(id){
  return Pages.find({_id: id});
});
