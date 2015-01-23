Meteor.methods({
	getMenus: function(){
		var results = Meteor.http.get("https://aspc.pomona.edu/menu/", {timeout: 30000});
		var html = results.content;
		$ = cheerio.load(html)

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

			console.log('NEW MENU ',newMenu)
			var breakfastIndex = newMenu.indexOf('Breakfast');
			var lunchIndex = newMenu.indexOf('Lunch');
			var dinnerIndex = newMenu.indexOf('Dinner');
			var breakfast = newMenu.slice(breakfastIndex+1,lunchIndex)
			var lunch = newMenu.slice(lunchIndex+1,dinnerIndex)
			var dinner = newMenu.slice(dinnerIndex+1)
			menus.push({
				hall:halls[hall],
				breakfast:breakfast,
				lunch:lunch,
				dinner:dinner
			})
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

	menus.forEach(function(menuObject){
		menuObject.breakfast.forEach(function(item){
			var found = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Breakfast'});	
			if(!found){
				MenuItems.insert({
					itemName:item,
					college:menuObject.hall,
					meal:'Breakfast'
				},function(err,res){
					if(err){console.log(err)}
				})
			}
		});
		menuObject.lunch.forEach(function(item){
			var found = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Lunch'})
			if(!found){
				MenuItems.insert({
					itemName:item,
					college:menuObject.hall,
					meal:'Lunch'
				},function(err,res){
					if(err){console.log(err)}
						
				})
			}
		});
		menuObject.dinner.forEach(function(item){
			var found = MenuItems.findOne({itemName:item,college:menuObject.hall,meal:'Dinner'})
			if(!found){
				MenuItems.insert({
					itemName:item,
					college:menuObject.hall,
					meal:'Dinner'
				},function(err,res){
					if(err){console.log(err)}
						
				})
			}
		});
	})
};

var fillTodaysMenu = function(arrayOfMenuObjects){
	TodaysMenu.remove({});
	var menus = arrayOfMenuObjects;
	// var todaysMenu = [];
	menus.forEach(function(menuObject){
		// todaysMenu[menuObject.hall] = {breakfast:[],lunch:[],dinner:[]};
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
