"use client";

// ** Components
import MainPageSlider from "@/components/pages/home/MainPageSlider";
import FilterArea from "@/components/pages/home/FilterArea";

// ** Store
import { useProductStore } from "@/store";

export default function Home() {
	const products = useProductStore((state) => state.products);

	return (
		<div id="homePage" className="page min-h-[90vh] max-w-[1240px] w-full mx-8 mt-[10vh] ">
			<div className="bg-[#f3f3f3] h-[585px] w-full">
				<MainPageSlider />
			</div>
			<div className="min-h-[540px] w-full mt-[100px]">
				<FilterArea products={products} />
			</div>
		</div>
	);
}
