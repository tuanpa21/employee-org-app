import { useMemo, useState } from "react";
import { Employee } from "./data/Employee";
import { EmployeeOrgApp } from "./data";

function App() {
  const ceo = useMemo(() => new Employee(1, "Mark Zuckerberg"), []);
  const app = useMemo(() => new EmployeeOrgApp(ceo), []);

  const [employeeId, setEmployeeId] = useState(0);
  const [supervisorId, setSupervisorId] = useState(0);

  const handleEmployeeIdChange = (e: any) => {
    setEmployeeId(parseInt(e.target.value));
  };

  const handleSupervisorIdChange = (e: any) => {
    setSupervisorId(parseInt(e.target.value));
  };

  return (
    <>
      <h1>Employee Organization App</h1>
      <br />
      <button
        onClick={() => {
          app.printData();
        }}
      >
        Print Data
      </button>
      <button
        onClick={() => {
          app.undo();
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          app.redo();
        }}
      >
        Redo
      </button>
      <br />
      <br />
      <span>Employee ID</span>
      <br />
      <input
        type="number"
        id="employeeId"
        name="employeeId"
        placeholder="employeeId"
        onChange={handleEmployeeIdChange}
        value={employeeId}
      />
      <br />
      <br />
      <span>Supervisor ID</span>
      <br />
      <input
        type="number"
        id="supervisorId"
        name="supervisorId"
        placeholder="supervisorId"
        onChange={handleSupervisorIdChange}
        value={supervisorId}
      />
      <button
        onClick={() => {
          app.move(employeeId, supervisorId);
        }}
      >
        Move
      </button>
    </>
  );
}

export default App;
