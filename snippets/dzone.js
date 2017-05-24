function grep() {
	var $list = document.querySelectorAll('.main > li');
	var groups = [];
	var authors = [];
	var articles = [];

	for (var i = 0; i < $list.length; i++) {
		var $item = $list[i];
		var $group = $item.querySelector('.portal-title-section > h2 > a');
		var groupId = groups.length + 1;
		var group = {id: groupId, name: $group.textContent.trim(), link: $group.href};
		groups.push(group);

		var $titles = $item.querySelectorAll('.titles');
		for (var j = 0; j < $titles.length; j++) {
			var article = Object.create(null);
			article.id = articles.length + 1;
			article.groupId = groupId;

			var $meta = $titles[j].querySelector('.article-meta a');
			var thisAuthor = {id: authors.length + 1, name: $meta.textContent.trim(), link: $meta.href};
			var author = authors.find(item => item.name == thisAuthor.name);
			if (!author) {
				authors.push(thisAuthor);
				author = thisAuthor;
			}
			article.authorId = author.id;

			var $title = $titles[j].querySelector('.article-title > a');
			if (!$title) {
				$title = $titles[j].querySelector('.first-title > a');
			}
			article.title = $title.textContent.trim();
			article.link = $title.href;

			var $image = $titles[j].querySelector('.article-image-wrap > img');
			if ($image) {
				// var style = getComputedStyle($image);
				// var width = +style.getPropertyValue('width').replace('px', '');
				// var height = +style.getPropertyValue('height').replace('px', '');
				article.image = $image.src;
			}

			articles.push(article);
		}
	}

	return {status: 'ok', data: {groups, authors, articles}};
}

console.clear();
var resp = grep()
var json = JSON.stringify(resp, null, 4);
console.log(json);
// var win = window.open();
// win.document.open();
// win.document.write('<pre>' + json + '</pre>');
// win.document.close();

