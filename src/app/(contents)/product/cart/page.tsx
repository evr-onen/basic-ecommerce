"use client";
// ** Core
import React, { useEffect, useState } from "react";

// ** Store
import { useCartStore } from "@/store";

// ** Components
import ProductItem from "@/components/pages/home/product/cart/ProductItem";

// ** Utils
import { numberWithDot } from "@/utils/numberDotSeparator";

const Page = () => {
	// ** Hooks
	const cartProductsState = useCartStore((state) => state.cartProducts);

	// ** States
	const [totalPrice, setTotalPrice] = useState(0);
	const [count, setCount] = useState(0);

	// ** Renders
	const renderCartItem = () => {
		if (cartProductsState.length === 0) {
			return (
				<div className="w-full h-[44vh] flex">
					<p className="m-auto font-bold tracking-widest">There is no product in Cart.</p>
				</div>
			);
		}
		return cartProductsState.map((product) => {
			return <ProductItem key={product.id} product={product} trigger={countHandler} />;
		});
	};
	// ** geting total Price
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
		<div className="CartPage mt-[10vh] min-h-[44vh] ">
			<div className="flex flex-col max-w-[1240px] w-full">
				<h1 className="text-center">Cart</h1>
				<div className="flex flex-col lg:flex-row w-full items-center xs:items-end lg:items-start ">
					<div className="left max-w-[825px] w-full px-2  md:min-h-[40vh]  sm:mr-12 mr-4">{renderCartItem()}</div>
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
