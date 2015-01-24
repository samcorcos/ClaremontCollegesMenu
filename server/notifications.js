getNotifications = function() {
  var today = moment().format("MMMM D YYYY");
  var allUsers = Meteor.users.find({ "profile.starred": { $exists: true } }).fetch(); // we only need users that have starred something
  var allMenuItems = MenuItems.find({ date: today }).fetch(); // finds all items that have at least one upvote, and is in today's batch

  var allUserNotifications = [];

  allUsers.forEach(function(user) { // for all users that have starred items
    var starred = user.profile.starred;
    var notifications = [];

    allMenuItems.forEach(function(item) { // for each item...
      starred.forEach(function(starId) { // for each starred item...
        item.phone = user.profile.phone;
        if (starId == item._id) notifications.push(item) // if the item matches the id from the starred array, push the item to the notifications array
      })
    })

    allUserNotifications.push(notifications);

    Meteor.users.update({ _id: user._id }, { $set: { "profile.notifications": notifications }})

  })

  Meteor.setTimeout(function() {
    sendSMS(allUserNotifications);
  }, 1000)//14400000)

}
