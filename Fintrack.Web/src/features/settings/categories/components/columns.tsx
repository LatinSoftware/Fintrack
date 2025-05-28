import { createColumnHelper } from "@tanstack/react-table";
import type { Category } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = createColumnHelper<Category>();

export const categoryColumns = [
  columns.accessor("name", {
    header: ({column}) => (<DataTableColumnHeader column={column} title="Category" className="pl-4" />),
    cell: (info) => <div className="w-[80px] pl-4">{info.getValue()}</div>,
    enableSorting: true,
  }),
  columns.accessor("description", {
    header: ({column}) => <DataTableColumnHeader column={column} title="Description" />,
    cell: (info) => {

        return (
            <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                {info.getValue()}
            </span>
        )
    },
    enableSorting: false,
  }),
 {
    id: "actions",
    cell: ({row}: any) => <DataTableRowActions row={row} />,
 }
];