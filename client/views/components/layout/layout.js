Template.layout.events({
  'click .ion-ios-book': function(e,t) {
    IonModal.open("collegeSelectModal")
  },
  'click .ion-ios-book-outline': function(e,t) {
    var fav = Meteor.user().profile.favorite;
    console.log("THIS IS FAV", fav);
    Router.go("/"+fav)
  }
})
