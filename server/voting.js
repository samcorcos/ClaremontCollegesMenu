Meteor.methods({
  upvote: function(menuItem) {
    MenuItems.update({ _id: menuItem._id}, {$inc: { upvotes: 1} }, function(err, res) {
      if (err) console.log(err);
      console.log(res);
    });
  }
})
