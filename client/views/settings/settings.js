Template.settings.rendered = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signInModal');
  }
}

Template.settings.helpers({
  notifications: function() {
    return ["Item 1", "Item 2", "Item 3", "Item 4"]
  }
})
