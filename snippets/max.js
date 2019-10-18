/**
Implement a function that will return the max depth of the HTML tree in a web page
Also, it returns the trace of the max-depth leaf node from the root node

Example output:
url https://github.com/dunglas/vulcain
maxDepth 19
maxChain HTML->BODY->DIV->HEADER->DIV->DETAILS->DETAILS-MENU->DIV->DIV->DETAILS->DETAILS-DIALOG->FORM->DIV->DIV->DIV->SPAN->BUTTON->SPAN->svg->path
*/

(function(){
  console.clear();

  function getMax(node, depth = 0, traces = []) {
   const kids = Array.from(node.childNodes).filter(node => node.nodeType === 1)
   if (!kids.length) {
     return {maxDepth: depth, maxChain: [...traces, node]}
   }

   let maxDepth = depth;
   let maxChain = traces;
   kids.forEach(kid => {
     let result = getMax(kid, depth + 1, [...traces, node])
     if (result.maxDepth > maxDepth) {
      maxDepth = result.maxDepth
      maxChain = result.maxChain
     }
   })

   return {maxDepth, maxChain}
  }

  const result = getMax(document.documentElement);
  console.log('url', document.URL);
  console.log('maxDepth', result.maxDepth);
  console.log('maxChain', result.maxChain.map(el => el.nodeName).join('->'));
  result.maxChain.forEach(el => console.log(el));
}())