Template._home.events({
  'click button': function(e,t) {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      IonModal.open('signInModal');
    } else {
      Meteor.call("upvote", this);
    }
  }
});
