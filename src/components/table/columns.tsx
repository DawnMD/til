import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { type TilType } from "~/db/schema";
import { type RouterOutputs } from "~/utils/api";

type TilsType = Extract<RouterOutputs["til"]["getMyTils"], TilType[]>[number];

export const columns: ColumnDef<TilsType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <p className="line-clamp-1 lg:line-clamp-2">{row.getValue("content")}</p>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <p className="whitespace-nowrap">
        {dayjs(row.getValue("created_at")).format("MMM DD, YYYY")}
      </p>
    ),
  },
];
