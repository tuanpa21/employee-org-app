export interface IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
  addChild: (child: IEmployee) => any;
  removeChild: (child: IEmployee) => IEmployee[] | undefined;
  undoRemoveChild: (child: IEmployee, oldSubordinates: IEmployee[]) => any;
}

export interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeId: number, supervisorId: number): void;
  undo(): void;
  redo(): void;
}
