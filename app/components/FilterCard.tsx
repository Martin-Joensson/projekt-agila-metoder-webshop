type FilterCardProps = {
  category: string;
  value: number;
};

export const FilterCard = ({
  category = "products",
  value = 0,
}: FilterCardProps) => {
  const categoryConfig = {
    products: {
      label: "products",
      icon: "inventory_2",
      color: "text-indigo-500",
    },
    instock: {
      label: "in stock",
      icon: "check_circle",
      color: "text-green-500",
    },
    lowstock: {
      label: "low stock",
      icon: "warning",
      color: "text-orange-500",
    },
    outofstock: {
      label: "out of stock",
      icon: "cancel",
      color: "text-red-500",
    },
  } as const;

  const config =
    categoryConfig[category as keyof typeof categoryConfig] ??
    categoryConfig.products;

  return (
    <div className="bg-gray-100 flex-1 flex flex-col p-4 rounded-lg">
      <p className="text-gray-500 text-xs">{config.label.toUpperCase()}</p>
      <div className={`flex justify-between items-center ${config.color}`}>
        <p className="text-2xl font-bold">{value}</p>
        <span className="material-symbols material-symbols-filled text-[30px]">{config.icon}</span>
      </div>
    </div>
  );
};
