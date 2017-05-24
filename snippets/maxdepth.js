function walk(el, d) {
    var kids = [].slice.call(el.childNodes).filter(node => node.nodeType === 1);
    var leaf = [el.tagName];
    var n = kids.length;
    if (!n) {
        return leaf;
    }

    var chains = [];
    for (var i = 0; i < n; i += 1) {
        var kid = kids[i];
        //if (d <= 13) {
            var kchains = walk(kid, d + 1);
            for (j = 0, jn = kchains.length; j < jn; j += 1) {
                var kchain = leaf.concat(kchains[j]);
                chains.push(kchain); //.join('>'));
            }
        //}
    }
    return chains;
}

console.clear();
var chains = walk(document.documentElement, 0);
// console.log('chains', JSON.stringify(chains));
var maxd = 0;
var maxchain = null;
chains.forEach(chain => {
    var n = chain.length;
    if (n > maxd) {
        maxd = n;
        maxchain = chain;
    }
});
console.log('max depth', maxd);
console.log('max chain', maxchain);

