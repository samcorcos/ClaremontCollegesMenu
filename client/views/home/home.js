
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

currentDay = moment().format("MMMM D YYYY");

Template.cmc.helpers({
  breakfast: function() {
    return MenuItems.find({college: "CMC", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "CMC", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "CMC", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["CMC"];
  },
  score: function() {
    return MenuItems.find({college: "CMC"}, {upvotes: 1});
  }
});

Template.mudd.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Mudd", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Mudd", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Mudd", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Mudd"];
  },
  score: function() {
    return MenuItems.find({college: "Mudd"}, {upvotes: 1});
  }
});

Template.scripps.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Scripps", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Scripps", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Scripps", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Scripps"];
  },
  score: function() {
    return MenuItems.find({college: "Scripps"}, {upvotes: 1});
  }
});

Template.pitzer.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Pitzer", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Pitzer", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Pitzer", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Pitzer"];
  },
  score: function() {
    return MenuItems.find({college: "Pitzer"}, {upvotes: 1});
  }
});

Template.frary.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Frary", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Frary", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Frary", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Frary"];
  },
  score: function() {
    return MenuItems.find({college: "Frary"}, {upvotes: 1});
  }
});

Template.frank.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Frank", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Frank", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Frank", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Frank"];
  },
  score: function() {
    return MenuItems.find({college: "Frank"}, {upvotes: 1});
  }
});

Template.oldenborg.helpers({
  breakfast: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Breakfast", date: currentDay})
  },
  lunch: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Lunch", date: currentDay})
  },
  dinner: function() {
    return MenuItems.find({college: "Oldenborg", meal: "Dinner", date: currentDay})
  },
  college: function() {
    return ["Oldenborg"];
  },
  score: function() {
    var currentItems = MenuItems.find({college: "Oldenborg"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
  }
});

Template.landing.rendered = function() {
  IonModal.open("signInModal")
}

Template._menuItem.helpers({
  checkStarred: function(itemId,userStars){
  if (!userStars) {
    return "ion-ios-star-outline";
  } else {
    if(userStars.indexOf(itemId)!==-1){
      return "ion-ios-star";
    }
      return "ion-ios-star-outline";
    }
  }
})
