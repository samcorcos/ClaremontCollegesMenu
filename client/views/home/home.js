
Template._home.rendered = function() {


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
  },
  themedBar: function() {
    if (Session.get("currentCollege") == "CMC") return "bar-assertive";
    if (Session.get("currentCollege") == "Pitzer") return "bar-balanced";
    if (Session.get("currentCollege") == "Mudd") return "bar-positive";
    if (Session.get("currentCollege") == "Scripps") return "bar-calm";
    if (Session.get("currentCollege") == "Frary") return "bar-energized";
    if (Session.get("currentCollege") == "Frank") return "bar-royal";
    if (Session.get("currentCollege") == "Oldenborg") return "bar-stable";
  },
  getCurrentCollege: function(){
    return Session.get("currentCollege");
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
    var currentItems = MenuItems.find({college: "CMC"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
    var currentItems = MenuItems.find({college: "Mudd"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
    var currentItems = MenuItems.find({college: "Scripps"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
    var currentItems = MenuItems.find({college: "Pitzer"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
    var currentItems = MenuItems.find({college: "Frary"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
    var currentItems = MenuItems.find({college: "Frank"}).fetch();
    var voteCount = 0;
    currentItems.forEach(function(item){
      if (item.hasOwnProperty("upvotes")) {
        voteCount += item.upvotes.length;
      }
    })
    return voteCount;
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
  },

  buttonEnabled: function(itemUpvotes, userId){
    if(itemUpvotes){
      if(itemUpvotes.indexOf(userId)!==-1){
        return 'disabled';
      }; 
    } return;
  }
})
