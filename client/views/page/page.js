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
    var writing = $(".leaf").html();
    var pageID = Pages.findOne()._id;
    Meteor.call("saveCurrentWriting", writing, pageID);
  }

  // when the user is typing, send writing to mongoDB
  function initTypingSaveListener() {
    $( ".leaf" ).keydown(function(e) {
      if (e.keyCode == 32) {
        sendHTMLToMongo();
      }
    });
  }

  // use noisy plugin to noisify the paper
  function drawNoisyTextureOnLeaf() {
    $('.leaf').noisy({
      intensity: 0.9,
      size: 200,
      opacity: 0.08,
      //fallback: 'fallback.png',
      monochrome: false
    });
  }

  loadWriting();
  initTypingSaveListener();
  drawNoisyTextureOnLeaf();

});
