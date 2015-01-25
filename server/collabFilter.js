// Since associatinos are made during voting, most of the logic is in voting.js

getSimilar = function(userId) {
  var redis = Meteor.npmRequire('redis');
  var client = redis.createClient();

  client.on('error', function(err) {
    console.log("Redis error " + err);
  })

  var raccoon = Meteor.npmRequire('raccoon');
  raccoon.connect(6379, '127.0.0.1')

  raccoon.recommendFor(userId, 10, function(result) {
    //result will be an array of X ranked recommendations for userId
    console.log(result);

  })

}

// getSimilar(Meteor.user()._id)
