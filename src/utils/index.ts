import { Employee } from "../data/Employee";

export function LevelOrderTraversal(
  root: Employee,
  handleCurrentNode: (node: Employee) => any,
  handleEndLevel?: () => any
) {
  if (root === null || root === undefined) {
    return;
  }

  const queue: Employee[] = [root];

  while (queue.length !== 0) {
    let len = queue.length;

    while (len > 0) {
      // Node has children
      const currNode = queue.shift();

      if (currNode) {
        handleCurrentNode(currNode); // Call external function

        for (let childNode of currNode.subordinates) {
          queue.push(childNode);
        }
      }

      len--; //Move to next node
    }

    handleEndLevel && handleEndLevel();
  }
}

type FindResult = {
  node: Employee;
  parent: Employee;
};

export function find(root: Employee, key: number): FindResult | undefined {
  if (root === null || root === undefined) {
    return undefined;
  }

  if (root.uniqueId === key) return { node: root, parent: root };

  const queue: Employee[] = [root];

  while (queue.length !== 0) {
    let len = queue.length;

    while (len > 0) {
      // Node has children
      const currNode = queue.shift();

      if (currNode) {
        for (let childNode of currNode.subordinates) {
          if (childNode.uniqueId === key) {
            return {
              node: childNode,
              parent: currNode
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
