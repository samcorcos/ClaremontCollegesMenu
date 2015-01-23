this.SettingsController = RouteController.extend({
  template: "settings",
  yieldTemplates: {
    /*YIELD_TEMPLATES*/
  },
  onBeforeAction: function() {
    /*BEFORE_FUNCTION*/
    this.next();
  },
  action: function() {
    this.render();
    /*ACTION_FUNCTION*/
  },
  waitOn: function() {
    return [
    // console.log(Meteor.user().profile.favorite)
    Session.set("favorite", Meteor.user())
    ];
    /*WAIT_FUNCTION*/
  },
  data: function() {
    return {
      params: this.params || {}
    };
    /*DATA_FUNCTION*/
  },
  onAfterAction: function() {
  }

});


// Router.route("/", function() {

//
// })
