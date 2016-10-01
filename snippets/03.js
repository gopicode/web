console.clear();

(function() {
    var orig = console.log;
    var log = function() {
        var args = Array.prototype.slice.call(arguments);
        var ts = new Date().toISOString();
        args.unshift(ts);
        console.log(args);
        orig.apply(console, args);
    };
    log('First log', 100);
    log('Second log', 200);
}())