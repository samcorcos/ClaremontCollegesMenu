Template.notifications.helpers({
  notifications: function() {
    return Meteor.user().profile.notifications;
  }
})

Template._notificationItem.events({
  'click button': function(e,t) {
    Meteor.call('removeNotification', this, Meteor.user()._id)
  }
})
