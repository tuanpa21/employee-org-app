import { Employee } from "../../data";
import { Node } from "../node";
import { NodeType } from "../types";

export const Tree = ({ root }: { root: Employee }) => {
  const employees = () => {
    const stack: NodeType[] = [{ node: root, level: 0 }];
    const printSequence: NodeType[] = [];

    while (stack.length > 0) {
      const currNode = stack.pop();

      if (!currNode) continue;

      printSequence.push(currNode);
      stack.push(
        ...currNode.node.subordinates.map((node) => ({
          node: node,
          level: currNode.level + 1
        }))
      );
    }
    return printSequence;
  };

  return (
    <div>
      {employees().map((value) => (
        <Node node={value.node} level={value.level} />
      ))}
    </div>
  );
};
