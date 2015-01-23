TodaysMenu = new Mongo.Collection("todaysMenu");

// var Schema = {};

// Schema.CollegeMenu = new SimpleSchema({
//     college: {
//       type: Object,
//       label: 'College'
//     }
//     // ,
//     // breakfast: {type: [Object]},
//     // lunch: {type: [Object]},
//     // dinner: {type: [Object]}
// })

// TodaysMenu.attachSchema(Schema.CollegeMenu)

TodaysMenu.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, docs, fields, modifier) {
    return false;
  },

  remove: function(userId, docs) {
    return false;
  }
});

TodaysMenu.deny({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, docs, fields, modifier) {
    return true;
  },
  remove: function(userId, docs) {
    return true;
  }
});


if (Meteor.isServer) {
  Meteor.publish("todaysMenu", function () {
    return TodaysMenu.find({});
  });
}


if (Meteor.isClient) {
  Meteor.subscribe("todaysMenu");
}


// Users will have the following: starred (array of IDs), upvoted (array of IDS)
