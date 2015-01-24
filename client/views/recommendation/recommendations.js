Template.recommendations.rendered = function() {

};

Template.recommendations.helpers({
  recommended: function() {
    return Meteor.user().profile.recommended;
  },
  formatCollegeName: function(name) {
    if (name == "cmc") return "CMC";
    if (name == "pitzer") return "Pitzer";
    if (name == "scripps") return "Scripps";
    if (name == "frary") return "Frary";
    if (name == "mudd") return "Mudd";
    if (name == "frank") return "Frank";
    if (name == "oldenborg") return "Oldenborg";
    else {
      return "Insufficient data"
    }
  },
  colorSelect: function(college) {
    if (college == "cmc") return "card-assertive";
    if (college == "pitzer") return "card-balanced";
    if (college == "scripps") return "card-calm";
    if (college == "frary") return "card-energized";
    if (college == "mudd") return "card-positive";
    if (college == "frank") return "card-royal";
    if (college == "oldenborg") return "card-dark";
  }
});

Template.recommendations.events({

});
