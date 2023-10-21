// ** Core
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ** Types
type ProductType = {
	id: number;
	name: string;
	category: OptionType;
	price: string;
	quantity: number;
	images: string[] | [];
};
type OptionType = { id: number; label: string };

const ProductList = ({ products }: { products: ProductType[] }) => {
	// ** States
	const [productsData, setProductsData] = useState(products);

	// ** Hooks
	const router = useRouter();

	// ** Handlers
	const deleteHandler = (id: number) => {
		setProductsData((prev) => prev.filter((product) => product.id !== id));
	};

	// ** Renders
	const renderProductItems = () => {
		return productsData.map((product: ProductType) => {
			return (
				<div key={product.id} className="row max-w-[800px] flex border border-bodyPrimary">
					<div className="productName w-[50%] border-r border-r-bodyPrimary h-auto flex">
						<div className="image w-2/5  lg:w-1/6 h-auto p-0 lg:p-2">
							<Image
								src={product.images[0]}
								className=" "
								alt={product.name + "0"}
								width={0}
								height={0}
								sizes="100%"
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
						<div className="description flex md:flex-row flex-col md:justify-evenly md:items-center w-4/5 sm:p-4">
							<span className="flex lg:items-center flex-col ">
								<p className="pl-2 font-bold  sm:text-[10px] text-[8px] md:text-xs lg:text-sm w-full">Name </p>
								<p className="pl-2 font-semibold  w-full sm:text-[10px] text-[8px] md:text-xs lg:text-sm capitalize text-info">
									{product.name}
								</p>
							</span>
							<span className="flex lg:items-center flex-col">
								<p className="pl-2 font-bold sm:text-[10px] text-[8px] md:text-xs  lg:text-sm w-100">Category</p>
								<p className="pl-2 font-semibold sm:text-[10px] text-[8px] md:text-xs  lg:text-sm w-100 capitalize text-error">
									{product.category.label}
								</p>
							</span>
						</div>
					</div>
					<div className="price w-[15%] border-r border-r-bodyPrimary h-auto flex">
						<p className=" font-semibold text-[8px] sm:text-xs lg:text-sm m-auto">{product.price + " TL"}</p>
					</div>
					<div className="quantity w-[15%] border-r border-r-bodyPrimary h-auto flex justify-center">
						<p className=" font-semibold text-[8px] sm:text-xs lg:text-sm m-auto flex-wrap mx-2 flex text-center ">
							{product.quantity + " pieces"}
						</p>
					</div>

					<div className="actions w-[20%] flex lg:justify-evenly justify-center items-center  flex-wrap">
						<button
							className="lg:px-4 lg:py-2 px-2 py-1 bg-info h-auto   lg:w-20 w-16 text-bodyPrimary shadow rounded text-[10px] sm:text-xs  font-semibold  lg:text-xs "
							onClick={() => router.push(`/dashboard/product/update/${product.id}`)}
						>
							Edit
						</button>
						<button
							className="lg:px-4 lg:py-2 px-1 py-1 bg-error h-auto lg:w-20 w-16 text-bodyPrimary shadow rounded text-[10px] sm:text-xs  font-semibold  lg:text-xs "
							onClick={() => deleteHandler(product.id)}
						>
							Delete
						</button>
					</div>
				</div>
			);
		});
	};
	return (
		<div className="flex flex-col max-w-[800px] ">
			<div className="row w-full flex border border-bodyPrimary">
				<div className="productName w-[50%] border-r border-r-bodyPrimary h-12 flex">
					<p className="md:text-sm  sm:text-[10px] text-[8px] font-bold  m-auto">Product</p>
				</div>
				<div className="price w-[15%] border-r border-r-bodyPrimary h-12 flex">
					<p className="md:text-sm sm:text-[10px] text-[8px] font-bold  m-auto">Price</p>
				</div>
				<div className="quantity w-[15%] border-r border-r-bodyPrimary h-12 flex">
					<p className="md:text-sm sm:text-[10px] text-[8px] font-bold m-auto">Quantity</p>
				</div>
				<div className="actions w-[20%] flex ">
					<p className="md:text-sm  sm:text-[10px] text-[8px]  font-bold  m-auto">Action</p>
				</div>
			</div>
			{renderProductItems()}
		</div>
	);
};

export default ProductList;
