(function() {
   console.clear();
   var nodes = document.getElementsByTagName('a');
//    console.log('nodes', nodes);
   var map = Array.prototype.map;
   var linksAll = map.call(nodes, function(item) { return item.href });
//    console.log('linksAll', linksAll);
   var links = linksAll.filter(function(item) { 
//         console.log(item);
        return /http:\/\/www.tamilmp3online.com\/download\.php/.test(item)
   });
   console.log(links.join("\n")); 
}())