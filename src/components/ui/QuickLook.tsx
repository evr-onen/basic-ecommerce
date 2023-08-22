import React from "react";
import Slider from "@/components/sections/quicklook/ProductSlider";
import Summary from "@/components/sections/quicklook/summary";
import { ProductType } from "@/store/productStore";
const QuickLook = ({ product }: { product: ProductType }) => {
	return (
		<div className=" ">
			<div className="flex ">
				<Slider product={product} />
				<Summary product={product} />
			</div>
		</div>
	);
};

export default QuickLook;
