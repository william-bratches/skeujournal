Template.page.onCreated(function(){
  var self = this;
  this.writingOnIntialLoad = new ReactiveVar();
});

Template.page.helpers({
  getPageContent: function() {
    return Template.instance().writingOnIntialLoad.get();
  }
});

Template.page.onRendered(function(){

  // Fetch the last saved version of the writing for display.
  function loadWriting(){
    var writing = Pages.findOne().text;
    Template.instance().writingOnIntialLoad.set(writing);
  }

  // save current writing to the database
  function sendHTMLToMongo() {
    var words = $(".leaf").html();
    var pageID = Pages.findOne()._id;
    Meteor.call("saveCurrentWriting", words, pageID);
  }

  // when the user is typing, send writing to mongoDB
  function initTypingSaveListener() {
    $( ".leaf" ).keydown(function(e) {
      // if a punctation or space, save current writing
      if (e.keyCode == 32 || e.keyCode == 190 || e.keyCode == 49) {
        sendHTMLToMongo();
      }
    });
  }

  loadWriting();
  initTypingSaveListener();

});
