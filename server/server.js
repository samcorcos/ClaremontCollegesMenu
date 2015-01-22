Meteor.methods({
	getMenus: function(){
		var results = Meteor.http.get("https://aspc.pomona.edu/menu/", {timeout: 30000});
    	var html = results.content;
    	$ = cheerio.load(html)

		// These values are hard-coded
		var meals = ["Breakfast", "Lunch", "Dinner"];

		// These will be the IDs we will iterate over to get the menu items.
		var diningHalls = ["frank_menu", "frary_menu", "oldenborg_menu", "cmc_menu", "scripps_menu", "pitzer_menu", "mudd_menu"];

    	var table = $("#meal_header>th").text();
    	var frank = $("#frank_menu").text();

		// var parseMenu = function(diningHalls) {
		// 	diningHalls.forEach(function(hall){
				
		// 	})
		// }


		test = frank.split('\n');
		// console.log('ORIG LENGTH ',test.length)

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

    return test;
	}
});
