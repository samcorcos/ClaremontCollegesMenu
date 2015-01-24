// The best way to do it is 1) update menus, 2) calculate notifications for the day, 3) Calculate recommendations for the day

// var now = new Date();
// var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
// if (millisTill10 < 0) {
// 	millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
// }
// setTimeout(function(){alert("It's 10am!")}, millisTill10);



Meteor.methods({
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

		populateCollections(menus);
		//take the same items from today and find them
		//the ones that are found are on todays menu

		fillTodaysMenu(menus);
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

var fillTodaysMenu = function(arrayOfMenuObjects){
	TodaysMenu.remove({});
	var menus = arrayOfMenuObjects;
	menus.forEach(function(menuObject){
		menuObject.breakfast.forEach(function(item){
			var fetched = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Breakfast'});
			TodaysMenu.insert(fetched)
		});
		menuObject.lunch.forEach(function(item){
			var fetched = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Lunch'});
			TodaysMenu.insert(fetched)
		});
		menuObject.dinner.forEach(function(item){
			var fetched = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Dinner'});
			TodaysMenu.insert(fetched)
		});
	})
};
