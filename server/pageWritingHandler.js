Meteor.methods({
  saveCurrentWriting: function(writing, id){
    Pages.update({_id: id}, {$set: {"text": writing}});
  }
})
