# Employee Organization App

## Installation and Run

```shell
npm install
npm run dev
```

- After execute above commands, webapp run at `localhost:5173`.
- You can test the UI, or open developer tool (`F12` or `Right-click` > `Inspect`) to watch result in Console tab.
- `Employee ID` is used to define employee you want to move and `Supervisor ID` is used to defined his/her new supervisor.

## Code Details

### Structure

- Classes, interfaces, initial data included in `data` folder
- Helper functions included in `utils` folder
- Main App component of webapp is in `src/App.tsx`
- Main logic app is in `src/data/EmployeeOrgApp.ts`

### Interfaces

```typescript
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
```

### Employee class

To remove a child(subordinate), there are 3 steps (E.g remove A from B)

1. Remove A from B's children
2. Move all A's children to B's
3. Remove all children of A

Because A's children are moved to B, function returns old subordinates for undoing later.

```typescript
this.subordinates.splice(index, 1);
this.subordinates.push(...child.subordinates);
const oldSubordinates = child.subordinates.splice(0);

return oldSubordinates;
```

In the other hand, there are also 3 steps to undo "remove a child" (E.g put A back to B)

1. Add old subordinates to A
2. Remove above subordinates from B's
3. Add A to B's subordinates

```typescript
child.subordinates.push(...oldSubordinates);
this.subordinates = this.subordinates.filter((value) => oldSubordinates.indexOf(value) < 0);
this.subordinates.push(child);
```

### EmployeeOrgApp class

To handle action history, we use 2 stacks (`undoStack` and `redoStack`).

```typescript
type Action = {
  employeeId: number;
  from: number;
  to: number;
  oldSubordinates: Employee[];
};
...
private undoStack: Action[] = [];
private redoStack: Action[] = [];
```

3 operations(`move`, `undo` and `redo`) control those stacks.

- After a `move`, push new action in to `undoStack`
- After an `undo`, pop top of `undoStack` and push that action into `redoStack`
- After a `redo`, pop top of `redoStack` and push that action into `undoStack`

To handle a move, there are 4 steps (E.g A move from B to C)

1. Find the employee A, old and new supervisors B, C
2. Remove A from B
3. Add A to C
4. Return a new `Action` to handle history

```typescript
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
```

To handle an undo, there are 3 steps (E.g still A, B, C from above example)

1. Find the employee A, old and recent supervisors B, C
2. Remove A from C
3. Undo remove A from B

```typescript
const employee = findEmployeeResult.node;
const recentSupervisor = findEmployeeResult.parent;
const oldSupervisor = findOldSupervisorResult.node;

recentSupervisor.removeChild(employee);
oldSupervisor.undoRemoveChild(employee, action.oldSubordinates);
```
