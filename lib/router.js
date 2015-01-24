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
  this.route("cmc", { path: "/cmc",
    action: function() {
      Session.set("currentCollege", "CMC");
      this.render("cmc");
    }
  });
  this.route("mudd", { path: "/mudd",
    action: function() {
      Session.set("currentCollege", "Mudd");
      this.render("mudd");
    }
  });
  this.route("scripps", { path: "/scripps",
    action: function() {
      Session.set("currentCollege", "Scripps");
      this.render("scripps");
    }
  });
  this.route("pitzer", { path: "/pitzer",
    action: function() {
      Session.set("currentCollege", "Pitzer");
      this.render("pitzer");
    }
  });
  this.route("frary", { path: "/frary",
    action: function() {
      Session.set("currentCollege", "Frary");
      this.render("frary");
    }
  });
  this.route("frank", { path: "/frank",
    action: function() {
      Session.set("currentCollege", "Frank");
      this.render("frank");
    }
  });
  this.route("oldenborg", { path: "/oldenborg",
    action: function() {
      Session.set("currentCollege", "Oldenborg");
      this.render("oldenborg");
    }
  });
})
