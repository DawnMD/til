import { Loader2 } from "lucide-react";
import { columns } from "~/components/table/columns";
import { DataTable } from "~/components/table/table";
import { api } from "~/utils/api";

const MyTILS = () => {
  const { data, isFetching, isLoading, error } = api.til.getMyTils.useQuery();

  return (
    <div className="container flex flex-1 flex-col gap-8 py-6 lg:px-32 lg:py-8">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          My TILs
        </h1>
        <p className="text-lg text-muted-foreground">
          Unearth the Unseen: Share Your &apos;Today I Learned&apos; Journey!
        </p>
      </div>
      {!data && (isLoading || isFetching) && !error && (
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {Array.isArray(data) && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default MyTILS;
