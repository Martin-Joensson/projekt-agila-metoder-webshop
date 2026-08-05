export const SearchBar = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg p-4 my-8 gap-4">
      <input
        placeholder="Search Products..."
        className="flex-2 p-2 border border-gray-300  rounded-md"
      ></input>

      <div className="flex flex-1 gap-4">
        {/* Filter on category */}
        <select className="flex-1 p-2 border border-gray-300 rounded-md">
          <option>All categories</option>
        </select>

        {/* Filter on stock */}
        <select className="flex-1 p-2 border border-gray-300  rounded-md">
          <option>All Stock</option>
        </select>

        <button className="flex items-center gap-1 p-2 border border-gray-300  rounded-md hover:bg-gray-200 active:bg-gray-300 active:translate-y-px">
          <span className="material-symbols material-symbols-filled ">
            Filter_alt
          </span>
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};
