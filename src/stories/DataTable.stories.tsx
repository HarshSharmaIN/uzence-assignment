import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const data: User[] = [
  { id: 1, name: "Alice", age: 22 },
  { id: 2, name: "Bob", age: 27 },
  { id: 3, name: "Charlie", age: 35 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
