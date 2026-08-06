export const SearchBar = () => {
  return (
    <form className="flex items-center flex-col sm:flex-row bg-gray-100 rounded-lg p-5 my-8 gap-4">
      <label htmlFor="search-product" className="sr-only">
        Search for product:
      </label>
      <input
        id="search-product"
        placeholder="Search products..."
        className="flex-2 px-3 py-2 border border-gray-300  rounded-md"
      />

      <div className="flex flex-1 gap-4">
        {/* Filter on category */}
        <label htmlFor="category-filter" className="sr-only">
          Filter by category:
        </label>
        <select
          id="category-filter"
          className="flex-1 p-2 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 rounded-md"
        >
          <option>All categories</option>
        </select>

        {/* Filter on stock */}
        <label htmlFor="stock-filter" className="sr-only">
          Filter by stock-availability:
        </label>
        <select
          id="stock-filter"
          className="flex-1 p-2 border border-gray-300  hover:bg-gray-200 active:bg-gray-300 rounded-md"
        >
          <option>All Stock</option>
        </select>

        <button
          type="submit"
          className="flex items-center gap-1 p-2 border border-gray-300  rounded-md hover:bg-gray-200 active:bg-gray-300 active:translate-y-px"
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
