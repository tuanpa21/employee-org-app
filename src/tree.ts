import { Employee } from "./interfaces";

interface INode {
  key: number;
  data: Employee;
  children: INode[];
  addChild: (node: INode) => void;
  removeChild: (node: INode) => void;
}

export class Node implements INode {
  key: number;
  data: Employee;
  children: Node[];

  public addChild(node: Node): void {
    this.children.push(node);
    this.data.subordinates.push(node.data);
  }

  public removeChild(node: Node): void {
    const nodeIndex = this.children.findIndex(
      (value) => value.key === node.key
    );
    const dataIndex = this.data.subordinates.findIndex(
      (value) => value.uniqueId === node.data.uniqueId
    );

    if (nodeIndex < 0 || dataIndex < 0) {
      return;
    }

    // Remove node from parent
    this.children.splice(nodeIndex, 1);
    this.data.subordinates.splice(dataIndex, 1);

    // Move node'children to old parent
    this.children.push(...node.children);
    this.data.subordinates.push(...node.data.subordinates);

    // Clear node'children
    node.children.splice(0);
    node.data.subordinates.splice(0);
  }

  constructor(key: number, data: Employee) {
    this.key = key;
    this.children = [];
    this.data = data;
  }
}

export function LevelOrderTraversal(
  root: Node,
  handleCurrentNode: (node: Node) => any,
  handleEndLevel?: () => any
) {
  if (root === null || root === undefined) {
    return;
  }

  const queue: Node[] = [root];

  while (queue.length !== 0) {
    let len = queue.length;

    while (len > 0) {
      // Node has children
      const currNode = queue.shift();

      if (currNode) {
        handleCurrentNode(currNode); // Call external function

        for (let childNode of currNode.children) {
          queue.push(childNode);
        }
      }

      len--; //Move to next node
    }

    handleEndLevel && handleEndLevel();
  }
}

type FindResult = {
  node: Node;
  parent: Node;
};

export function find(root: Node, key: number): FindResult | undefined {
  if (root === null || root === undefined) {
    return undefined;
  }

  if (root.key === key) return { node: root, parent: root };

  const queue: Node[] = [root];

  while (queue.length !== 0) {
    let len = queue.length;

    while (len > 0) {
      // Node has children
      const currNode = queue.shift();

      if (currNode) {
        for (let childNode of currNode.children) {
          if (childNode.key === key) {
            return {
              node: childNode,
              parent: currNode,
            };
          }

          queue.push(childNode);
        }
      }

      len--; //Move to next node
    }
  }

  return undefined;
}
