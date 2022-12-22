import { prepareData } from "./data";
import { Employee } from "./Employee";
import { IEmployeeOrgApp } from "../types";
import { LevelOrderTraversal, find } from "../utils";

type Action = {
  employeeId: number;
  from: number;
  to: number;
  oldSubordinates: Employee[];
};

export class EmployeeOrgApp implements IEmployeeOrgApp {
  public ceo: Employee;
  public nodes: Employee[];
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

    this.undoMoveData(action);
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
    LevelOrderTraversal(this.nodes[0], this.handleCurrentNode, this.handleEndLevel);
  }

  private moveData(employeeId: number, supervisorId: number): Action | undefined {
    if (employeeId === 1) {
      return undefined;
    }

    const findSupervisorResult = find(this.nodes[0], supervisorId);
    const findEmployeeResult = find(this.nodes[0], employeeId);

    if (findEmployeeResult === undefined || findSupervisorResult === undefined) {
      return undefined;
    }

    const employee = findEmployeeResult.node;
    const oldSupervisor = findEmployeeResult.parent;
    const newSupervisor = findSupervisorResult.node;

    const oldSubordinates = oldSupervisor.removeChild(employee);
    newSupervisor.addChild(employee);

    return {
      employeeId: employee.uniqueId,
      from: oldSupervisor.uniqueId,
      to: newSupervisor.uniqueId,
      oldSubordinates: oldSubordinates ?? new Array<Employee>()
    };
  }

  private undoMoveData(action: Action): void {
    const findOldSupervisorResult = find(this.nodes[0], action.from);
    const findEmployeeResult = find(this.nodes[0], action.employeeId);

    if (findEmployeeResult === undefined || findOldSupervisorResult === undefined) {
      return undefined;
    }

    const employee = findEmployeeResult.node;
    const recentSupervisor = findEmployeeResult.parent;
    const oldSupervisor = findOldSupervisorResult.node;

    recentSupervisor.removeChild(employee);
    oldSupervisor.undoRemoveChild(employee, action.oldSubordinates);
  }

  private handleCurrentNode = (node: Employee) => {
    console.log(
      `${node.uniqueId} | ${node.name} | Subordinates: ${node.subordinates
        .map((value) => `${value.name}(${value.uniqueId})`)
        .join(", ")}`
    );
  };

  private handleEndLevel = () => {
    console.log("--------------------------------------------------------------");
  };

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.nodes = prepareData(ceo);
    this.printData();
  }
}
