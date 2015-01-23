Template.settings.rendered = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signInModal');
  }
}

Template.settings.helpers({
  notifications: function() {
    return ["Item 1", "Item 2", "Item 3", "Item 4"]
  },
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }
})

Template.settings.events({
  'click #logout-button': function(e,t) {
    Meteor.logout();
  },
  'click #login-create-button': function(e,t) {
    IonModal.open("signInModal");
  },
  'change #new-default-college': function(e,t) {
    var newValue = t.find("#new-default-college").value;
    Meteor.call('changeDefault', newValue)
  }
})
