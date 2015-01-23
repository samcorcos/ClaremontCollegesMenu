Meteor.methods({
  upvote: function(menuItem) {
    MenuItems.update({ _id: menuItem._id}, {$addToSet: { upvotes: Meteor.user()._id} }, function(err, res) {
      if (err) console.log(err);
      console.log(res);
    });
  }
})
