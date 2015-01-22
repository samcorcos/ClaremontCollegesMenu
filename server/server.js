Meteor.methods({
	getMenus: function(){
		var results = Meteor.http.get("https://aspc.pomona.edu/menu/", {timeout: 30000});
    	var html = results.content;
    	$ = cheerio.load(html)

		// These values are hard-coded
		var meals = ["Breakfast", "Lunch", "Dinner"];
		// These will be the IDs we will iterate over to get the menu items.
		var diningHalls = ["#frank_menu","#frary_menu", "#oldenborg_menu", "#cmc_menu", "#scripps_menu", "#pitzer_menu", "#mudd_menu"];
    	var menus = [];
    	diningHalls.forEach(function(hall){
    		var thisMenu=$(hall).text();
    		thisMenu = thisMenu.split('\n');
    		
    		console.log(thisMenu)
    		var newMenu=[];
    		thisMenu.forEach(function(item,index){
    				var fixedItem = item.replace(/\t+/,'');
    			if(fixedItem!==''){
    				newMenu.push(fixedItem)
    			}
    		});
    		menus.push(newMenu)
    	});
    return menus;
	}
});
