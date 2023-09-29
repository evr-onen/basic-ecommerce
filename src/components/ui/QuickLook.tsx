// ** Core
import React from "react";

// ** Components
import Slider from "@/components/sections/quicklook/ProductSlider";
import Summary from "@/components/sections/quicklook/summary";

// ** Type
import { ProductType } from "@/store/productStore";
const QuickLook = ({ product }: { product: ProductType }) => {
	return (
		<div className="">
			<div className="flex flex-wrap  ">
				<Slider product={product} />
				<Summary product={product} />
			</div>
		</div>
	);
};

export default QuickLook;
