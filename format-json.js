const tab = '\t';
const spaces = [''];
for (var i = 1; i < 20; i++) {
	spaces[i] = spaces[i - 1] + tab;
}

function formatJson(obj, level = 1) {
	if (null === obj) return '"null"';
	if (typeof obj === 'number') return obj;
	if (typeof obj === 'boolean') return obj ? 'true' : 'false';

	if (typeof obj === 'string') {
		// keep the quote and newlines
		const value = obj.replace(/"/g, '\\"').replace(/(\r|\n)/g, '\\n');
		return `"${value}"`;
	}

	const out = [];
	const indent = spaces[level];

	if (Array.isArray(obj)) {
		const values = obj.map(item => formatJson(item, level + 1));

		// if there is no nested structure, render it in single line
		const hasNested = values.some(v => Array.isArray(v));
		if (values.length < 5 && !hasNested) {
			return ('[' + values.join(', ') + ']');
		}

		out.push('[');
		obj.forEach((item, i) => {
			const comma = i < obj.length - 1 ? ',' : '';
			const kids = values[i]; //formatJson(item, level + 1);
			if (Array.isArray(kids)) {
				const first = kids.shift();
				const last = kids.pop();
				out.push(indent + first);
				kids.forEach((kid, j) => {
					out.push(kid)
				})
				out.push(indent + last);
				if (comma) {
					out[out.length - 1] = out[out.length - 1] + comma
				}
			}
			else {
				out.push(indent + kids + comma);
			}
		})
		out.push(']');
		return out;
	}
	else if (typeof obj === 'object') {
		const keys = Object.keys(obj);
		const values = keys.map(k => formatJson(obj[k], level + 1));

		// if there is no nested structure, render it in single line
		const hasNested = values.some(v => Array.isArray(v));
		if (values.length < 5 && !hasNested) {
			const kv = [];
			values.forEach((v, i) => {
				const k = keys[i];
				kv.push(`"${k}": ${v}`);
			});
			return ('{' + kv.join(', ') + '}');
		}

		out.push('{');
		keys.forEach((k, i) => {
			// const item = values[k];
			const comma = i < keys.length - 1 ? ',' : '';
			const kids = values[i]; //formatJson(item, level + 1);
			if (Array.isArray(kids)) {
				const first = kids.shift();
				const last = kids.pop();
				out.push(indent + `"${k}": ` + first);
				kids.forEach((kid, j) => {
					out.push(kid)
				})
				out.push(indent + last);
				if (comma) {
					out[out.length - 1] = out[out.length - 1] + comma
				}
			}
			else {
				out.push(indent + `"${k}": ` + kids + comma);
			}
		});
		out.push('}');
		return out;
	}
	else {
		// it should never reach here
		throw new Error('Unknown type', typeof obj, obj);
	}
}

module.exports = function(inp) {
	const out = formatJson(inp);
	return (Array.isArray(out) ? out.join('\n') : out);
}

