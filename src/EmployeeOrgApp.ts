import { prepareData } from "./data";
import { Employee, IEmployeeOrgApp } from "./interfaces";
import { find, LevelOrderTraversal, Node } from "./tree";

type Action = {
  employeeId: number;
  from: number;
  to: number;
};

export class EmployeeOrgApp implements IEmployeeOrgApp {
  public ceo: Employee;
  public nodes: Node[];
  private actionStack: Action[] = [];
  private poppedStack: Action[] = [];

  public move(employeeId: number, supervisorId: number): void {
    const action = this.moveData(employeeId, supervisorId);

    if (action !== undefined) {
      this.actionStack.push(action);
      this.poppedStack.splice(0); // If add new move, clear all popped stack

      this.printData();
    }
  }

  public undo(): void {
    const action = this.actionStack.pop();

    if (action === undefined) {
      return;
    }

    this.moveData(action.employeeId, action.from);
    this.poppedStack.push(action);

    this.printData();
  }

  public redo(): void {
    const action = this.poppedStack.pop();

    if (action === undefined) {
      return;
    }

    this.moveData(action.employeeId, action.to);
    this.actionStack.push(action);

    this.printData();
  }

  public printData(): void {
    console.clear();
    LevelOrderTraversal(
      this.nodes[0],
      this.handleCurrentNode,
      this.handleEndLevel
    );
  }

  private moveData(
    employeeId: number,
    supervisorId: number
  ): Action | undefined {
    if (employeeId === 1) {
      return undefined;
    }

    const findSupervisorResult = find(this.nodes[0], supervisorId);
    const findEmployeeResult = find(this.nodes[0], employeeId);

    if (
      findEmployeeResult === undefined ||
      findSupervisorResult === undefined
    ) {
      return undefined;
    }

    const employee = findEmployeeResult.node;
    const oldSupervisor = findEmployeeResult.parent;
    const newSupervisor = findSupervisorResult.node;

    oldSupervisor.removeChild(employee);
    newSupervisor.addChild(employee);

    return {
      employeeId: employee.key,
      from: oldSupervisor.key,
      to: newSupervisor.key,
    };
  }

  private handleCurrentNode = (node: Node) => {
    const data = node.data;
    console.log(
      `${data.uniqueId} | ${data.name} | Subordinates: ${data.subordinates
        .map((value) => value.name)
        .join(", ")}`
    );
  };

  private handleEndLevel = () => {
    console.log(
      "--------------------------------------------------------------"
    );
  };

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.nodes = prepareData(ceo);
    this.printData();
  }
}
