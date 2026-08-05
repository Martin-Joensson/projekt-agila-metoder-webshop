export default function Banner(){
    return(
        <div className=" bg-white border-b border-gray-400">
            <div className="max-w-7xl w-full mx-auto flex justify-between py-4">
                <div className="">
                    <h2 className="text-xl font-bold text-black">Inventory Management</h2>
                    <p className="text-gray-400">Manage and track your global product catalogue across all categories</p>
                </div>
                <button className="bg-purple-600 rounded-xl">
                    <div className="px-4 flex items-center gap-2 text-white">
                        <span className="material-symbols text-xl font-bold">add</span>
                        <p className="">Add Product</p>
                    </div>
                </button>
            </div>
        </div>
    );
}