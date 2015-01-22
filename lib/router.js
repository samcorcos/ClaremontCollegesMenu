Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "notFound",
  loadingTemplate: "loading"
})

Router.map(function() {
  this.route("home", { path: "/", controller: "HomeController" });
  this.route("settings", { path: "/settings"});
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

// //Example controller
// this.AboutController = RouteController.extend({
//   template: "about",
//   yieldTemplates: {
//     /*YIELD_TEMPLATES*/
//   },
//   onBeforeAction: function() {
//     /*BEFORE_FUNCTION*/
//     this.next();
//   },
//   action: function() {
//     this.render();
//     /*ACTION_FUNCTION*/
//   },
//   waitOn: function() {
//     return [
//     ];
//     /*WAIT_FUNCTION*/
//   },
//   data: function() {
//     return {
//       params: this.params || {}
//     };
//     /*DATA_FUNCTION*/
//   },
//   onAfterAction: function() {
//   }
// });
