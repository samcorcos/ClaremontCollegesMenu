this.HomeController = RouteController.extend({
  template: "landing",
  yieldTemplates: {
    /*YIELD_TEMPLATES*/
  },
  onBeforeAction: function() {
    /*BEFORE_FUNCTION*/
    this.next();
  },
  action: function() {
      if (!Meteor.loggingIn() && !Meteor.user()) {
        this.render("landing")
      } else {
        var fav = Meteor.user().profile.favorite;
        this.redirect("/"+fav);
      }
    /*ACTION_FUNCTION*/
  },
  waitOn: function() {
    return [

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
