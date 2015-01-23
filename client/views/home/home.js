Template._home.rendered = function() {
  // Meteor.call("getMenus", function(err, res) {
  //   if (err) console.log("ERR", err);
  //   console.log(res);
  // })
};

Template._home.helpers({
  sorted: function(cursor) {
    var tempArray = cursor.fetch(); // this is an array of the items
    tempArray.sort(function(a,b) {
      a.hasOwnProperty("upvotes") ? keyA = a.upvotes.length : keyA = 0;
      b.hasOwnProperty("upvotes") ? keyB = b.upvotes.length : keyB = 0;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    })
    return tempArray;
  }
});

Template.cmc.helpers({
  breakfast: function() {
    return MenuItems.find({college: "CMC", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "CMC", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "CMC", meal: "Dinner"})
  },
  college: function() {
    return ["CMC"];
  }
});

Template.mudd.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Mudd", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Mudd", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Mudd", meal: "Dinner"})
  },
  college: function() {
    return ["Mudd"];
  }
});

Template.scripps.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Scripps", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Scripps", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Scripps", meal: "Dinner"})
  },
  college: function() {
    return ["Scripps"];
  }
});

Template.pitzer.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Pitzer", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Pitzer", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Pitzer", meal: "Dinner"})
  },
  college: function() {
    return ["Pitzer"];
  }
});

Template.frary.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Frary", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Frary", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Frary", meal: "Dinner"})
  },
  college: function() {
    return ["Frary"];
  }
});

Template.frank.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Frank", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Frank", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Frank", meal: "Dinner"})
  },
  college: function() {
    return ["Frank"];
  }
});

Template.oldenborg.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Breakfast"})
  },
  lunch: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Lunch"})
  },
  dinner: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Dinner"})
  },
  college: function() {
    return ["Oldenborg"];
  }
});
