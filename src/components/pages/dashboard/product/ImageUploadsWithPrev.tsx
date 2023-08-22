// ** Core
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ** fetch
import axios from "axios";

// ** Store
import { useProductStore } from "@/store";

// ** Types
type OptionType = { id: number; label: string };
type ErrorObjType = { [key: string]: { key: string; error: string } };
interface PropsType {
	data: DataType;
	errorHandler: (errorData: ErrorObjType) => void;
	imageUrl?: string[];
	productId?: string;
}
type DataType = {
	name: string;
	price: string;
	quantity: number;
	category: OptionType;
};

export const ImageUploadsWithPrev = (props: PropsType) => {
	const { data, errorHandler, imageUrl, productId } = props;

	// ** States
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imageUrls, setImageUrls] = useState<string[]>(imageUrl!);

	// ** Handlers
	const resetImagesHandler = () => {
		setImageFiles([]);
		setImageUrls([]);
	};

	const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target;

		if (!fileInput.files) {
			console.warn("no file was chosen");
			return;
		}

		const newFiles = Array.from(fileInput.files);
		setImageFiles(newFiles);

		const newUrls = newFiles.map((file) => URL.createObjectURL(file));
		setImageUrls(newUrls);
	};

	return (
		<div className="imageUpload mt-8">
			<div className="uploadBtn flex ">
				<label htmlFor="imageUpload" className="flex cursor-pointer buttonStyle">
					<svg
						className="mr-2"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M18.5 1.25C18.9142 1.25 19.25 1.58579 19.25 2V4.75H22C22.4142 4.75 22.75 5.08579 22.75 5.5C22.75 5.91421 22.4142 6.25 22 6.25H19.25V9C19.25 9.41421 18.9142 9.75 18.5 9.75C18.0858 9.75 17.75 9.41421 17.75 9V6.25H15C14.5858 6.25 14.25 5.91421 14.25 5.5C14.25 5.08579 14.5858 4.75 15 4.75H17.75V2C17.75 1.58579 18.0858 1.25 18.5 1.25Z"
							fill="#1C274C"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12 1.25L11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C21.0667 17.4377 21.0596 17.4882 21.0522 17.5378L18.2782 15.0412C16.9788 13.8718 15.0437 13.7553 13.6134 14.7605L13.3152 14.9701C12.8182 15.3193 12.1421 15.2608 11.7125 14.8313L7.42282 10.5415C6.28741 9.40612 4.46613 9.34547 3.25771 10.4028L2.75098 10.8462C2.75552 9.05395 2.78124 7.69302 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25ZM2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.2487 19.7617 20.4479 19.4814 20.6096 19.1404C20.5707 19.1166 20.5334 19.089 20.4983 19.0574L17.2747 16.1562C16.4951 15.4545 15.334 15.3846 14.4758 15.9877L14.1776 16.1973C13.0843 16.9657 11.5968 16.8369 10.6519 15.8919L6.36216 11.6022C5.78515 11.0252 4.85958 10.9944 4.24546 11.5317L2.75038 12.8399C2.75296 14.7884 2.77289 16.2448 2.92637 17.3864Z"
							fill="#1C274C"
						/>
					</svg>
					<p>Images Upload</p>
				</label>
			</div>
			<input id="imageUpload" type="file" accept="image/*" multiple onChange={onImageFileChange} hidden />
			{!!imageUrls?.length && (
				<div className="preview w-full grid grid-cols-3 gap-4 mt-4 shadow p-4">
					{imageUrls.map((url, index) => (
						<div className="" key={index}>
							<Image
								src={url}
								className=" "
								alt={`Preview ${index}`}
								width={0}
								height={0}
								sizes="100%"
								style={{ width: "100%", height: "auto", flex: 1 }} // optional
							/>
						</div>
					))}
				</div>
			)}
			<ImageUploadsWithPrevBtn
				imageFiles={imageFiles}
				data={data}
				errorHandler={errorHandler}
				productId={productId}
				imageUrls={imageUrls}
				resetImagesHandler={resetImagesHandler}
			/>
		</div>
	);
};

// ** propsType
type ImageUploadsWithPrevBtnPropsType = {
	imageFiles: File[];
	data: DataType;
	errorHandler: (errorData: ErrorObjType) => void;
	productId?: string;
	imageUrls: string[];
	resetImagesHandler: () => void;
};
export const ImageUploadsWithPrevBtn = (props: ImageUploadsWithPrevBtnPropsType) => {
	const { imageFiles, data, errorHandler, productId, imageUrls, resetImagesHandler } = props;

	// ** Store
	const productStore = useProductStore((state) => state);

	// ** Hooks
	const router = useRouter();

	// ** Validate Control Function
	const validationControl = (validateData: any) => {
		let validationObj: { [key: string]: { key: string; error: string } } = {};
		let index: number = 0;
		for (const [key, value] of Object.entries(validateData)) {
			if (value === null || value === "") {
				validationObj[index] = {
					key: key,
					error: `${key} area must be filled.`,
				};
			}
			index++;
		}
		return validationObj;
	};
	// ** Handlers
	const handleUpload = async () => {
		if (Object.keys(validationControl(data)).length === 0) {
			const formData = new FormData();
			imageFiles.forEach((file) => {
				formData.append("files", file);
			});
			if (data.category !== null) {
				if (imageFiles.length > 0) {
					try {
						const response = await axios.post("/api/images", formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						});

						if (response.status === 200) {
							const product = {
								...data,
								id: Math.floor(Math.random() * 1000000) + 1,
								images: response.data.fileUrls,
								category: data.category,
							};
							if (productId) {
								productStore.update({ ...product, id: Number(productId) });
								router.push("/dashboard/product/list");
							} else {
								productStore.add(product);
							}

							console.log("Images uploaded successfully:", response.data.fileUrls);
						} else {
							console.error("Something went wrong while uploading images.");
						}
					} catch (error) {
						console.error("Error uploading images:", error);
					}
				} else {
					if (productId) {
						productStore.update({ ...data, id: Number(productId), images: imageUrls });
						router.push("/dashboard/product/list");
					}
				}
				resetImagesHandler();
			}
		} else {
			errorHandler(validationControl(data));
			console.log(validationControl(data));
		}
		console.log(productStore.products);
	};
	return (
		<div
			className="saveBtn fixed bottom-[10%] right-[10%] buttonStyle font-semibold !rounded-full h-18 w-18 flex items-center"
			onClick={handleUpload}
		>
			Save
		</div>
	);
};

export default ImageUploadsWithPrev;
