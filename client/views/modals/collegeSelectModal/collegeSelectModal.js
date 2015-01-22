Template.collegeSelectModal.helpers({
  collegeList: function() {
    return ["Claremont McKenna", "Harvey Mudd", "Scripps", "Pitzer", "Frary", "Frank", "Oldenborg"];
  }
})

Template.collegeSelectModal.events({
  'click a': function(e,t) {
    IonModal.close();
  }
})
