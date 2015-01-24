Template.signInModal.rendered = function() {
  Session.setDefault("creatingAccount", false)
};

Template.signInModal.helpers({
  creatingAccount: function() {
    return Session.get("creatingAccount");
  }
});

Template.signInModal.events({
  'click #create-account-button': function(e,t) {
    // Needs to validate that the user has the proper email suffix
    if (Session.get("creatingAccount")) {
      Accounts.createUser({
        email: t.find("#email").value,
        password: t.find("#password").value,
        profile: {
          favorite: t.find("#favorite").value,
          phone: t.find("#phone").value
        }
      }, function(err) {
        if (err) {
          $('#password').val("");
          alert(err.message)
        } else {
          IonModal.close();
        };
      })
    } else {
      Session.set("creatingAccount", true);
    }
  },
  'click #login-button': function(e,t) {
    Meteor.loginWithPassword(t.find("#email").value, t.find("#password").value, function(err) {
      if (err) {
        alert(err.message)
        $('#password').val("");
      } else {
        IonModal.close();
      }
    })
  }
});
