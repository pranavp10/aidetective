"use client";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/search?${params.toString()}`);
  }, 300);

  return (
    <div className="pt-16 pb-10">
      <h1 className="text-2xl font-semibold text-center">
        Find the perfect AI tool for every task
      </h1>
      <h2 className="text-center pb-10 text-gray-500">
        Boost efficiency using over 2000+ expanding AI tools
      </h2>
      <div className="border rounded-full p-2 flex items-center max-w-4xl h-16 m-auto">
        <Search className="text-gray-500 mx-2" />
        <input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className="text-2xl  outline-none w-full "
          placeholder="I want AI tool for ...."
        />
      </div>
    </div>
  );
};

export default SearchInput;
