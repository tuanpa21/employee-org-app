import { prepareData } from "./initial-data";
import { Employee } from "./Employee";
import { IEmployeeOrgApp } from "./interfaces";
import { find } from "../utils";
import { printData } from "../utils";

type Action = {
  employeeId: number;
  from: number;
  to: number;
  oldSubordinates: Employee[];
};

export class EmployeeOrgApp implements IEmployeeOrgApp {
  public ceo: Employee;
  public employees: Employee[];

  private undoStack: Action[] = [];
  private redoStack: Action[] = [];

  public move(employeeId: number, supervisorId: number): void {
    const action = this.handleMove(employeeId, supervisorId);

    if (action !== undefined) {
      this.undoStack.push(action);
      this.redoStack.splice(0); // If add new move, clear all redo stack

      printData(this.employees[0]);
    }
  }

  public undo(): void {
    const action = this.undoStack.pop();

    if (action === undefined) {
      return;
    }

    this.handleUndo(action);
    this.redoStack.push(action);

    printData(this.employees[0]);
  }

  public redo(): void {
    const action = this.redoStack.pop();

    if (action === undefined) {
      return;
    }

    this.handleMove(action.employeeId, action.to);
    this.undoStack.push(action);

    printData(this.employees[0]);
  }

  private handleMove(employeeId: number, supervisorId: number): Action | undefined {
    if (employeeId === 1) {
      // If moving CEO, return undefined action
      return undefined;
    }

    const findSupervisorResult = find(this.employees[0], supervisorId);
    const findEmployeeResult = find(this.employees[0], employeeId);

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

  private handleUndo(action: Action): void {
    const findOldSupervisorResult = find(this.employees[0], action.from);
    const findEmployeeResult = find(this.employees[0], action.employeeId);

    if (findEmployeeResult === undefined || findOldSupervisorResult === undefined) {
      return undefined;
    }

    const employee = findEmployeeResult.node;
    const recentSupervisor = findEmployeeResult.parent;
    const oldSupervisor = findOldSupervisorResult.node;

    recentSupervisor.removeChild(employee);
    oldSupervisor.undoRemoveChild(employee, action.oldSubordinates);
  }

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.employees = prepareData(ceo);
    printData(this.employees[0]);
  }
}
