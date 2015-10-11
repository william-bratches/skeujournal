Meteor.methods({
  saveCurrentWriting: function(words, id){
    Pages.update({_id: id}, {$set: {"text": words}});
  },

  createNewPage: function(id) {
    var randomId = Random.id();

    // insert a new page
    Pages.insert(
      {
        _id: randomId,
        date: new Date(),
        text: "",
        previousPage: id,
        nextPage: ""
      });

    // link old page to new page
    Pages.update({_id: id}, {$set: {"nextPage": randomId}});
  }
});
