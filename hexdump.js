function hex(code) {
  return ('0000' + code.toString(16)).slice(-4);
}

function pad(chr) {
  return ('    ' + chr).slice(-4);
}

function hexdump(str) {
  let rows = [];
  let codes = [];
  let chars = [];

  for (let i = 0; i < str.length; i += 1) {
    let code = str.charCodeAt(i);
    let chr = code < 0xFF ? String.fromCharCode(code) : '';
    codes.push(hex(code));
    chars.push(pad(chr));
    if (codes.length === 16) {
      rows.push(codes);
      rows.push(chars);
      codes = [];
      chars = [];
    }
  }
  if (codes.length) {
    rows.push(codes);
    rows.push(chars);
  }

  for (let i = 0; i < rows.length; i += 1) {
    console.log(rows[i].join(' '));
  }
}

const str = 'Boys Scarves Online. Shop for Boys Scarves in Indiaâ¯ Buy latest range of Boys Scarves at Myntraâ¯ Free Shippingâ¯ CODâ¯ 30 Day Returns';
hexdump(str);