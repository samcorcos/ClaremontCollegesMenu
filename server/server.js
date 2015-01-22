Meteor.methods({
	getMenus: function(){
		var results = Meteor.http.get("https://aspc.pomona.edu/menu/", {timeout: 30000});
    	var html = results.content;
    	$ = cheerio.load(html)

		// These values are hard-coded
		var meals = ["Breakfast", "Lunch", "Dinner"];

		// These will be the IDs we will iterate over to get the menu items.
		var diningHalls = ["#frank_menu", "#frary_menu", "#oldenborg_menu", "#cmc_menu", "#scripps_menu", "#pitzer_menu", "#mudd_menu"];

    	// var table = $("#meal_header>th").text();
    	var frank = $("#frank_menu").text();

    	//this is getting things roughly right
    	var menus = [];
    	var leadingSpaces = new RegExp(/\s+/);
    	diningHalls.forEach(function(hall){
    		var thisMenu = $(hall).text();
    		thisMenu = thisMenu.split('\n');
    		thisMenu.forEach(function(ele,index){
    			var spaceMatch = ele.match(leadingSpaces);
    			if(spaceMatch){
    				spaceMatch = spaceMatch[0];
    				if(ele===spaceMatch || ele.length ===0){
    					thisMenu.splice(index,1);
    				}
    			}
    		})
    		menus.push(thisMenu)
    	})
/*
    	// Schema?
    	{
    		diningHallName: {
    			date: date,
    			breakfast: [items],
    			lunch: [items],
    			dinner:[items]
    		},
    	}

		// var parseMenu = function(diningHalls) {
		// 	diningHalls.forEach(function(hall){
		// 	})
		// }
		test = frank.split('\n');
		var leadingSpaces = new RegExp(/\s+/);
		test.forEach(function(ele,index){
			var spaceMatch = ele.match(leadingSpaces);
			if(spaceMatch){
				spaceMatch=spaceMatch[0];  //Regex always returns type array
				if(ele===spaceMatch || ele.length ===0){  //If entry was entirely spaces, this is true
					test.splice(index,1);
				} 
				else {
					//Trim whitespace wasn't working in here, my logic is probably off somewhere
				}
			}
		})
		test.forEach(function(ele,index){
			test[index] = ele.trim();
		})
		test = test.filter(function(item){return item!==''})
*/

    return menus;
	}
});
