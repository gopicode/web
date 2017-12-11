(function() {
	console.clear();
	var nodes = document.getElementsByTagName('a');
	// console.log('nodes.length', nodes.length);
	var map = Array.prototype.map;
	var linksAll = map.call(nodes, function(item) { return item.href });
	// console.log('linksAll', linksAll);

	var links = [];
	var rex = /list=PLXRActLQ03oaLHR6knkjDndNOCNYyCYzq/;
	linksAll.forEach(function(item) {
		// console.log(item);
		if (rex.test(item) && /index=\d+/.test(item)) {
			links.push(item.replace(rex, ''))
		}
	});

	links.sort(function(a, b) {
		var i = +/index=(\d+)/.exec(a)[1]
		var j = +/index=(\d+)/.exec(b)[1]
		return (i < j ? -1 : 1)
	});
	console.log(links.join("\n"));
}())
