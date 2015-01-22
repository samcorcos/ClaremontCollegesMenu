Router.configure({
  layoutTemplate: "layout"
})

Router.map(function() {
  this.route("home", { path: "/"});
  this.route("settings", {path: "/settings"});
  this.route("notifications", {path: "/notifications"});
  this.route("recommendations", {path: "/recommendations"});
})
