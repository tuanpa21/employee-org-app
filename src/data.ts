import { Employee } from "./interfaces";
import { Node } from "./tree";

export const prepareData = (ceo: Employee) => {
  const employees: Employee[] = [
    { uniqueId: 2, name: "Sarah Donald", subordinates: [] },
    { uniqueId: 3, name: "Cassandra Reynolds", subordinates: [] },
    { uniqueId: 4, name: "Mary Blue", subordinates: [] },
    { uniqueId: 5, name: "Bob Saget", subordinates: [] },
    { uniqueId: 6, name: "Tina Teff", subordinates: [] },
    { uniqueId: 7, name: "Will Turner", subordinates: [] },
    { uniqueId: 8, name: "Tyler Simpson", subordinates: [] },
    { uniqueId: 9, name: "Harry Tobs", subordinates: [] },
    { uniqueId: 10, name: "Thomas Brown", subordinates: [] },
    { uniqueId: 11, name: "George Carrey", subordinates: [] },
    { uniqueId: 12, name: "Gary Styles", subordinates: [] },
    { uniqueId: 13, name: "Bruce Willis", subordinates: [] },
    { uniqueId: 14, name: "Georgina Flangy", subordinates: [] },
    { uniqueId: 15, name: "Sophie Turner", subordinates: [] },
  ];

  const root = new Node(ceo.uniqueId, ceo);
  const nodes = employees.map((value) => new Node(value.uniqueId, value));

  nodes.unshift(root);
  nodes.unshift(root);

  nodes[1].addChild(nodes[2]);
  nodes[1].addChild(nodes[8]);
  nodes[1].addChild(nodes[13]);
  nodes[1].addChild(nodes[14]);

  nodes[2].addChild(nodes[3]);

  nodes[3].addChild(nodes[4]);
  nodes[3].addChild(nodes[5]);

  nodes[5].addChild(nodes[6]);

  nodes[6].addChild(nodes[7]);

  nodes[8].addChild(nodes[9]);
  nodes[8].addChild(nodes[11]);
  nodes[8].addChild(nodes[12]);

  nodes[9].addChild(nodes[10]);

  nodes[14].addChild(nodes[15]);

  nodes.shift();

  return nodes;
};
