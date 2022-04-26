var gDomTree = createTree();
var gNumsTree = createNumsTree();

printTree(gDomTree);
// printTree(gNumsTree);

findInTree(gDomTree, 'h1');
printDividedBy(gNumsTree, 2);

function createTree() {
  var dom = createNode('html');
  var head = addChild(dom, 'head');
  var body = addChild(dom, 'body');

  var title = addChild(head, 'title - Tree Lesson!');
  var h1 = addChild(body, 'h1 - Trees!');
  var copyright = addChild(body, `Coffeerights ${new Date().getFullYear()}`);
  return dom;
}

function createNumsTree() {
  var root = createNode(7);
  var n1 = addChild(root, 5);
  var n2 = addChild(root, 9);

  var n12 = addChild(n1, 2);
  var n16 = addChild(n1, 6);
  var n21 = addChild(n2, 8);
  var n22 = addChild(n2, 12);

  return root;
}

function createNode(data) {
  return {
    data,
    children: [],
  };
}

function addChild(toParent, childData) {
  var childNode = createNode(childData);
  toParent.children.push(childNode);
  return childNode;
}

function printTree(rootNode) {
  function printNode(node, depth) {
    var str = `${' '.repeat(depth * 2)}${node.data}\n`;
    document.querySelector('pre').innerText += str;
    console.log(str);
  }
  traverse(rootNode, 0, printNode);
}

// a recursive function that traverses a tree,
// calling a visitFn on every node
// (the depth parameter is not a must)
function traverse(node, depth, visitFn) {
  visitFn(node, depth);
  node.children.forEach(function (childNode) {
    traverse(childNode, depth + 1, visitFn);
  });
}

function findInTree(rootNode, dataToFind) {
  // TODO: traverse the tree to find a piece of data in the tree
  // If found - just print a success message (no need to return the found node)
  function checkNode(node) {
    if (node.data.includes(dataToFind)) console.log('found it ' + node.data);
  }
  traverse(rootNode, 0, checkNode);
}

function printDividedBy(rootNode, divider) {
  // TODO: traverse a numbers tree and print all
  // numbers that is divided by the divider (e.g. – divided by 5)
  function checkNode(node) {
    if (node.data % divider === 0)
      console.log(node.data + 'is divided by ' + divider);
  }
  traverse(rootNode, 0, checkNode);
}
