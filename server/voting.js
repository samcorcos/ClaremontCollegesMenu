Meteor.methods({
  upvote: function(menuItem) {
    MenuItems.update({ _id: menuItem._id}, {$addToSet: { upvotes: Meteor.user()._id} }, function(err, res) {
      // recEngine.link(Meteor.user()._id, menuItem._id, function(err,res) {
      //   console.log(res);
      // });
      // recEngine.suggest(Meteor.user()._id, 5, function(err,res) {
      //   console.log(err);
      //   console.log(res);
      // })

      // recEngine.link(Meteor.user()._id, menuItem._id)


        recEngine.link("Mike", "cake");
        recEngine.link("Mike", "coffee");
        recEngine.link("Mike", "pie");
        recEngine.link("Sarah", "coffee");
        recEngine.link("Sarah", "cake");
        recEngine.link("Alex", "yogurt");
        recEngine.link("Alex", "cake");
        recEngine.link("John", "cake");
        recEngine.link("John", "coffee");
        recEngine.link("John", "pie");
        recEngine.link("Nick", "coffee");
        recEngine.link("Nick", "cake");
        recEngine.link("Sally", "yogurt");
        recEngine.link("Sally", "cake");
        recEngine.link("Zeke", "cake");

        recEngine.suggest("Mike", 2, function(err,res) {
          if (err) console.log(err);
          console.log(res);
        })


      if (err) console.log(err);
      console.log(res);
    });
    getRecommendations(); // This needs to be commented out when it goes into production... for demo purposes only
  }
})
