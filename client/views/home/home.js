Template.home.rendered = function() {
  // Meteor.call("getMenus", function(err, res) {
  //   if (err) console.log("ERR", err);
  //   console.log(res);
  // })
  // Meteor.call("addItem", function(err, res) {
  //   if (err) console.log("ERR", err);
  // })

  IonModal.open('collegeSelectModal');

};

Template.home.helpers({
  database: function() {
    return Database.find();
  }
});

Template.home.events({

});


Template._menuItem.events({
  'click button': function(e,t) {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      IonModal.open('signInModal');
    }
    console.log(this);
  }
})

Template.cmc.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  },
  college: function() {
    return ["CMC"];
  }
});

Template.mudd.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.scripps.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.pitzer.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.frary.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.frank.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.oldenborg.helpers({
  todaysMenu: function() {
    return ;
    // return TodaysMenu.find(); // this will eventually contain a selector for only this colleges menu
  }
});

Template.cmc.events({
  'click #toggle-right-button': function(e,t) {
    Router.go("/mudd")
  },
  'click #toggle-left-button': function(e,t) {
    console.log("Running");
    Router.go("/frary")
  }
});
