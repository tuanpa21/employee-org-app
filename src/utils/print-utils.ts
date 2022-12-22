import { Employee } from "../data";
import { levelOrderTraversal } from "./tree-utils";

export const printData = (root: Employee): void => {
  console.clear();
  levelOrderTraversal(root, handleCurrentNode, handleEndLevel);
};

const handleCurrentNode = (node: Employee) => {
  console.log(
    `${node.uniqueId} | ${node.name} | Subordinates: ${node.subordinates
      .map((value) => `${value.name}(${value.uniqueId})`)
      .join(", ")}`
  );
};

const handleEndLevel = () => {
  console.log("--------------------------------------------------------------");
};
