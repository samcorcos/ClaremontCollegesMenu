Meteor.methods({
  removeStarred: function(newStar) {
    // This is where we change the current user's favorite in his profile
  },
  addStarred: function(newStar) {
    // Meteor.user().profile.starred
  },
  changeDefault: function(newDefault) {
    Meteor.users.update({ _id: Meteor.user()._id},{$set: {"profile.favorite": newDefault }})
  }

})
