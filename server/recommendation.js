Meteor.methods({
  getRecommendations: function(something) {
    var today = moment().format("MMMM D YYYY");
    var allItems = MenuItems.find({}, {day: today}).fetch() // gives a list of all menu items

    // allItems.forEach(function(item) {
    //   if (item.hasOwnProperty("upvotes")) {
    //     item.upvotes.forEach(function(vote) {
    //
    //     })
    //   } else {
    //
    //   }
    // }) // Find all the menu items from today,

    // console.log(MenuItems.find().fetch());
    // return MenuItems.find().fetch()
  }
})
