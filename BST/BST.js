export class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree{
    constructor(array){
        const sortedArray = [...new Set(array)].sort((a,b)=> a-b); 
        this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1)
    }
    buildTree(array,start,end){
        if (start > end) return null;
        const mid = Math.floor((start+end)/2);
        const node = new Node(array[mid]);

        node.left = this.buildTree(array,start,mid-1);
        node.right = this.buildTree(array,mid+1,end);

        return node;
    }
    insert(value,node=this.root){
        if(node == null) return new Node(value);
        if(value<node.data){
            node.left=this.insert(value,node.left);
        }else{
            node.right= this.insert(value,node.right)
        }
        return node;
    }
    deleteItem(value,node=this.root){
        if(node===null) return null;
        if(value<node.data){
            node.left = this.deleteItem(value,node.left)
        }else if(value>node.data){
            node.right = this.deleteItem(value,node.right);
        }else{
        if(node.left===null) return node.right;
        if(node.right===null) return node.left;

        node.data = this.#minValue(node.right);
        node.right = this.deleteItem(node.data,node.right)
        }
        return node;
    }
    #minValue(node){
        let current = node;
        while(current.left!==null){
            current = current.left;
        }
        return current.data;
    }
    find(value, node = this.root){
        if(node===null) return null;
        if(value === node.data) return node;

        if(value<node.data){
            return this.find(value,node.left)
        }else{
            return this.find(value,node.right);
        }
    }
    levelOrder(callback){
        if(!callback) throw new Error('callback function is required.');
        const queue = [this.root];
        while(queue.length>0){
            const current = queue.shift();
            callback(current);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
    }
    inOrder(callback, node= this.root){
         if(!callback) throw new Error('callback function is required.');
         if(node===null) return;
         this.inOrder(callback,node.left);
         callback(node);
         this.inOrder(callback,node.right);

    }
    preOrder(callback,node=this.root){
         if(!callback) throw new Error('callback function is required.');
         if(node===null) return;
         callback(node);
         this.preOrder(callback,node.left);
         this.preOrder(callback,node.right);
    }
    postOrder(callback,node=this.root){
         if(!callback) throw new Error('callback function is required.');
         if(node===null) return;
         this.postOrder(callback,node.left);
         this.postOrder(callback,node.right);
         callback(node);
    }
    // ////////
  height(value) {
    // First find the node with the given value
    const targetNode = this.find(value);
    if (!targetNode) return null;
    
    // Now calculate height without helper
    const stack = [[targetNode, -1]]; // [node, currentHeight]
    let maxHeight = -1;
    
    while (stack.length > 0) {
        const [current, currentHeight] = stack.pop();
        maxHeight = Math.max(maxHeight, currentHeight);
        
        if (current.left) {
            stack.push([current.left, currentHeight + 1]);
        }
        if (current.right) {
            stack.push([current.right, currentHeight + 1]);
        }
    }
    
    return maxHeight;
}
    depth(value) {
    if (!this.root) return null;
    
    let current = this.root;
    let depth = 0;
    
    while (current) {
        if (value === current.data) {
            return depth;
        }
        
        if (value < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
        depth++;
    }
    return null;
}
    isBalanced(node=this.root){
        if(node===null) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.abs(leftHeight - rightHeight)<=1 && this.isBalanced(node.left) && this.isBalanced(node.right);
    }
    rebalance(){
        const nodes=[];
        this.inOrder(node=>nodes.push(node.data));
        this.root = this.buildTree(nodes, 0,nodes.length-1)
    }
}
    export const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
    };
