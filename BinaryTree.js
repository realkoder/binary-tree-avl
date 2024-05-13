class BinaryTree {
  constructor(comparator) {
    this.root = null;
    this.comparator = comparator;
    this.height = 0;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  rightRotate(y) {
    const x = y.left;
    const T3 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T3;

    // Update heights post rotation
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x; // New root
  }

  // Rotate node to the left.
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights post rotation
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y; // New root
  }

  // Recursively inserts a node and performs rotations if necessary.
  insert(node, data) {
    if (!node) return new Node(data);

    const comparison = this.comparator(data, node.data);

    if (comparison < 0) {
      node.left = this.insert(node.left, data);
    } else if (comparison > 0) {
      node.right = this.insert(node.right, data);
    } else {
      return node; // Duplicate data not allowed.
    }

    // Update node's height.
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    this.height = this.height < node.height ? node.height : this.height;

    // Get the balance to check if it became unbalanced.
    const balance = this.getBalanceFactor(node);

    // Left heavy scenario
    if (balance > 1) {
      if (comparison < 0) {
        return this.rightRotate(node);
      } else {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    // Right heavy scenario
    if (balance < -1) {
      if (data > node.right.data) {
        return this.leftRotate(node);
      } else {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }

  add(data) {
    this.root = this.insert(this.root, data);
  }

  contains(item) {
    return this.containsRecursive(this.root, item);
  }

  containsRecursive(current, item) {
    if (!current) {
      return false;
    }
    if (this.comparator(item, current.item) === 0) {
      return true;
    } else if (this.comparator(item, current.item) < 0) {
      return this.containsRecursive(current.left, item);
    } else {
      return this.containsRecursive(current.right, item);
    }
  }

  size() {
    return this.height;
  }

  print() {
    this.printRecursive(this.root, 0);
  }

  printRecursive(node, depth) {
    if (node) {
      // Print the right subtree first (reverse in-order traversal)
      this.printRecursive(node.right, depth + 1);

      // Print the current node's item with indentation
      console.log(" ".repeat(4 * depth) + node.data);

      // Print the left subtree
      this.printRecursive(node.left, depth + 1);
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

// Example usage:
const comparator = (a, b) => a - b;
const tree = new BinaryTree(comparator);
tree.add(5);
tree.add(3);
tree.add(1);
tree.add(7);
tree.add(10);
tree.add(30);
tree.add(4);
tree.add(2);
tree.add(1000);
tree.add(3.4);
tree.add(41000);
console.log(tree.contains(3)); // Output: true
console.log(tree.contains(10)); // Output: false

tree.print();
console.log('SIZE:', tree.size());