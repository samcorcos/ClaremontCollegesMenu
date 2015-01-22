Template.signInModal.rendered = function() {

};

Template.signInModal.helpers({

});

Template.signInModal.events({
  'click #create-account-button': function(e,t) {
    // Needs to validate that the user has the proper email suffix
    Accounts.createUser({
      email: t.find("#email").value,
      password: t.find("#password").value
    }, function(err) {
      if (err) {
        $('#password').val("");
        alert(err.message)
      } else {
        IonModal.close();
      };
    })
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
