Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "notFound",
  loadingTemplate: "loading"
})

Router.map(function() {
  this.route("home", { path: "/"});
  this.route("settings", {path: "/settings"});
  this.route("notifications", {path: "/notifications"});
  this.route("recommendations", {path: "/recommendations"});
})
