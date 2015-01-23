Template.home.events({
  'click button': function(e,t) {
    Meteor.call("upvote", this);
  }
});
