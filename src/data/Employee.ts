import { IEmployee } from "../types/interfaces";

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
    this.subordinates = this.subordinates.filter((value) => oldSubordinates.indexOf(value) < 0);
    this.subordinates.push(child);
  }

  constructor(uniqueId: number, name: string) {
    this.uniqueId = uniqueId;
    this.name = name;
    this.subordinates = [];
  }
}
