"use client";
// ** Core
import React from "react";

// ** Compienents
import ProductList from "@/components/pages/dashboard/product/productList";

// ** Store
import { useProductStore } from "@/store";
const Page = () => {
	// ** Store
	const productStore = useProductStore((state) => state);

	return (
		<div className="shadow h-full w-full p-8 bg-white">
			<h2 className="font-semibold mb-8">Product List</h2>
			<div className="flex flex-wrap ">
				<ProductList products={productStore.products} />
			</div>
		</div>
	);
};

export default Page;
