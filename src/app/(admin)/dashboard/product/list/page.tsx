"use client";
import React from "react";
import ProductList from "@/components/pages/dashboard/product/productList";
import { useProductStore } from "@/store";
const Page = () => {
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
