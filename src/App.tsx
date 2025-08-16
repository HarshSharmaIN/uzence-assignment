import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable, type Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const initialData: User[] = [
  { id: 1, name: "Alice", age: 22 },
  { id: 2, name: "Bob", age: 27 },
  { id: 3, name: "Charlie", age: 35 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<User[]>([]);
  const [data, setData] = useState<User[]>(initialData);
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Component Demo</h1>

      {/* InputField Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">InputField</h2>
        <InputField
          label="Your Name"
          placeholder="Enter name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This is a helper text"
          clearable
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          type="password"
          passwordToggle
        />
      </div>

      {/* DataTable Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">DataTable</h2>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => setLoading((prev) => !prev)}
          >
            Toggle Loading
          </button>
          <button
            className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600"
            onClick={() => setData([])}
          >
            Show Empty
          </button>
          <button
            className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
            onClick={() => setData(initialData)}
          >
            Reset Data
          </button>
        </div>

        {/* DataTable */}
        <DataTable<User>
          data={data}
          columns={columns}
          selectable
          loading={loading}
          onRowSelect={setSelected}
        />

        {selected.length > 0 && (
          <p className="text-sm text-gray-600">
            Selected: {selected.map((u) => u.name).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
