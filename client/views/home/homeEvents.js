Template._home.events({
  'click button': function(e,t) {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      IonModal.open('signInModal');
    } else {
      Meteor.call("upvote", this);
    }
  }
});


Template.cmc.events({
  'click #toggle-right-button': function(e,t) {
    Router.go("/mudd")
  },
  'click #toggle-left-button': function(e,t) {
    console.log("Running");
    Router.go("/frary")
  }
});

Template._menuItem.events({
  'click .starred': function(e,t) {
    //For functionality to work right, 
    //these need to be filled in based on user preference off the bat
    t.$(".starred").toggleClass("ion-ios-star-outline");
    t.$(".starred").toggleClass("ion-ios-star");
    Meteor.call("toggleStarred",this._id);
  }
})

