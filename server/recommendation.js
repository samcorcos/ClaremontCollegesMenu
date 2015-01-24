Meteor.methods({
  getRecommendations: function(something) {
    var today = moment().format("MMMM D YYYY");
    var allItems = MenuItems.find({}, {day: today}).fetch() // gives a list of all menu items

  }
})
