import { IEmployee } from "./interfaces";

export class Employee implements IEmployee {
  public uniqueId: number;
  public name: string;
  public subordinates: Employee[];

  public addChild(child: Employee) {
    this.subordinates.push(child);
  }

  public removeChild(child: Employee): Employee[] | undefined {
    const index = this.subordinates.indexOf(child);

    if (index < 0) {
      return undefined;
    }

    this.subordinates.splice(index, 1);
    this.subordinates.push(...child.subordinates);
    const oldSubordinates = child.subordinates.splice(0);

    return oldSubordinates;
  }

  public undoRemoveChild(child: Employee, oldSubordinates: Employee[]) {
    child.subordinates.push(...oldSubordinates);
    this.subordinates = this.subordinates.filter(
      (value) => oldSubordinates.indexOf(value) < 0
    );
    this.subordinates.push(child);
  }

  constructor(uniqueId: number, name: string) {
    this.uniqueId = uniqueId;
    this.name = name;
    this.subordinates = [];
  }
}

export const prepareData = (ceo: Employee) => {
  const employees: Employee[] = [
    new Employee(2, "Sarah Donald"),
    new Employee(3, "Cassandra Reynolds"),
    new Employee(4, "Mary Blue"),
    new Employee(5, "Bob Saget"),
    new Employee(6, "Tina Teff"),
    new Employee(7, "Will Turner"),
    new Employee(8, "Tyler Simpson"),
    new Employee(9, "Harry Tobs"),
    new Employee(10, "Thomas Brown"),
    new Employee(11, "George Carrey"),
    new Employee(12, "Gary Styles"),
    new Employee(13, "Bruce Willis"),
    new Employee(14, "Georgina Flangy"),
    new Employee(15, "Sophie Turner"),
  ];

  console.log(employees);

  employees.unshift(ceo);
  employees.unshift(ceo);

  employees[1].addChild(employees[2]);
  employees[1].addChild(employees[8]);
  employees[1].addChild(employees[13]);
  employees[1].addChild(employees[14]);

  employees[2].addChild(employees[3]);

  employees[3].addChild(employees[4]);
  employees[3].addChild(employees[5]);

  employees[5].addChild(employees[6]);

  employees[6].addChild(employees[7]);

  employees[8].addChild(employees[9]);
  employees[8].addChild(employees[11]);
  employees[8].addChild(employees[12]);

  employees[9].addChild(employees[10]);

  employees[14].addChild(employees[15]);

  employees.shift();

  return employees;
};

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

