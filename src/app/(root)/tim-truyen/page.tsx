import SelectSearch from "@/components/search/SelectSearch";
import TableSearch from "@/components/search/TableSearch";
import { Suspense } from "react";

const SearchBarFallback = () => {
  return <>placeholder</>;
};

const SearchPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="bg-white shadow p-4 rounded-xl space-y-4">
      <Suspense fallback={<SearchBarFallback />}>
        <SelectSearch />
        <TableSearch searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";
