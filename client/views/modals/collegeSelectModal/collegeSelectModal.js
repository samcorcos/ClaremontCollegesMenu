Template.collegeSelectModal.helpers({
  collegeList: function() {
    return [{name: "Claremont McKenna", route: "cmc"}, {name: "Harvey Mudd", route: "mudd"}, {name: "Scripps", route: "scripps"}, {name: "Pitzer", route: "pitzer"}, {name: "Frary", route: "frary"}, {name: "Frank", route: "frank"}, {name: "Oldenborg", route: "oldenborg"}];
  }
})

Template.collegeSelectModal.events({
  'click a': function(e,t) {
    IonModal.close();
  }
})
