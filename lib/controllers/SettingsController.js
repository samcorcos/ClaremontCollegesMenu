this.SettingsController = RouteController.extend({
  template: "settings",
  yieldTemplates: {
    /*YIELD_TEMPLATES*/
  },
  onBeforeAction: function() {
    this.next();
  },
  action: function() {
    this.render();
    /*ACTION_FUNCTION*/
  },
  waitOn: function() {
    return [
    // console.log(Meteor.user().profile.favorite)
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
