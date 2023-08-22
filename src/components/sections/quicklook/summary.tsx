import NumberInput from "@/components/ui/html/NumberInput";
import { ProductType } from "@/store/productStore";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useWishlistStore, useCartStore } from "@/store";
let wishlist: number[] = [];
let cartProducts: CartProductsType[] = [];

type CartProductsType = {
	id: number;
	quantity: number;
};

const Summary = ({ product }: { product: ProductType }) => {
	const [quantity, setQuantity] = useState(1);
	const [cookies, setCookie, removeCookie] = useCookies<string>(["wishlistProducts", "cart"]);
	const wishlistState = useWishlistStore((state) => state.list);
	const [isWished, setIsWished] = useState(wishlistState.includes(product?.id));
	const wishlistReset = useWishlistStore((state) => state.reset);
	const cartProductsState = useCartStore((state) => state.cartProducts);
	const addCartProducts = useCartStore((state) => state.add);
	const updateCartProducts = useCartStore((state) => state.update);

	const setCookieWishlistHandler = () => {
		if (!wishlist.includes(product.id)) {
			wishlist.push(product.id);
			setCookie("wishlistProducts", wishlist, { path: "/" });
			wishlistReset(wishlist);
		} else {
			let removed = wishlist.filter((item) => item !== product.id);
			setCookie("wishlistProducts", removed, { path: "/" });
			wishlistReset(removed);
		}
		setIsWished(wishlist.includes(product.id));
	};

	const setCookieAddCartHandler = () => {
		let productIndex = cartProducts.findIndex((item) => item.id === product.id);

		if (productIndex === -1) {
			cartProducts.push({ id: product.id, quantity: quantity });
			setCookie("cart", cartProducts, { path: "/" });
			addCartProducts({
				id: product.id,
				name: product.name,
				category: product.category.label,
				price: product.price,
				cartQuantity: quantity,
				images: product.images,
			});
		} else {
			cartProducts[productIndex].quantity += quantity;
			setCookie("cart", cartProducts, { path: "/" });
			updateCartProducts({
				id: product.id,
				name: product.name,
				category: product.category.label,
				price: product.price,
				cartQuantity: quantity,
				images: product.images,
			});
		}
	};

	useEffect(() => {
		if (!!cookies.wishlistProducts) {
			wishlist = cookies.wishlistProducts;
			setIsWished(wishlist.includes(product?.id));
		} else {
			wishlist = [];
		}
	}, [cookies.wishlistProducts]);

	useEffect(() => {
		if (!!cookies.cart) {
			cartProducts = cookies.cart;
		} else {
			wishlist = [];
		}
	}, [cookies.cart]);

	return (
		<div className=" h-auto w-full pl-20">
			<div className="top mb-8">
				<h2 className="uppercase tracking-widest font-bold ">{product?.name}</h2>
				<h4>{product?.category?.label}</h4>
				<h2 className="mr-4">{product?.price + "  TL"}</h2>
			</div>
			<div className="mid">
				<div className="ranking"></div>
				<p className="desc text-black/60">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aperiam molestias fugiat facere, labore,
					nulla odio ipsam eligendi, qui voluptates nostrum quidem ad recusandae amet nisi nam a quia maiores.
				</p>
			</div>
			<div className="mt-4 flex">
				<NumberInput value={quantity} onChange={setQuantity} />
				<div
					className="btn ml-4 bg-black hover:bg-black/80 h-12 text-bodyPrimary flex px-12 cursor-pointer"
					onClick={setCookieAddCartHandler}
				>
					<p className="uppercase m-auto ">Add To Cart</p>
				</div>
			</div>
			<div className="btnWishList mt-4 flex border border-black hover:border-black/40 duration-300 w-fit h-12 justify-center items-center px-4 cursor-pointer">
				{isWished ? (
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
							fill="#1C274C"
						/>
					</svg>
				) : (
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
							fill="#1C274C"
						/>
					</svg>
				)}
				<span className="ml-1 my-auto text-black " onClick={setCookieWishlistHandler}>
					<p>{isWished ? "Remove From " : "Add To "} WishList</p>
				</span>
			</div>
		</div>
	);
};

export default Summary;
