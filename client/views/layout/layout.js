Template.layout.onCreated(function(){
  // default reactive vars
  this.candleActive = new ReactiveVar(false);
  this.typeWriterMode = new ReactiveVar(true);
})

Template.layout.helpers({

  // if candle is turned on
  candleActive: function() {
    return Template.instance().candleActive.get();
  },

  // if in typewriter mode
  typeWriterMode: function() {
    return Template.instance().typeWriterMode.get();
  }
});

Template.layout.events({

  // toggle candelight mode
  'click #fire-button': function() {
    var candleActive = Template.instance().candleActive.get();
    if (!candleActive) {
      Template.instance().candleActive.set(true);
    }
    else {
      Template.instance().candleActive.set(false);
    }
  },

  // toggle font modes
  'click .write-mode-button': function() {
    if (Template.instance().typeWriterMode.get()) {
      $(".leaf")
      .removeClass("typewriter")
      .addClass("handwriting");
      Template.instance().typeWriterMode.set(false)
    }
    else {
      $(".leaf")
      .removeClass("handwriting")
      .addClass("typewriter");
      Template.instance().typeWriterMode.set(true)
    }
  },

  // add new entry
  'click #new-leaf-button': function(){
    var currentPageId = Pages.findOne()._id;

    // save current writing
    function saveWriting() {
      var words = $(".leaf").html();
      Meteor.call("saveCurrentWriting", words, currentPageId);
    }

    // create new page
    function createNewPage() {
      Meteor.call("createNewPage", currentPageId);
    }

    // display next page via subscriptions
    function displayNextPage() {
      Meteor.subcribe("pages", Pages.findOne().nextPage);
    }

    function main(){
      saveWriting();
      createNewPage();
      displayNextPage();
    }

    main();
  }
})
