export const SearchBar = () => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-4 my-8 gap-4">
      <input
        placeholder="Search Products..."
        className="flex-1 p-2 border rounded-md"
      ></input>

      <div className="flex gap-4">
        {/* Filter on category */}
        <select className="p-2 border rounded-md">
          <option>All categories</option>
        </select>

        {/* Filter on stock */}
        <select className="p-2 border rounded-md">
          <option>All Stock</option>
        </select>

        <button className="p-2 border rounded-md hover:bg-gray-200 active:bg-gray-300 active:translate-y-px">
          <span className="material-symbols material-symbols-filled ">
            Filter_alt
          </span>
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};
