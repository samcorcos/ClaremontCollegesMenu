// The best way to do it is 1) update menus, 2) calculate notifications for the day, 3) Calculate recommendations for the day

// startTimer = function() {
//
// 	// 86400000 = milliseconds in 24 hours
// 	// Today at 6am PST: 1422097200000
// 	// 21600000 milliseconds in 6 hours
//
// 	var now = new Date().getTime();
// 	var msUntil6AMPST = (86400000 - ((now - 1422097200000) % 86400000));
//
// 	// Starts the initial timer so that the ongoing timer will run every 24 hours at 6AM PST
// 	Meteor.setTimeout(function() {
// 		ongoingTimer();
// 		Meteor.call("getMenus");
// 	}, msUntil6AMPST)
// }
//
// var ongoingTimer = function() {
// 	Meteor.setInterval(function() {
// 		console.log("Retrieving menus...");
// 		Meteor.call("getMenus");
// 		// We're going to want to call a number of things in here, including:
// 			// 1) Calculate notifications for the day
// 			// 2) Calculate recommendations for the day
// 	}, 86400000)
// }

checkMenus = function() {
	var now = new Date().getTime();
	var msSince6AMPST = ((now - 1422097200000 - 10800000) % 86400000); // now, minus a day at 9am EST, - 3 hours in milliseconds, mod 24 hours
	var today = moment().format("MMMM D YYYY");

	if (!MenuItems.findOne({ date: today})) {
		Meteor.call("getMenus");
	}

}


Meteor.methods({
	// This doesn't need to be called from the client anymore, explain how this works to Justin
	getMenus: function(){
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
		// var diningHalls = ["#oldenborg_menu"]
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
			

			if(newMenu.indexOf('Brunch')!==-1){
				//Adjusting for weekends where there is only brunch and dinner
				var brunchIndex = newMenu.indexOf('Brunch');
				var dinnerIndex = newMenu.indexOf('Dinner');
				var brunch = newMenu.slice(brunchIndex+1,dinnerIndex);
				var dinner = newMenu.slice(dinnerIndex+1);

				menus.push({
					hall:halls[hall],
					brunch: brunch,
					dinner: dinner
				});

			} else if(newMenu.length){  
				//adjusting for when dining halls don't appear
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
			} 
		});

		populateCollections(menus); // Populates the Menus

		Meteor.setTimeout(function() { // Populates the user recommendations for the day
			getRecommendations();
			getNotifications();
		}, 30000)												// As much as I trust fibers, I dont want to risk it

		// sendNotifications()			// Sends user notifications out for the day
		// console.log("Fetching menus...");
		return 'Booya';

	},
});

var populateCollections = function(arrayOfMenuObjects){
	var menus= arrayOfMenuObjects;
	var today = moment().format("MMMM D YYYY");

	
	if(menus && menus[0].hasOwnProperty('brunch')){ 
		//if the first one has brunch, they all do
		menus.forEach(function(menuObject){
			
			menuObject.brunch.forEach(function(item){
				MenuItems.upsert({itemName:item,college:menuObject.hall,meal:'Brunch'},
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
		})
	} 
	else {
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
	} //end else
};
