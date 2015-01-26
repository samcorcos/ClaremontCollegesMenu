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
    getNotifications();
  },

  changeDefault: function(newDefault) {
    Meteor.users.update({ _id: Meteor.user()._id},{$set: {"profile.favorite": newDefault }})
  },
  // changePush: function(newDefault) {
  //   // this is where we change user profle
  // },
  changeText: function(newDefault, userId) {
    if (newDefault === true) {
      Meteor.users.update({_id: userId}, { $set: { "profile.notifications": true }})
      getNotifications();
    } else {
      Meteor.users.update({_id: userId}, { $set: { "profile.notifications": false }})
      // This is where we need to think of the logic for "not receiving notifications"
    }
    Meteor.users.update({ _id: userId }, { $set: {"profile.text": newDefault}})
  },
  removeNotification: function(item, userId) {
    Meteor.users.update({ _id: userId }, { $pull: { "profile.notifications": { _id: item._id } } })
  },
  removeStarred: function(item, userId) {
    Meteor.users.update({ _id: userId }, { $pull: { "profile.starred": item._id }})
  }

})
