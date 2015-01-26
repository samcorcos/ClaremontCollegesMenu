Meteor.startup(function () {
  if (MenuItems.find().count() === 0) {
    Meteor.call("getMenus");
  }
  checkMenus();  // This is necessary if hosted on a shared server because timers do not persist.
  // startTimer();  // This only works on a production server, where timers in servers function properly

  ///////////////// Comment out when not in Dev Mode /////////////

  // Meteor.call("getMenus");
  // getNotifications();
  // sendSMS();
  // getRecommendations();

  ////////////////////////////////////////////////////////////////



});
