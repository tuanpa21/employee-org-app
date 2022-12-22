export interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

export interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeId: number, supervisorId: number): void;
  undo(): void;
  redo(): void;
}
