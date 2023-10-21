"use client";
// ** Cores
import React, { useEffect, useState } from "react";

// ** Stores
import { useWishlistStore, useProductStore } from "@/store";

// ** Components
import ProductItem from "@/components/pages/home/product/wishlist/ProductItem";
import { ToastContainer } from "react-toastify";

const Page = () => {
	// ** Hooks
	const allWishlist = useWishlistStore((state) => state.list);
	const allProducts = useProductStore((state) => state.products);

	// ** Renders
	const renderCartItem = () => {
		if (allWishlist.length === 0) {
			return (
				<div className="w-full h-[44vh] max-w-[1240px] flex">
					<p className="m-auto font-bold tracking-widest">There is no product in Wishlist.</p>
				</div>
			);
		}
		return allWishlist.map((productId) => {
			let productIndex = allProducts.findIndex((item) => item.id === productId);
			return <ProductItem key={productId} product={allProducts[productIndex]} />;
		});
	};

	return (
		<div className="CartPage mt-[10vh] w-full max-w-[1240px]">
			<ToastContainer autoClose={700} hideProgressBar={true} closeButton={true} />
			<div className="flex flex-col h-full min-h-[39vh]">
				<h1 className="text-center md:text-left xl:pl-0 md:pl-8 pl-0">Wishlist</h1>
				<div className="flex justify-center h-full">
					<div className="left w-2/3 md:mr-12 flex flex-wrap justify-center h-full">{renderCartItem()}</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
