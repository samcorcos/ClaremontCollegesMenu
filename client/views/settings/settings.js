Template.settings.rendered = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signInModal');
  }
  console.log(Session.get("favorites"));
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
    Session.get("favorite") == "cmc" ? true : false;
  },
  selectMudd: function() {
    Session.get("favorite") == "mudd" ? true : false;
  },
  selectScripps: function() {
    Session.get("favorite") == "scripps" ? true : false;
  },
  selectFrank: function() {
    Session.get("favorite") == "frank" ? true : false;
  },
  selectPitzer: function() {
    Session.get("favorite") == "pitzer" ? true : false;
  },
  selectFrary: function() {
    Session.get("favorite") == "frary" ? true : false;
  },
  selectOldenborg: function() {
    Session.get("favorite") == "oldenborg" ? true : false;
  }
})
