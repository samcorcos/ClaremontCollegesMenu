Meteor.startup(function () {
  if (MenuItems.find().count() === 0) {
    Meteor.call("getMenus");
  }
  startTimer();
  // sendSMS(); // for testing
  // getRecommendations(); // keep here for dev purposes
});
