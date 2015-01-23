Meteor.methods({
  toggleStarred: function(itemId) {
  	var thisUser = Meteor.user();
  	if(thisUser.profile.starred){
  		if(thisUser.profile.starred.indexOf(itemId)===-1){
  				Meteor.users.update({_id:thisUser._id},{$addToSet: {"profile.starred": itemId}})
  		} else {
  			Meteor.users.update({_id:thisUser._id},{$pull: {"profile.starred": itemId}})
  		}
  	} else {
  		Meteor.users.update({_id:thisUser._id},{$set: {"profile.starred": [itemId]}})
  	}
    // This is where we change the current user's favorite in his profile
  }
})


//{{currentUser.profile.starred}}