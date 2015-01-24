Meteor.methods({
  getRecommendations: function(something) {
    console.log(MenuItems.find().fetch());
    return MenuItems.find().fetch()
  }
})
