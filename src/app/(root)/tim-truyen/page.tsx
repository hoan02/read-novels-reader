import SelectSearch from "@/components/search/SelectSearch";
import TableSearch from "@/components/search/TableSearch";

const SearchPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="bg-white shadow p-4 rounded-xl space-y-4">
      <SelectSearch />
      <TableSearch searchParams={searchParams} />
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";
