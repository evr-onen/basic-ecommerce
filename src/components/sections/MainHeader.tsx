"use client";
// ** Core
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ** components
import Modal from "@/components/ui/Modal";
import ModalAuth from "./modalAuth/ModalAuth";
import Search from "../ui/search";

// ** Constant
import { mainHeaderNavPages } from "@/constants/mainHeader";

// ** Store
import { useWishlistStore, useCartStore, useProductStore } from "@/store";

// ** Auth
import { useSession } from "next-auth/react";

// ** Cookie
import { useCookies } from "react-cookie";

// ** Vars
let wishlist: number[] = [];
let tmp: number[] | [] = [];
let cartProducts: CartProductsType[] = [];

// ** Types
import { mainHeaderNavPageType } from "@/types/constants";
type CartProductsType = {
	id: number;
	quantity: number;
};

const MainHeader = ({ children }: { children?: React.ReactNode }) => {
	// ** Hooks
	const wishlistState = useWishlistStore((state) => state.list);
	const resetWishlist = useWishlistStore((state) => state.reset);
	const productsState = useProductStore((state) => state.products);
	const cartProductsState = useCartStore((state) => state.cartProducts);
	const addCartProducts = useCartStore((state) => state.add);
	const removeProductsState = useCartStore((state) => state.remove);

	const { data: session, status } = useSession();

	const [cookies, setCookie, removeCookie] = useCookies<string>(["wishlistProducts", "cart"]);

	// ** States
	const [isOpen, setIsOpen] = useState(false);
	const [hoverPageQuantity, setHoverPageQuantity] = useState<number[] | []>([]);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

	useEffect(() => {
		mainHeaderNavPages.map((item) => {
			tmp.push(item.pages.length as never);
		});
		setHoverPageQuantity(tmp);
	}, []);

	useEffect(() => {
		if (!!cookies.wishlistProducts) {
			wishlist = cookies.wishlistProducts;
		} else {
			wishlist = [];
		}
		resetWishlist(wishlist);
	}, [cookies.wishlistProducts]);

	useEffect(() => {
		cartProducts = [];
		if (!!cookies.cart) {
			cartProducts = cookies.cart;
		} else {
			cartProducts = [];
		}

		cartProducts?.map((cartitem) => {
			if (cartProductsState.findIndex((stateItem) => stateItem.id === cartitem.id) === -1) {
				let productIndex = productsState.findIndex((item) => item.id === cartitem.id);
				addCartProducts({
					id: productsState[productIndex].id,
					name: productsState[productIndex].name,
					category: productsState[productIndex].category.label,
					price: productsState[productIndex].price,
					cartQuantity: cartitem.quantity,
					images: productsState[productIndex].images,
				});
			}
		});
	}, []);

	const removeCartItem = (id: number) => {
		removeProductsState(id);
		cartProducts = cookies.cart;
		cartProducts = cartProducts.filter((item) => item.id !== id);
		console.log(cartProducts);
		setCookie("cart", cartProducts, { path: "/" });
	};

	const renderPageNav = () => {
		return (
			<div className="mainHeaderPageNav md:block hidden">
				<ul>
					{mainHeaderNavPages.map((mainHeaderNavPage: mainHeaderNavPageType, index: number) => {
						return (
							<>
								<li
									key={mainHeaderNavPage.pageType}
									onMouseEnter={() => setHoverIndex(index)}
									onMouseLeave={() => setHoverIndex(null)}
								>
									<p className="">{mainHeaderNavPage.pageType}</p>
									{mainHeaderNavPage.pages.length > 0 && (
										<ul
											style={
												hoverIndex! !== null
													? { height: hoverPageQuantity[hoverIndex!] * 24 + 32 + "px" }
													: { height: "0" }
											}
										>
											<div>
												{mainHeaderNavPage.pages.map((pageItem) => (
													<li key={pageItem.id} className="flex items-center">
														<svg
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M4 12H20M20 12L14 6M20 12L14 18"
																stroke="#fff"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
														<Link href={pageItem.href}>{pageItem.label}</Link>
													</li>
												))}
											</div>
										</ul>
									)}
								</li>
							</>
						);
					})}
					<li>
						<Link className="m-auto" href={"/sign-in"}>
							Sign-in
						</Link>
					</li>
					{status === "authenticated" && (
						<>
							<li>
								<Link className="m-auto" href={"/dashboard/welcome"}>
									Dashboard
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		);
	};

	const renderCartPanel = () => {
		let AllTotal = 0;
		if (cartProductsState.length > 0) {
			return (
				<div className=" flex flex-col absolute -left-full -translate-x-1/2 top-full text-secondaryText bg-black p-4 cursor-default">
					{cartProductsState.map((product) => {
						AllTotal += Number(product.price) * product.cartQuantity;
						return (
							<div key={product.id} className="productItem flex justify-between mb-4">
								<div className="imgWrapper w-12">
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
								<div className="description flex flex-col ml-4 min-w-[10rem]">
									<div className="title">
										<Link href={`/product/${product.id}`}>
											<p className="text-lg text-white uppercase font-normal">{product.name}</p>
										</Link>
									</div>
									<div className="priceNQuantity">
										<p className="text-white ">{`${product.cartQuantity} X ${product.price}` + " ₺"} </p>
									</div>
								</div>
								<div
									className="closeHandler ml-4 flex items-center hover:bg-white/40 h-8 w-8 rounded-full justify-center hover:text-black cursor-pointer"
									onClick={() => removeCartItem(product.id)}
								>
									x
								</div>
							</div>
						);
					})}
					<div className="total flex justify-between">
						<h4 className="uppercase flex-1 text-bodyPrimary">total:</h4>
						<h4 className="uppercase flex-3 text-bodyPrimary">{AllTotal + " ₺"}</h4>
					</div>

					<Link
						href={"/product/cart"}
						className="uppercase text-white text-center border border-white/10  py-4 hover:border-white duration-300"
					>
						view cart
					</Link>
				</div>
			);
		} else {
			return <div></div>;
		}
	};

	const openSearchHandler = () => {
		
		
		document.querySelector("body")!.style.overflow = "hidden";
	};

	return (
		<div className="headerWrapper px-2 w-full flex justify-center fixed left-0 right-0 top-0 bg-white z-20">
			<div id="mainHeader" className="h-[10vh]  max-w-[1240px] w-full flex justify-between">
				<div className="left">{renderPageNav()}</div>
				<div className="center my-auto">
					<h1>
						<Link href={"/"}>LOGO</Link>
					</h1>
				</div>
				<div className="right  lg:mr-4 xl:mr-0 ">
					<div className=" rightHeaderBtns cart cursor-pointer flex flex-col justify-center items-center relative">
						<div className="flex items-center">
							<Link href={"/product/cart"} className="my-auto mr-1">
								CART
							</Link>
							<span className="cartPrice my-auto text-secondaryText">({cartProductsState.length})</span>
						</div>
						{renderCartPanel()}
					</div>
					<div className="rightHeaderBtns whislist h-full flex flex-col items-center justify-center cursor-pointer relative">
						<Link href={"/product/wishlist"} className="flex">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
									fill="#1C274C"
								/>
							</svg>
							<p className=" ml-1 my-auto text-secondaryText">({wishlistState.length})</p>
						</Link>
						<div></div>
					</div>
					{status !== "authenticated" && (
						<div className="login my-auto cursor-pointer">
							<div className="flex" onClick={() => setIsOpen(true)}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
									<path
										d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
										stroke="#1C274C"
										strokeWidth="1.5"
									/>
								</svg>
								<p className=" ml-1 my-auto">LOGIN</p>
							</div>
						</div>
					)}
					<div className="search my-auto cursor-pointer" onClick={() => openSearchHandler()}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="11.5" cy="11.5" r="9.5" stroke="#1C274C" strokeWidth="1.5" />
							<path d="M18.5 18.5L22 22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</div>
					{/* <div className="sideBar my-auto cursor-pointer">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 7L4 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
							<path d="M20 12L4 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
							<path d="M20 17L4 17" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</div> */}
				</div>
				<Modal size="xs" isOpen={isOpen} onChange={(e) => setIsOpen(e)}>
					<ModalAuth />
				</Modal>
				<Search isOpen={isSearchOpen} onChange={setIsSearchOpen} />
			</div>
			<div className="content">{children}</div>
		</div>
	);
};

export default MainHeader;
