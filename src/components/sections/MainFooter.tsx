// ** Core
import Link from "next/link";

// ** Constants
import { mainFooterPages } from "@/constants/mainFooter";

// ** Types
import { mainFooterPagesType } from "@/types/constants";

const MainFooter = () => {
	const renderFooterPages = () => {
		return (
			<ul className="flex flex-col items-center md:flex-row md:items-start md:justify-center ">
				{mainFooterPages.map((pagesItem: mainFooterPagesType) => {
					return (
						<li className="text-center" key={pagesItem.pageType}>
							{pagesItem.pageType}
							{pagesItem.pages.length > 0 && (
								<div className="relative flex flex-col items-center">
									<ul className="mb-8   md:items-start w-[150px] overflow-hidden">
										{pagesItem.pages.map((pageItem) => {
											return (
												<li key={pageItem.id} className="flex relative left-0">
													<svg
														className="md:block hidden"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M4 12H20M20 12L14 6M20 12L14 18"
															stroke="#929292"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<Link href={pageItem.href} className="ml-8 md:ml-0 ">
														{pageItem.label}
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div id="mainFooter" className="">
			<div className="top p-4">{renderFooterPages()}</div>
			<div className="bottom flex justify-between w-full max-w-[1240px] pb-4">
				<div className="left ml-4 xl:ml-0">
					<Link href={"/"}>© 2021 Qode Interactive, All Rights Reserved</Link>
				</div>
				<div className="right flex  items-center mr-4 xl:mr-0">
					<p className="mr-4 text-[12px]">Follow Us</p>
					<ul className="flex">
						<li>
							<Link href={"/"}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24">
									<path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
								</svg>
							</Link>
						</li>
						<li>
							<Link href={"/"}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24">
									{" "}
									<path d="M 12 3 C 7.04 3 3 7.04 3 12 L 3 38 C 3 42.96 7.04 47 12 47 L 38 47 C 42.96 47 47 42.96 47 38 L 47 12 C 47 7.04 42.96 3 38 3 L 12 3 z M 38 8 L 41 8 C 41.55 8 42 8.45 42 9 L 42 12 C 42 12.55 41.55 13 41 13 L 38 13 C 37.45 13 37 12.55 37 12 L 37 9 C 37 8.45 37.45 8 38 8 z M 25 10 C 30.33 10 35.019688 12.8 37.679688 17 L 42 17 L 42 37 C 42 39.76 39.76 42 37 42 L 13 42 C 10.24 42 8 39.76 8 37 L 8 17 L 12.320312 17 C 14.980313 12.8 19.67 10 25 10 z M 25 12 C 17.83 12 12 17.83 12 25 C 12 32.17 17.83 38 25 38 C 32.17 38 38 32.17 38 25 C 38 17.83 32.17 12 25 12 z M 25 16 C 29.96 16 34 20.04 34 25 C 34 29.96 29.96 34 25 34 C 20.04 34 16 29.96 16 25 C 16 20.04 20.04 16 25 16 z" />
								</svg>
							</Link>
						</li>
						<li>
							<Link href={"/"}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24">
									<path d="M12,27V15H8v-4h4V8.852C12,4.785,13.981,3,17.361,3c1.619,0,2.475,0.12,2.88,0.175V7h-2.305C16.501,7,16,7.757,16,9.291V11 h4.205l-0.571,4H16v12H12z" />
								</svg>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MainFooter;
