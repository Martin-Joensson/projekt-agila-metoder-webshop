export const SearchBar = () => {
  return (
    <form className="flex items-center flex-col sm:flex-row bg-white rounded-lg border border-gray-300 p-5 gap-4">
      <label htmlFor="search-product" className="sr-only">
        Search for product:
      </label>
      <input
        id="search-product"
        placeholder="Search products..."
        className="w-full sm:w-auto flex-1 px-3 py-2 border border-gray-300 rounded-md"
      />

      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
        {/* Filter on category */}
        <label htmlFor="category-filter" className="sr-only">
          Filter by category:
        </label>
        <select
          id="category-filter"
          className="w-full sm:w-auto p-2 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 rounded-md"
        >
          <option>All categories</option>
        </select>

        {/* Filter on stock */}
        <label htmlFor="stock-filter" className="sr-only">
          Filter by stock-availability:
        </label>
        <select
          id="stock-filter"
          className="w-full sm:w-auto p-2 border border-gray-300  hover:bg-gray-200 active:bg-gray-300 rounded-md"
        >
          <option>All Stock</option>
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto flex items-center gap-1 p-2 border border-gray-300  rounded-md hover:bg-gray-200 active:bg-gray-300 active:translate-y-px"
        >
          <span className="material-symbols material-symbols-filled ">
            Filter_alt
          </span>
          <span>Filter</span>
        </button>
      </div>
    </form>
  );
};
