"use client";
import React, { useEffect } from "react";
import Slider from "@/components/pages/home/product/singleProduct/ProductSlider";
import { useProductStore } from "@/store";
import Summary from "@/components/pages/home/product/singleProduct/summary";

const Page = ({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) => {
	const { productId } = params;
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
