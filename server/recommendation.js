// Goign to give a daily update for recommended for each user

getRecommendations = function() {
  var today = moment().format("MMMM D YYYY");
  var allUsers = Meteor.users.find().fetch();
  var allMenuItems = MenuItems.find({ upvotes: { $exists: true }, date: today }).fetch(); // finds all items that have at least one upvote, and is in today's batch
  allUsers.forEach(function(user) {

    var temp = {
      breakfast: { cmc: 0, mudd: 0, scripps: 0, frank: 0, pitzer: 0, frary: 0, oldenborg: 0 },
      lunch: { cmc: 0, mudd: 0, scripps: 0, frank: 0, pitzer: 0, frary: 0, oldenborg: 0 },
      dinner: { cmc: 0, mudd: 0, scripps: 0, frank: 0, pitzer: 0, frary: 0, oldenborg: 0 }
    };

    var colleges = ["CMC", "Pitzer", "Scripps", "Frary", "Frank", "Oldenborg", "Mudd"];
    var meals = ["Breakfast","Lunch", "Dinner"];

    allMenuItems.forEach(function(item) {
      if (item.upvotes.indexOf(user._id) > -1) { // if the user has voted for this item...
        colleges.forEach(function(college) { // if the item has the property for this college...
          if (item.college == college) {
            meals.forEach(function(meal) { // if the item has this meal identifier, increment temp with this property
              if (item.meal == meal) {
                var newMeal = meal.toLowerCase();
                var newCollege = college.toLowerCase();
                temp[newMeal][newCollege] += 1;
              }
            })
          }
        })
      }
    })

    ////////////////// This is all for error handling ///////////////////
    var altBreakfast = 0;
    var altLunch = 0;
    var altDinner = 0;

    for (var key in temp.breakfast) {
      if (temp.breakfast[key] > 0) {
        altBreakfast += 1;
      }
    }
    for (var key in temp.lunch) {
      if (temp.lunch[key] > 0) {
        altLunch += 1;
      }
    }
    for (var key in temp.dinner) {
      if (temp.dinner[key] > 0) {
        altDinner += 1;
      }
    }

    if (altBreakfast > 0) {
      var breakfast = _.invert(temp.breakfast)[_.max(temp.breakfast)]
    } else {
      var breakfast = "Insufficient Data"
    }
    if (altLunch > 0) {
      var lunch = _.invert(temp.lunch)[_.max(temp.lunch)]
    } else {
      var lunch = "Insufficient Data"
    }
    if (altDinner > 0) {
      var dinner = _.invert(temp.dinner)[_.max(temp.dinner)]
    } else {
      var dinner = "Insufficient Data"
    }
    ////////////////// This is all for error handling ///////////////////
    

    var recommended = { breakfast: breakfast, lunch: lunch, dinner: dinner};
    // console.log(user._id);
    // console.log(recommended);

    Meteor.users.update({ _id: user._id},{$set: {"profile.recommended": recommended }})

    // Here is where I want to update the user profile to contain the information.




  })
}
