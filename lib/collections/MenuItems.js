MenuItems = new Mongo.Collection("menuItems");

var Schema={};


Schema.MenuItem = new SimpleSchema({
  itemName: {
    type: String,
    label: "Item Name"
  },
  upvotes: {
    type: [String],
    label: "Upvotes",
    defaultValue: [],
    optional: true
  },
  college: {
    type: String,
    label: "College"
  },
  meal: {
    type: String,
    label: "Meal"
  },
  date: {
    type: String,
    defaultValue: moment().format("MMMM D YYYY")
  },
  dateHistory: {
    type:[String],
    defaultValue:[moment().format("MMMM D YYYY")],
    optional: true
  }
})

MenuItems.attachSchema(Schema.MenuItem)

MenuItems.allow({
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

MenuItems.deny({
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
  Meteor.publish("menuItems", function () {
    return MenuItems.find({});
  });
}


if (Meteor.isClient) {
  Meteor.subscribe("menuItems");
}
