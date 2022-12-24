import { NodeType } from "../types";

export const Node = ({ node, level }: NodeType) => {
  const tab = "    ";

  return <pre key={node.uniqueId}>{`${tab.repeat(level)} ${node.name}(${node.uniqueId})`}</pre>;
};
