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
    Meteor.call('changeDefault', t.find("#new-default-college").value)
  }
})

Template._defaultCollege.helpers({
  selectCMC: function() {
    return Meteor.user().profile.favorite == "cmc" ? true : false;
  },
  selectMudd: function() {
    return Meteor.user().profile.favorite == "mudd" ? true : false;
  },
  selectScripps: function() {
    return Meteor.user().profile.favorite == "scripps" ? true : false;
  },
  selectFrank: function() {
    return Meteor.user().profile.favorite == "frank" ? true : false;
  },
  selectPitzer: function() {
    return Meteor.user().profile.favorite == "pitzer" ? true : false;
  },
  selectFrary: function() {
    return Meteor.user().profile.favorite == "frary" ? true : false;
  },
  selectOldenborg: function() {
    return Meteor.user().profile.favorite == "oldenborg" ? true : false;
  }
})
