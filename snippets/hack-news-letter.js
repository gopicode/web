// hack news
(function() {
    console.clear();
    var out = {
        collection: {}
    };

    var parts = document.querySelector('#content > tbody > tr:nth-child(0n+2) > td').textContent.trim().split(' // ');
    out.issueNo = +parts[0].replace('Issue #', '');
    var dt  = new Date(parts[1]);
    out.issueDate = [dt.getFullYear(), ('0' + (dt.getMonth() + 1)).substr(-2), ('0' + dt.getDate()).substr(-2)].join('-');

    var links;
    var root = document.querySelector('#content > tbody > tr:nth-child(0n+3) > td');
    for (var el = root.firstElementChild; el; el = el.nextElementSibling) {
        // console.log(el.tagName);
        if (el.tagName === 'H2') {
            var topic = el.textContent.trim().replace('#', '').toLowerCase();
            if (topic !== 'sponsor') {
              links = [];
              out.collection[topic] = links;
            }
        } else if (typeof links !== 'undefined' && el.tagName === 'P') {
            var a = el.querySelector('a');
            if (!a) continue;
            var item = {
                title: a.textContent,
                href: a.href.replace(/\utm_[a-z]+=[a-zA-Z0-9_-]+&?/g, '').replace(/[\?&]+$/, '')
            };
            links.push(item);
        }
    }
    console.log(JSON.stringify(out, null, 2));
}())
