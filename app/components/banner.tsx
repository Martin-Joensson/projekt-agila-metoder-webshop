export default function Banner(){
    return(
        <section className="flex justify-between py-4">
            <div>
                <h2 className="text-xl font-bold">Inventory Management</h2>
                <p>Manage and track your global product catalogue across all categories</p>
            </div>
            <button>
                <div className="px-4 border-2 border-amber-100 ">
                    <span className="material-symbols align-middle">add</span>
                    Test
                </div>
            </button>
        </section>
    );
}