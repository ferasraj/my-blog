import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";
import { twMerge } from "tailwind-merge";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
      // setSearchParams({
      //   sort: e.target.value,
      // });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      // setSearchParams({ cat: category });
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer w-fit hover:text-gray-800">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className={twMerge(
              "appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm ",
              "bg-white checked:bg-blue-800 "
            )}
          />
          <span>Newest</span>
        </label>
        <label
          htmlFor="popular"
          className="flex items-center gap-2 cursor-pointer w-fit hover:text-gray-800"
        >
          <input
            id="popular"
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className={twMerge(
              "appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm ",
              "bg-white checked:bg-blue-800"
            )}
          />
          Most Popular
        </label>
        <label
          htmlFor="trending"
          className="flex items-center gap-2 cursor-pointer w-fit hover:text-gray-800"
        >
          <input
            id="trending"
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className={twMerge(
              "appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm ",
              "bg-white checked:bg-blue-800"
            )}
          />
          Trending
        </label>
        <label
          htmlFor="oldest"
          className="flex items-center gap-2 cursor-pointer w-fit hover:text-gray-800"
        >
          <input
            id="oldest"
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className={twMerge(
              "appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm ",
              "bg-white checked:bg-blue-800"
            )}
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("")}
        >
          All
        </span>
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </span>
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </span>
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("databases")}
        >
          Databases
        </span>
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("seo")}
        >
          Search Engines
        </span>
        <span
          className="underline cursor-pointer w-fit hover:text-gray-800"
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
