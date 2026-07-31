import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const UserTable = ({ users,onChat  }) => {
  const columns = [
    {
      header: "Status",
      accessorKey: "online",
      cell: ({ row }) => (row.original.online ? "🟢 Online" : "🔴 Offline"),
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Action",
      cell:  ({ row }) => (
        <button onClick={() => onChat(row.original._id)} className="bg-blue-500 text-white px-3 py-1 rounded">
          Chat
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full border border-gray-300 mt-5">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border px-4 py-2 text-left"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="border px-4 py-2"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;