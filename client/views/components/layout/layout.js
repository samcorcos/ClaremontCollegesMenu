Template.layout.events({
  'click #toggle-left-button':function(e,t) {

    // Need to figure out how to get this transition to go the right way...

    var collegeName = $("#college-name").text().toLowerCase();
    var collegeList = ["cmc", "mudd", "scripps", "pitzer", "frary", "frank", "oldenborg"];

    var currIndex = collegeList.indexOf(collegeName);

    if (currIndex === 0) {
      Router.go("/oldenborg")
    } else {
      var newIndex = currIndex - 1;
      var newRoute = collegeList[newIndex];
      Router.go("/"+newRoute)
    }
  },
  'click #toggle-right-button': function(e,t) {

    var collegeName = $("#college-name").text().toLowerCase();
    var collegeList = ["cmc", "mudd", "scripps", "pitzer", "frary", "frank", "oldenborg"];

    var currIndex = collegeList.indexOf(collegeName);

    if (currIndex === 6) {
      Router.go("/cmc")
    } else {
      var newIndex = currIndex + 1;
      var newRoute = collegeList[newIndex];
      Router.go("/"+newRoute)
    }
  },
  'click .ion-ios-book': function(e,t) {
    IonModal.open("collegeSelectModal")
  }
})
