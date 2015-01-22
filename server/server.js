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
		// These values are hard-coded
		var meals = ["Breakfast", "Lunch", "Dinner"];
		// These will be the IDs we will iterate over to get the menu items.
		var diningHalls = ["#frank_menu","#frary_menu", "#oldenborg_menu", "#cmc_menu", "#scripps_menu", "#pitzer_menu", "#mudd_menu"];
		var menus = [];

		diningHalls.forEach(function(hall){
			var thisMenu=$(hall).text();
			thisMenu = thisMenu.split('\n');

			var newMenu=[];
			thisMenu.forEach(function(item,index){
				var fixedItem = item.replace(/\t+/,'');
				if(fixedItem!==''){
					newMenu.push(fixedItem)
				}
			});
		
			var breakfastIndex = newMenu.indexOf('Breakfast');
			var lunchIndex = newMenu.indexOf('Lunch');
			var dinnerIndex = newMenu.indexOf('Dinner');
			var breakfast = newMenu.slice(breakfastIndex,lunchIndex)
			var lunch = newMenu.slice(lunchIndex,dinnerIndex)
			var dinner = newMenu.slice(dinnerIndex)
			menus.push({
				hall:halls[hall], 
				breakfast:breakfast,
				lunch:lunch,
				dinner:dinner
			})
		});

		populateCollections(menus);
		return 'Booya';
	},
});

var populateCollections = function(arrayOfMenuObjects){
	var menus= arrayOfMenuObjects;
	menus.forEach(function(menuObject){
		menuObject.breakfast.forEach(function(item){
			MenuItems.insert({
				itemName:item,
				college:menuObject.hall,
				meal:'Breakfast'
			},function(err,res){
				if(err){console.log(err)}
			})
		})
		menuObject.lunch.forEach(function(item){
			MenuItems.insert({
				itemName:item,
				college:menuObject.hall,
				meal:'Lunch'
			},function(err,res){
				if(err){console.log(err)}
			})
		})
		menuObject.dinner.forEach(function(item){
			MenuItems.insert({
				itemName:item,
				college:menuObject.hall,
				meal:'Dinner'
			},function(err,res){
				if(err){console.log(err)}
			})
		})
	})
}
