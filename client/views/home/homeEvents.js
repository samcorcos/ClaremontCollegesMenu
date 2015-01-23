Template.home.events({
  'click button': function(e,t) {

    // if (!Meteor.loggingIn() && !Meteor.user()) {
    //   IonModal.open('signInModal');
    // }
    console.log(this);
    Meteor.call("upvote", this);
  }
});
