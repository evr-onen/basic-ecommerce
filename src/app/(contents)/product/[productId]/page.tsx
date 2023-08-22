"use client";
// ** Core
import React, { useEffect } from "react";

// ** Stores
import { useProductStore } from "@/store";

// ** Components
import Summary from "@/components/pages/home/product/singleProduct/summary";
import Slider from "@/components/pages/home/product/singleProduct/ProductSlider";

const Page = ({ params }: { params: { productId: string } }) => {
	const { productId } = params;

	// ** Hooks
	const product = useProductStore((state) => state.products)?.find((product) => product.id === Number(productId))!;

	return (
		<div className=" pt-[10vh] max-w-[1240px] w-full">
			<div className="flex mt-24 flex-wrap justify-center ">
				<Slider product={product} />
				<Summary product={product} />
			</div>
		</div>
	);
};

export default Page;
