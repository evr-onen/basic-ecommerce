import React, { useEffect, useRef, useState } from "react";
import { useProductStore } from "@/store";
import { useWishlistStore } from "@/store";
import { ProductType } from "@/store/productStore";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = ({ isOpen, onChange }: { isOpen: boolean; onChange: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [value, setValue] = useState("");
	const allProducts = useProductStore((state) => state.products);
	const wishlistStore = useWishlistStore((state) => state.list);
	const [filterdProducts, setFilteredProducts] = useState<ProductType[]>(allProducts);

	const inputref = useRef<HTMLInputElement>(null);
	const router = useRouter();
	let tmpAllProducts: ProductType[] = allProducts;

	const renderProductItems = (productItem: ProductType) => {
		return (
			<div
				key={productItem.id}
				className="itemWrapper bg-white flex flex-col items-center !opacity-100 !visible  mb-8 mr-8 duration-1000 min-w-[240px] min-h-[240px] "
			>
				<div
					className="imageWrapper group w-auto h-full relative flex overflow-hidden"
					onClick={(e) => router.push(`/product/${productItem.id}`)}
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
								{wishlistStore.indexOf(productItem.id) !== -1 ? (
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

						<span className="relative  duration-700 flex pb-8 -left-1/2 translate-x-1/2  font-bold opacity-100 visible text-xs text-black/50">
							<p className="mr-3">{productItem.price}</p>TL
						</span>
					</div>
				</div>
			</div>
		);
	};

	const renderSearchResult = () => {
		if (value !== "") {
			return filterdProducts.map((product) => {
				if (
					product.name.toLowerCase().includes(value.toLowerCase()) ||
					product.category.label.toLowerCase().includes(value.toLowerCase())
				) {
					return renderProductItems(product);
				}
			});
		}
	};

	const overlayCloseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		let target = e.target as HTMLElement;
		if (target.classList[0] === "searchOverlay") {
			onChange(false);
			setValue("");
		}
	};

	useEffect(() => {
		console.log(inputref?.current);
		setTimeout(() => {
			inputref?.current?.focus();
		}, 50);
	}, [isOpen]);

	return (
		<div
			className={`searchOverlay fixed left-0 top-0 right-0 bottom-0 bg-black/60 duration-500 flex flex-col items-center ${
				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			}`}
			onClick={(e) => overlayCloseHandler(e)}
		>
			<div className="bg-white !h-16 w-80 mt-20 fixed -top-0">
				<input
					type="text"
					className="pl-8 h-full w-full"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					ref={inputref}
					autoFocus
				/>
			</div>

			<div id="searchProductItems" className="mt-40  flex overflow-x-auto w-[80%]  flex-wrap justify-center bg-black ">
				{renderSearchResult()}
			</div>
		</div>
	);
};

export default Search;
