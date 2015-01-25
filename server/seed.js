Meteor.startup(function () {
  if (MenuItems.find().count() === 0) {
    Meteor.call("getMenus");
  }
  // Meteor.call("getMenus") // for dev purposes
  startTimer();
  // getNotifications();
  // sendSMS(); // for testing
  // getRecommendations(); // keep here for dev purposes

});
