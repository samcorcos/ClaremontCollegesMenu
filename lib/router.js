Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "notFound",
  loadingTemplate: "loading"
})

Router.map(function() {
  this.route("landing", { path: "/", controller: "HomeController"});
  this.route("settings", { path: "/settings", controller: "SettingsController"});
  this.route("notifications", { path: "/notifications"});
  this.route("recommendations", { path: "/recommendations"});
  this.route("cmc", { path: "/cmc"});
  this.route("mudd", { path: "/mudd"});
  this.route("scripps", { path: "/scripps"});
  this.route("pitzer", { path: "/pitzer"});
  this.route("frary", { path: "/frary"});
  this.route("frank", { path: "/frank"});
  this.route("oldenborg", { path: "/oldenborg"});
})
