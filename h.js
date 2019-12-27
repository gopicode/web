var hyper = require('hyperscript')

function isString (obj) {
	return Object.prototype.toString.call(obj) == '[object String]'
}

function isArray (obj) {
	return Object.prototype.toString.call(obj) == '[object Array]'
}

function isObject (obj) {
	return Object.prototype.toString.call(obj) == '[object Object]'
}

module.exports = function h() {
	var args = Array.prototype.slice.apply(arguments)
	// return hyper.apply(hyper, args)

	var markups = []
	var name = args[0]

	function push(elem) {
		if (!elem) return elem

		if (isArray(elem)) {
			elem.forEach(push)
			return null
		}

		if (isObject(elem) && elem.outerHTML) {
			markups.push(elem.outerHTML)
			return null
		}

		return elem
	}

	var props = push(args[1])
	var content = push(args[2])

	// props is element, content is something
	// example h('span', h('em', 'Good'), ' to know')
	if (content && !props) {
		markups.push(content)
		content = null
	}

	var isError = false
	for (var i = 3, n = args.length; i < n; i += 1) {
		var arg = push(args[i])

		if (typeof arg === 'string' || typeof arg === 'number') {
			markups.push(arg)
		}
		else if (arg) {
			isError = true
			console.error('invalid arg', i, typeof arg, arg);
		}
	}

	var tagName = name.split(/\.|#/).shift() || 'div'
	var endTag = '</' + tagName + '>'
	var endTagRex = new RegExp(endTag + '$')
	// console.log(name, endTag, endTagRex.source)

	var html = hyper(name, props, content).outerHTML
	var outerHTML = html.replace(endTagRex, '') + markups.join('') + endTag

	return {
		outerHTML: outerHTML
	}
}

