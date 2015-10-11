Template.layout.onCreated(function(){
  this.candleActive = new ReactiveVar(false);
  this.typeWriterMode = new ReactiveVar(true);
})

Template.layout.helpers({
  candleActive: function() {
    return Template.instance().candleActive.get();
  },

  typeWriterMode: function() {
    return Template.instance().typeWriterMode.get();
  }
});

Template.layout.events({
  'click #fire-button': function() {
    var candleActive = Template.instance().candleActive.get();
    if (!candleActive) {
      Template.instance().candleActive.set(true);
    }
    else {
      Template.instance().candleActive.set(false);
    }
  },

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
  }
})
