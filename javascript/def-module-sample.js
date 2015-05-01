
// http://ifandelse.com/its-not-hard-making-your-library-support-amd-and-commonjs/
(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(["postal"], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory(require("postal"));
  } else {
    root.myModule = factory(root.postal);
  }
}(this, function(postal) {
  var sub;
  var ch = postal.channel("myModule");
  var myModule = {
    sayHi:function() {
      ch.publish("hey.yall", { msg: "myModule sez hai" });
    },
    dispose: function() {
      sub.unsubscribe();
    }
  };
  return myModule;
}));

