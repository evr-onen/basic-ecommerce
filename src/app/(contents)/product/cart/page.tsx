"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import Image from "next/image";
import NumberInput from "@/components/ui/html/NumberInput";
import ProductItem from "@/components/pages/home/product/cart/ProductItem";
import { numberWithDot } from "@/utils/numberDotSeparator";
const Page = () => {
	const cartProductsState = useCartStore((state) => state.cartProducts);

	const [totalPrice, setTotalPrice] = useState(0);
	const [count, setCount] = useState(0);

	const renderCartItem = () => {
		return cartProductsState.map((product) => {
			return <ProductItem key={product.id} product={product} trigger={countHandler} />;
		});
	};

	const getTotalPrice = () => {
		let tmpTotal = 0;
		cartProductsState.map((productItem) => {
			tmpTotal += productItem.cartQuantity * Number(productItem.price);
		});
		setTotalPrice(tmpTotal);
	};

	useEffect(() => {
		getTotalPrice();
	}, [count]);

	const countHandler = () => {
		setCount((prev) => prev + 1);
	};

	return (
		<div className="CartPage mt-[10vh] min-h-[44vh]">
			<div className="flex flex-col max-w-[1240px] w-full">
				<h1 className="text-center">Cart</h1>
				<div className="flex flex-col lg:flex-row w-full items-center xs:items-end lg:items-start ">
					<div className="left max-w-[825px] w-full  mr-12">{renderCartItem()}</div>
					<div className="right bg-bodyPrimary mt-8 lg:mt-0 w-[415px]  p-8">
						<h2 className="uppercase mb-8 font-bold">Cart Totals</h2>
						<div className="w-full flex">
							<p className="w-2/4 font-bold uppercase">SUBTOTAL</p>
							<p className="w-2/4">{numberWithDot(totalPrice) + " ₺"}</p>
						</div>
						<div className="w-full flex mt-4 border-b border-black/40 pb-8">
							<p className="w-2/4 font-bold uppercase">Tax (%18)</p>
							<p className="w-2/4">{numberWithDot(totalPrice * 0.18) + " ₺"}</p>
						</div>
						<div className="w-full flex mt-4">
							<p className="w-2/4 font-bold uppercase">Total</p>
							<h3 className="w-2/4 font-bold">{numberWithDot(totalPrice * 0.18 + totalPrice) + " ₺"}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
