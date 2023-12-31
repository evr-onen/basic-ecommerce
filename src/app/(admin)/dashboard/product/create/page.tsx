"use client";

// ** Core
import React, { useEffect, useState } from "react";

// ** Reusable Comps
import SelectInput from "@/components/ui/html/SelectInput";
import TextInput from "@/components/ui/html/TextInput";

// ** Constants
import { categories } from "@/constants/product";

// ** Store
import { useProductStore } from "@/store";

// ** Components
import ImageUploadsWithPrev from "@/components/pages/dashboard/product/ImageUploadsWithPrev";

// ** Types
type OptionType = { id: number; label: string };
type ErrorObjType = { [key: string]: { key: string; error: string } };

const Page = () => {
	// ** States
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState<string>("");
	const [cat, setCat] = useState<OptionType | null>(null);
	const [catOptions, setCatOptions] = useState<OptionType[] | []>(categories);
	const [errors, SetErrors] = useState<ErrorObjType>();

	// ** Store
	const products = useProductStore((state) => state.products);

	// ** Handlers
	const errorHandler = (errorData: ErrorObjType) => {
		SetErrors(errorData);
	};

	// ** Reset
	useEffect(() => {
		setProductName("");
		setPrice("");
		setQuantity("");
		setCat(null);
	}, [products.length]);

	return (
		<div className="shadow h-full w-full p-8 bg-white flex flex-col ">
			<h2 className="font-semibold mb-8">Create Product</h2>
			<div className="flex flex-wrap ">
				<div className="productName ml-4 w-full max-w-[230px] relative">
					{errors?.hasOwnProperty(0) && (
						<div className="capitalize p-2 bg-error text-white rounded-md text-xs  absolute w-full max-w-[230px] -top-8">
							{errors![0].error}
						</div>
					)}
					<TextInput
						className=""
						name="productName"
						placeholder="Product Name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
				</div>
				<div className="price ml-4 w-full max-w-[230px] relative">
					{errors?.hasOwnProperty(1) && (
						<div className="capitalize p-2 bg-error text-white rounded-md text-xs  absolute w-full max-w-[230px] -top-8">
							{errors![1].error}
						</div>
					)}
					<TextInput
						className=""
						name="price"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<div className="quantity ml-4 w-full max-w-[230px] relative">
					{errors?.hasOwnProperty(2) && (
						<div className="capitalize p-2 bg-error text-white rounded-md text-xs absolute w-full max-w-[230px] -top-8">
							{errors![2].error}
						</div>
					)}
					<TextInput
						className=""
						name="quantity"
						placeholder="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<div className="quantity ml-4 w-full max-w-[230px] relative">
					{errors?.hasOwnProperty(3) && (
						<div className="capitalize p-2 bg-error text-white rounded-md text-xs absolute w-full max-w-[230px] -top-8">
							{errors![3].error}
						</div>
					)}
					<SelectInput
						className=""
						name="category"
						placeholder="Category"
						options={catOptions}
						value={cat}
						onChange={(e) => setCat(e)}
					/>
				</div>
			</div>
			<ImageUploadsWithPrev
				data={{ name: productName, price, quantity: Number(quantity), category: cat! }}
				errorHandler={errorHandler}
			/>
		</div>
	);
};

export default Page;
