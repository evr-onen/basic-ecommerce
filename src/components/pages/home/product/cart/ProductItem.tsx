// ** Core
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Reusable Components
import NumberInput from "@/components/ui/html/NumberInput";

// ** Store
import { useCartStore } from "@/store/cartStore";
import { useCookies } from "react-cookie";

// ** Utils
import { numberWithDot } from "@/utils/numberDotSeparator";

// ** Types
import { CartProductsType } from "@/store/cartStore";
type CartItemsType = {
	id: number;
	quantity: number;
};

const ProductItem = ({ product, trigger }: { product: CartProductsType; trigger: () => void }) => {
	// ** States
	const [productCount, setProductCount] = useState(product.cartQuantity);

	// ** Hooks
	const removeCart = useCartStore((state) => state.remove);
	const updateCart = useCartStore((state) => state.update);
	const [cookies, setCookie] = useCookies<string>(["cart"]);

	// ** Vars
	let cartItems: CartItemsType[] = cookies.cart;
	let productIndex = cartItems.findIndex((item) => item.id === product.id);

	// ** Handlers
	const removeProductHandler = () => {
		removeCart(product.id);
		removeProductFromCookie();
	};
	const removeProductFromCookie = () => {
		cartItems = cartItems.filter((item) => item.id !== product.id);
		setCookie("cart", cartItems, { path: "/" });
	};

	useEffect(() => {
		cartItems[productIndex].quantity = productCount;
		setCookie("cart", cartItems, { path: "/" });
		updateCart({
			id: product.id,
			name: product.name,
			category: product.category,
			price: product.price,
			cartQuantity: productCount,
			images: product.images,
		});
		trigger();
	}, [productCount]);

	return (
		<div className="productItem flex w-full mt-4 items-center border-b border-black/40 md:p-4 p-0">
			<span
				onClick={removeProductHandler}
				className="cursor-pointer hover:bg-black/10 w-8 h-8 rounded-full flex items-center justify-center mr-4"
			>
				x
			</span>
			<div className="itemContent flex justify-around items-center w-full ">
				<div className="imageWrapper max-w-24 flex-1 hidden sm:block">
					<Image
						src={product.images[0]}
						className={`thumb`}
						alt={product.images[0]}
						width={0}
						height={0}
						sizes="100%"
						loading="eager"
						style={{
							width: "100%",
							height: "auto",
						}}
					/>
				</div>
				<div className="title flex-1 pl-4 text-center">
					<Link
						href={`/product/${product.id}`}
						className="uppercase font-bold cursor-pointer hover:text-black/40 duration-200"
					>
						{product.name}
					</Link>
				</div>
				<div className="price flex-1 pl-4">
					<p className="text-black/40 font-normal text-center">{numberWithDot(Number(product.price)) + " ₺"}</p>
				</div>
				<div className="quantity flex-1">
					<NumberInput value={productCount} onChange={setProductCount} size="sm" />
				</div>
				<div className="itemTotal flex-1 pl-4">
					<p className="text-black/40 font-normal text-center">
						{numberWithDot(Number(product.price) * productCount) + " ₺"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
