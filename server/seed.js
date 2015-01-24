Meteor.startup(function () {
  if (MenuItems.find().count() === 0) {
    Meteor.call("getMenus");
  }
  startTimer();
  getRecommendations();
});
