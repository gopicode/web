/*
Given a sequence consisting of letters and numbers, re-arrange the sequence so that the numbers come together first, while maintaining their initial order in the sequence (not allowed to use additional memory).
*/

function rotateRight(list, from, to) {
  // console.log('rotateRight', from, to);
  const tmp = list[to];
  for (let i = to - 1; i >= from; i -= 1) {
    list[i + 1] = list[i];
  }
  list[from] = tmp;
}

function rearrange(list) {
  let i, j;
  for (i = 0; i < list.length; i += 1) {
    if (/\d/.test(list[i])) continue;
    for (j = i + 1; j < list.length; j += 1) {
      if (!/\d/.test(list[j])) continue;
      rotateRight(list, i, j);
      break;
    }
  }
}

function main() {
  const list = 'mw12gh45f7d3'.split('');
  console.log('before', list.join('')); // mw12gh45f7d3
  rearrange(list);
  console.log(' after', list.join('')); // 124573mwghfd
}

main();
