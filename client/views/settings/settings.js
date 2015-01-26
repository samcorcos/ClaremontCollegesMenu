Template.settings.rendered = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signInModal');
  }
}

Template.settings.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  },
  textStatus: function() {
    return Meteor.user().profile.text;
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
  },
  'change #text-notifications': function(e,t) {
    var checkedStatus = t.find('#text-notifications').checked;
    Meteor.call('changeText', checkedStatus, Meteor.user()._id);
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

Template._removeNotificationItem.helpers({
  myStarred: function() {
    var userStarredArray = Meteor.user().profile.starred;
    var userStarredObjects = [];
    userStarredArray.forEach(function(starredItemId) {
      var itemObj = MenuItems.findOne({ _id: starredItemId});
      userStarredObjects.push(itemObj);
    })
    return userStarredObjects;
  }
  // then I need a method to remove from user starred
})

Template._removeNotificationItem.events({
  'click .button': function(e,t) {
    Meteor.call("removeStarred", this, Meteor.user()._id)
  }
})
