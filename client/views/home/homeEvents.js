Template._home.events({
  'click button': function(e,t) {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      IonModal.open('signInModal');
    } else {
      Meteor.call("upvote", this);
    }
  }
});

Template._menuItem.events({
  'click .starred': function(e,t) {
    t.$(".starred").toggleClass("ion-ios-star-outline");
    t.$(".starred").toggleClass("ion-ios-star");
    Meteor.call("toggleStarred",this._id);
  }

})
