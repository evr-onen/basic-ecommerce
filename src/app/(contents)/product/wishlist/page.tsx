"use client";
import React, { useEffect, useState } from "react";
import { useWishlistStore, useProductStore } from "@/store";

import ProductItem from "@/components/pages/home/product/wishlist/ProductItem";

const Page = () => {
	const allWishlist = useWishlistStore((state) => state.list);
	const allProducts = useProductStore((state) => state.products);

	console.log(allWishlist);
	const renderCartItem = () => {
		return allWishlist.map((productId) => {
			let productIndex = allProducts.findIndex((item) => item.id === productId);
			return <ProductItem key={productId} product={allProducts[productIndex]} />;
		});
	};

	return (
		<div className="CartPage mt-[10vh] min-h-[44vh]  max-w-[1240px] w-full">
			<div className="flex flex-col">
				<h1 className="text-center lg:text-left">Wishlist</h1>
				<div className="flex justify-center">
					<div className="left w-2/3 md:mr-12 flex flex-wrap justify-center">{renderCartItem()}</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
