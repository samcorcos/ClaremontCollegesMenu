Meteor.methods({
  removeStarred: function(newStar) {
    // This is where we change the current user's favorite in his profile
  },
  addStarred: function(newStar) {
    // Meteor.user().profile.starred
  },
  changeDefault: function(newDefault) {
    var userId = Meteor.user()._id;
    Meteor.users.update({ _id: userId},{$set: {"profile.favorite": newDefault }})
  }

})
