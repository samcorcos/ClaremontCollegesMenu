Meteor.methods({
  toggleStarred: function(itemId) {
    var thisUser = Meteor.user();
    if(thisUser.profile.starred){
      if(thisUser.profile.starred.indexOf(itemId)===-1){
        Meteor.users.update({_id:thisUser._id},{$addToSet: {"profile.starred": itemId}})
      } else {
        Meteor.users.update({_id:thisUser._id},{$pull: {"profile.starred": itemId}})
      }
    } else {
    Meteor.users.update({_id:thisUser._id},{$set: {"profile.starred": [itemId]}})
    }
  },

  changeDefault: function(newDefault) {
    Meteor.users.update({ _id: Meteor.user()._id},{$set: {"profile.favorite": newDefault }})
  },
  // changePush: function(newDefault) {
  //   // this is where we change user profle
  // },
  changeText: function(newDefault) {
    Meteor.users.update({ _id: Meteor.user()._id }, { $set: {"profile.text": newDefault}})
  }

})
