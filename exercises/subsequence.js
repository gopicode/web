/*
Given a string "wal" find if it is a subsequence of a larger string such as "todaywalaetsmaasdfwrtabcd".

Example:
isSubSeq("walmart", "todaywalaetsmaasdfwrtabcd");//true

Note: A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ace" is a subsequence of "abcde" while "aec" is not).
*/


function isSubSeq(strSub, strFull) {
  let k = 0, count = 0;
  for (let i = 0; i < strFull.length; i += 1) {
    if (strFull[i] === strSub[k]) {
      count += 1;
      k += 1;
    }
  }
  return count === strSub.length;
}

console.log(isSubSeq("walmart", "todaywalaetsmaasdfwrtabcd"));
