// ** Core
import React from "react";

// ** Components
import Slider from "@/components/sections/quicklook/ProductSlider";
import Summary from "@/components/sections/quicklook/summary";

// ** Type
import { ProductType } from "@/store/productStore";

const QuickLook = ({ product, closeHandler }: { product: ProductType; closeHandler: () => void }) => {
	return (
		<div className="">
			<div className="flex flex-wrap  ">
				<Slider product={product} />
				<Summary product={product} closeHandler={closeHandler} />
			</div>
		</div>
	);
};

export default QuickLook;
