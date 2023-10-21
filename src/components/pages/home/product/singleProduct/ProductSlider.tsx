// ** Core
import React, { useEffect, useState } from "react";
import Image from "next/image";

// ** LightBox
import Lightbox, { ImagesListType } from "react-spring-lightbox";

// ** Types
import { ProductType } from "@/store/productStore";

// ** Vars
let images: ImagesListType = [];
const ProductSlider = ({ product }: { product: ProductType }) => {
	// ** States
	const [currentImageIndex, setCurrentIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	// get ready images for slide
	useEffect(() => {
		product?.images.map((image) => {
			images.push({
				src: image,
				loading: "lazy",
				alt: image,
			});
		});
	}, [product]);

	// ** Handlers

	const openHandler = (imageIndex: number) => {
		setCurrentIndex(imageIndex);
		setIsOpen(true);
	};

	const renderThumbnails = () => {
		return product?.images.map((image, index) => {
			return (
				<div key={index} className="thumbWrapper cursor-pointer  " onClick={() => openHandler(index)}>
					<Image
						src={image}
						className={`thumb`}
						alt={image}
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
			);
		});
	};
	return (
		<div className="sliderArea flex">
			<div className="tumbs  w-[100px]  grid-cols-1 gap-2 mr-4 content-between hidden md:grid">
				{renderThumbnails()}
			</div>
			<div className="slide h-[530px] w-[530px] relative" onClick={() => openHandler(0)}>
				<Image
					src={product?.images[currentImageIndex]}
					className={`thumb`}
					alt={product?.images[0]}
					width={0}
					height={0}
					sizes="100%"
					loading="eager"
					style={{
						width: "100%",
						height: "100%",
					}}
				/>
			</div>
		</div>
	);
};

export default ProductSlider;
