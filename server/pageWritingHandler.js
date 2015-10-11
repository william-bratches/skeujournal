Meteor.methods({
  saveCurrentWriting: function(words, id){
    Pages.update({_id: id}, {$set: {"text": words}});
  }
});
