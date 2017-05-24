var s = prompt("enter the css selector"),
		d = document,
		n = d.querySelector(s),
    k = [].slice;
if (n) {
    k.call(d.getElementsByTagName('script')).forEach(e => e.parentNode.removeChild(e));
    k.call(d.getElementsByTagName('iframe')).forEach(e => e.parentNode.removeChild(e));
		d.open();
		d.write(n.outerHTML);
		d.close();
}

