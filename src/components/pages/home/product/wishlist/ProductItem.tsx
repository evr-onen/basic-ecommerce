// ** Core
import React from "react";
import Image from "next/image";
import Link from "next/link";

// ** Stores
import { useWishlistStore } from "@/store";

// ** Cookies
import { useCookies } from "react-cookie";

// ** Utils
import { numberWithDot } from "@/utils/numberDotSeparator";

// ** Types
import { ProductType } from "@/store/productStore";

const ProductItem = ({ product }: { product: ProductType }) => {
	// ** Hooks
	const removeProduct = useWishlistStore((state) => state.remove);

	// ** States
	const [cookies, setCookie] = useCookies<string>(["wishlistProducts"]);

	// ** Vars
	let wishProducts: number[] = cookies.wishlistProducts;

	// ** Handlers
	const removeProductHandler = () => {
		removeProduct(product.id);
		removeProductFromCookie();
	};
	const removeProductFromCookie = () => {
		wishProducts = wishProducts.filter((item) => item !== product.id);
		setCookie("wishlistProducts", wishProducts, { path: "/" });
	};

	return (
		<div className="productItem flex w-full mt-4 items-center border-b border-black/40 p-4 flex-col md:flex-row ">
			<span
				className="cursor-pointer hover:bg-black/10 w-8 h-8 rounded-full hidden items-center justify-center mr-4 md:flex "
				onClick={removeProductHandler}
			>
				x
			</span>
			<div
				className="cursor-pointer  w-full py-2 mb-4 text-white flex md:hidden items-center justify-end "
				onClick={removeProductHandler}
			>
				<p className=" uppercase bg-black  rounded-full w-12 h-12 flex justify-center items-center">x</p>
			</div>
			<div className="itemContent flex justify-around items-center w-full flex-col md:flex-row">
				<div className="imageWrapper md:w-20 w-40 relative">
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
				<div className="title flex-1 pl-4 text-center mt-4 md:mt-0">
					<Link
						href={`/product/${product.id}`}
						className="uppercase font-bold cursor-pointer hover:text-black/40 duration-200"
					>
						{product.name}
					</Link>
				</div>
				<div className="title flex-1 pl-4 text-center">
					<div className="uppercase font-bold  text-black/40 duration-200">{product.category.label}</div>
				</div>
				<div className="price flex-1 pl-4">
					<p className="text-black/40 font-normal text-center text-lg">{numberWithDot(Number(product.price)) + " ₺"}</p>
				</div>
				<Link href={`/product/${product.id}`}>
					<p className="uppercase bg-black text-white text-xs font-semibold px-4 py-2 cursor-pointer">view product</p>
				</Link>
			</div>
		</div>
	);
};

export default ProductItem;
