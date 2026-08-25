"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { updateFilter } from "../utils/updateFilter";

type FilterCardProps = {
  category: "products" | "instock" | "lowstock" | "outofstock";
  value: number;
};

export const FilterCard = ({
  category = "products",
  value = 0,
}: FilterCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const filterValues = {
    products: "",
    instock: "instock",
    lowstock: "lowstock",
    outofstock: "outofstock",
  } as const;

  const config = categoryConfig[category];

  function handleClick() {
    const params = updateFilter(searchParams, "stock", filterValues[category]);
    params.delete("page");

    router.replace(`/?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white flex-1 flex flex-col gap-3 p-4 rounded-lg border hover:border-cyan-400 hover:bg-neutral-50 duration-200 border-gray-300 text-left"
    >
      <p className="text-gray-500 text-sm font-bold">
        {config.label.toUpperCase()}
      </p>

      <div
        className={`flex justify-between items-center text-4xl ${config.color}`}
      >
        <p className="font-black">{value}</p>
        <span className="material-symbols material-symbols-filled">
          {config.icon}
        </span>
      </div>
    </button>
  );
};
