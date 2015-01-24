// The best way to do it is 1) update menus, 2) calculate notifications for the day, 3) Calculate recommendations for the day

startTimer = function() {

	// 86400000 = milliseconds in 24 hours
	// Today at 6am PST: 1422097200000

	var now = new Date().getTime();
	var msUntil6AMPST = (86400000 - ((now - 1422097200000) % 86400000));

	// Starts the initial timer so that the ongoing timer will run every 24 hours at 6AM PST
	Meteor.setTimeout(function() {
		ongoingTimer();
		Meteor.call("getMenus");
	}, msUntil6AMPST)
}

var ongoingTimer = function() {
	Meteor.setInterval(function() {
		console.log("Retrieving menus...");
		Meteor.call("getMenus");
		// We're going to want to call a number of things in here, including:
			// 1) Calculate notifications for the day
			// 2) Calculate recommendations for the day
	}, 86400000)
}

////////////////// Show these to Justin for testing ////////////////////
// startTimer = function() {
//
// 	// 86400000 = milliseconds in 24 hours
// 	// Today at 6am PST: 1422097200000
//
// 	var now = new Date().getTime();
// 	var msUntil6AMPST = (86400000 - ((now - 1422097200000) % 86400000));
//
// 	// Starts the initial timer so that the ongoing timer will run every 24 hours at 6AM PST
// 	Meteor.setTimeout(function() {
// 		ongoingTimer();
// 		console.log("Initial timer set");
// 	}, 5000)
//
// }
//
// var ongoingTimer = function() {
// 	console.log("ongoing Timer running and called");
// 	Meteor.setInterval(function() {
// 		Meteor.call("getMenus")
// 	}, 10000)
// }
//
///////////////////// Show these to Justin for testing ///////////////////


Meteor.methods({
	// This doesn't need to be called from the client anymore, explain how this works to Justin
	getMenus: function(){
		console.log("RUNNING");
		var results = Meteor.http.get("https://aspc.pomona.edu/menu/", {timeout: 30000});
		var html = results.content;
		$ = cheerio.load(html);

		var halls ={
			"#frank_menu" : "Frank",
			"#frary_menu": "Frary",
			"#oldenborg_menu": "Oldenborg",
			"#cmc_menu":"CMC",
			'#scripps_menu':"Scripps",
			"#pitzer_menu":"Pitzer",
			"#mudd_menu":"Mudd"
		};
		// // These values are hard-coded
		// var meals = ["Breakfast", "Lunch", "Dinner"];
		// These will be the IDs we will iterate over to get the menu items.
		var diningHalls = ["#frank_menu","#frary_menu", "#oldenborg_menu", "#cmc_menu", "#scripps_menu", "#pitzer_menu", "#mudd_menu"];
		var menus = [];

		diningHalls.forEach(function(hall){
			var thisMenu=$(hall).text();
			thisMenu = thisMenu.split('\n');

			var newMenu=[];
			thisMenu.forEach(function(item,index){
				var fixedItem = item.replace(/\t+/,'');
				var fixedItem = fixedItem.trim();
				if(fixedItem!==''){
					newMenu.push(fixedItem)
				}
			});

			var breakfastIndex = newMenu.indexOf('Breakfast');
			var lunchIndex = newMenu.indexOf('Lunch');
			var dinnerIndex = newMenu.indexOf('Dinner');
			var breakfast = newMenu.slice(breakfastIndex+1,lunchIndex);
			var lunch = newMenu.slice(lunchIndex+1,dinnerIndex);
			var dinner = newMenu.slice(dinnerIndex+1);
			menus.push({
				hall:halls[hall],
				breakfast:breakfast,
				lunch:lunch,
				dinner:dinner
			});
		});

		populateCollections(menus); // Populates the Menus

		Meteor.setTimeout(function() { // Populates the user recommendations for the day
			getRecommendations();
			getNotifications();
		}, 30000)												// As much as I trust fibers, I dont want to risk it

		// sendNotifications()			// Sends user notifications out for the day

		return 'BOOYA';

	},
});

var populateCollections = function(arrayOfMenuObjects){
	var menus= arrayOfMenuObjects;
	var today = moment().format("MMMM D YYYY");
	menus.forEach(function(menuObject){
		menuObject.breakfast.forEach(function(item){
			MenuItems.upsert({itemName:item,college:menuObject.hall,meal:'Breakfast'},
				{
					$addToSet: {dateHistory: today},
					$set:{date:today}
				}
			);
		});
		menuObject.lunch.forEach(function(item){
			MenuItems.upsert({itemName:item,college:menuObject.hall,meal:'Lunch'},
				{
					$addToSet: {dateHistory: today},
					$set:{date:today}
				}
			);
		});
		menuObject.dinner.forEach(function(item){
			MenuItems.upsert({itemName:item,college:menuObject.hall,meal:'Dinner'},
				{
					$addToSet: {dateHistory: today},
					$set:{date:today}
				}
			);
		});
	});
};
