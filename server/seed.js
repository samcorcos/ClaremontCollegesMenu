Meteor.startup(function () {
  if (MenuItems.find().count() === 0) {
    getMenus();
  }
});
