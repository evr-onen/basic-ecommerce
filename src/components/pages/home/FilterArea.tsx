"use client";

import Modal from "@/components/ui/Modal";
import QuickLook from "@/components/ui/QuickLook";
import { ProductType } from "@/store/productStore";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store";

let usedCategories: string[] = [];
const FilterArea = ({ products }: { products: ProductType[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [productItem, setProductItem] = useState<ProductType | null>(null);
	const wishListState = useWishlistStore((state) => state.list);
	const [filterByCat, setFilterByCat] = useState<string>("");
	const [filterCats, setfilterCats] = useState<string[]>([]);
	const { push } = useRouter();

	const clickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, productId: number) => {
		const target = e.target as HTMLElement;

		if (target.classList[0]) {
			let productForLook = products.find((product) => product.id === productId);
			setProductItem(productForLook!);
			setIsOpen(true);
		} else {
			push(`product/${productId}`);
		}
	};
	useEffect(() => {
		setfilterCats(usedCategories);
	}, [usedCategories.length]);

	const renderProductItems = () => {
		usedCategories = [];
		return products.map((productItem) => {
			if (usedCategories.indexOf(productItem.category.label) === -1) usedCategories.push(productItem.category.label);
			if (productItem.category.label === filterByCat || filterByCat === "") {
				return (
					<div key={productItem.id} className="itemWrapper h-[440px]  flex flex-col items-center mb-8">
						<div
							className="imageWrapper group w-auto h-full relative flex overflow-hidden"
							onClick={(e) => clickHandler(e, productItem.id)}
						>
							<Image
								src={productItem.images[0]}
								className={``}
								alt={productItem.images[0]}
								width={0}
								height={0}
								sizes="100%"
								loading="eager"
								style={{
									width: "auto",
									height: "100%",
									margin: "auto",
								}}
							/>
							<div className="absolute -bottom-10 ease-linear   duration-300 left-1/2 -translate-x-1/2 opacity-0 invisible  ">
								<div className="flex">
									<div className="quickLook px-3 py-1 flex bg-black text-bodyPrimary ">
										<p className="quickLook capitalize  m-auto text-xs cursor-pointer">quicklook</p>
									</div>
									<div className="quickLike  bg-black/60 flex p-2">
										{wishListState.indexOf(productItem.id) !== -1 ? (
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
													fill="#1C274C"
												/>
											</svg>
										) : (
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
													fill="#fff"
												/>
											</svg>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="des flex flex-col items-center mt-4">
							<Link href={`product/${productItem.id}`} className="title text-lg">
								{productItem.name}
							</Link>
							<div className="price  flex  relative overflow-hidden mt-2">
								<p className="relative -left-full duration-700 text-center m-auto opacity-0 invisible text-xs font-bold text-black/50 uppercase">
									Add to Cart
								</p>

								<span className="relative  duration-700 flex -left-1/2 translate-x-1/2  font-bold opacity-100 visible text-xs text-black/50">
									<p className="mr-3">{productItem.price}</p>TL
								</span>
							</div>
						</div>
					</div>
				);
			}
		});
	};
	const renderFilterTitle = () => {
		if (filterCats.length > 0) {
			return usedCategories.map((cat, index) => {
				return (
					<li
						key={index}
						className={`${filterByCat === cat ? "currentItem" : null}`}
						onClick={() => setFilterByCat(cat)}
					>
						{cat}
					</li>
				);
			});
		} else {
		}
	};
	return (
		<>
			<div className="filterArea">
				<div className="top flex justify-between">
					<div className="left">
						<ul className="flex ">
							<li className={`${filterByCat === "" ? "currentItem" : null}`} onClick={() => setFilterByCat("")}>
								All
							</li>
							{renderFilterTitle()}
						</ul>
					</div>
					{/* <div className="right">
						<ul>
							<li className="flex items-center">
								<p className="mr-1">FILTER</p>
								<svg
									className="w-4"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z"
										fill="#1C274C"
									/>
								</svg>
							</li>
						</ul>
					</div> */}
				</div>
				<div className="bottom grid  grid-cols-1 lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2  gap-2">
					{renderProductItems()}
				</div>
			</div>
			<Modal size="lg" isOpen={isOpen} onChange={(e) => setIsOpen(e)}>
				<QuickLook product={productItem!} />
			</Modal>
		</>
	);
};

export default FilterArea;
