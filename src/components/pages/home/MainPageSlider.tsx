// ** Core
import Image from "next/image";

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// ** constants
import { sliderImages } from "@/constants/home";

const MainPageSlider = () => {
	const renderSwiperSlide = () => {
		return sliderImages.map((slide, i) => {
			return (
				<SwiperSlide className="h-full flex" key={i}>
					<div className="h-full   flex">
						<div className="w-1/2 bg-[#F3F3F3] relative">
							<div className="texts absolute bottom-20 left-[70%]  duration-[1300ms] opacity-0 delay-[300ms] ease-in-out -translate-x-1/2 w-full flex flex-col items-center p-16">
								<p className="ml-8 sm:ml-0 font-bold uppercase tracking-[3px] text-3xl">{slide.title}</p>
								<p className="  mt-4 text-black/40 capitalize w-80 ml-32 sm:w-auto sm:ml-0">{slide.subTitle}</p>
							</div>
						</div>
						<div className=" w-1/2 bg-[#F3F3F3]  relative  hidden sm:flex">
							{slide.images.map((image, index) => {
								return (
									<Image
										key={index}
										src={image.url}
										className={`slideImage !duration-1000 ${slide.className}`}
										alt={image.url}
										width={0}
										height={0}
										sizes="100%"
										loading="eager"
										style={{
											width: image.style.width,
											height: "auto",
											scale: image.style.scale,
											left: image.style.left,
										}}
									/>
								);
							})}
						</div>
					</div>
				</SwiperSlide>
			);
		});
	};
	return (
		<Swiper
			className="h-full homeSlider"
			spaceBetween={50}
			slidesPerView={1}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
			autoplay={{ delay: 2500, pauseOnMouseEnter: true, waitForTransition: true }}
			modules={[Autoplay]}
		>
			{renderSwiperSlide()}
		</Swiper>
	);
};

export default MainPageSlider;
