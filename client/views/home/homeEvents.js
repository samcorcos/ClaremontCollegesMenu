Template.home.events({
  'click button': function(e,t) {
    console.log(this);
    Meteor.call("upvote", this);
  }
});
