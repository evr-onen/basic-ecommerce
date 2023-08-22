"use client";
import React from "react";
import { useProductStore } from "@/store";

const Page = () => {
	const AllProducts = useProductStore((state) => state.products);
	const productAdd = useProductStore((state) => state.add);

	return (
		<div className="shadow h-full w-full p-8 bg-white">
			<div className="">{JSON.stringify(AllProducts)}</div>
			<div className=""></div>
		</div>
	);
};

export default Page;
