import { Tree,prettyPrint } from "./BST.js";

// Create a tree
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

// Print the tree
console.log("Initial balanced tree:");
prettyPrint(tree.root);

// Insert some values
tree.insert(10);
tree.insert(11);
tree.insert(12);

console.log("\nAfter inserting 10, 11, 12:");
prettyPrint(tree.root);

// Check if tree is balanced
console.log("\nIs tree balanced?", tree.isBalanced());

// Rebalance the tree if needed
if (!tree.isBalanced()) {
  tree.rebalance();
  console.log("\nAfter rebalancing:");
  prettyPrint(tree.root);
}

// Find a node
const found = tree.find(9);
console.log("\nFound node with value 9:", found ? found.data : "Not found");

// Get height and depth
console.log("\nHeight of node 9:", tree.height(9));
console.log("Depth of node 9:", tree.depth(9));

// Traversals
console.log("\nLevel-order traversal:");
tree.levelOrder(node => console.log(node.data));

console.log("\nIn-order traversal:");
tree.inOrder(node => console.log(node.data));

console.log("\nPre-order traversal:");
tree.preOrder(node => console.log(node.data));

console.log("\nPost-order traversal:");
tree.postOrder(node => console.log(node.data));

// Delete a node
tree.deleteItem(9);
console.log("\nAfter deleting 9:");
prettyPrint(tree.root);