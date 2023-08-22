// ** Core
import React, { useEffect, useState } from "react";
import Image from "next/image";

// ** Types
import { ProductType } from "@/store/productStore";

// ** LightBox
import Lightbox, { ImagesListType } from "react-spring-lightbox";

let images: ImagesListType = [];
const ProductSlider = ({ product }: { product: ProductType | null }) => {
	// ** States
	const [currentImageIndex, setCurrentIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		product?.images.map((image) => {
			images.push({
				src: image,
				loading: "lazy",
				alt: image,
			});
		});
	}, [product]);

	//  ** Handlers
	const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

	const gotoNext = () => currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);

	const openHandler = (imageIndex: number) => {
		setCurrentIndex(imageIndex);
		setIsOpen(true);
	};

	const closeHandler = () => {
		setIsOpen(false);
	};
	if (product) {
		return (
			<div className="sliderArea flex ">
				<div className="slide   h-[530px] w-[530px] relative" onClick={() => openHandler(0)}>
					<Image
						src={product?.images[0]}
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
				<Lightbox
					isOpen={isOpen}
					onPrev={gotoPrevious}
					onNext={gotoNext}
					images={images}
					currentIndex={currentImageIndex}
					/* Add your own UI */
					// renderHeader={() => (<CustomHeader />)}
					// renderFooter={() => (<CustomFooter />)}
					// renderPrevButton={() => <CustomLeftArrowButton />}
					// renderNextButton={() => <CustomRightArrowButton />}
					// renderImageOverlay={() => <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-1"></div>}
					/* Handle closing */
					onClose={closeHandler}
					pageTransitionConfig={{
						from: { transform: "scale(0.75)", opacity: 0 },
						enter: { transform: "scale(1)", opacity: 1 },
						leave: { transform: "scale(0.75)", opacity: 0 },
						config: { mass: 1, tension: 320, friction: 32 },
					}}
				/>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default ProductSlider;
