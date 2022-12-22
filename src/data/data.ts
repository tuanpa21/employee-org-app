import { Employee } from "./Employee";

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
    new Employee(15, "Sophie Turner")
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
