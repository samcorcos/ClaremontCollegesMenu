
// client.on('error', function(err) {
//   console.log("Redis error " + err);
// })
//
// getSimilar = function(userId) {

// }
//
// getSimilar()
//




Meteor.methods({
  upvote: function(menuItem) {
    MenuItems.update({ _id: menuItem._id}, {$addToSet: { upvotes: Meteor.user()._id} }, function(err, res) {
      if (err) console.log(err);
      console.log(res);
    });
    getRecommendations(); // This needs to be commented out when it goes into production... for demo purposes only

    // This is the fun part
    var redis = Meteor.npmRequire('redis');
    var client = redis.createClient();

    var raccoon = Meteor.npmRequire('raccoon');
    raccoon.connect(6379, '127.0.0.1')

    // raccoon.liked(Meteor.user()._id, menuItem._id);
    // raccoon.liked("bob", "option") // This is currently broken

  }
})
