"use client";
// ** Core
import { usePathname } from "next/navigation";

// ** Store
import { useProductStore } from "@/store";

export default function BreadCrumbs() {
	// ** Hooks
	const fullLocation = usePathname();
	const products = useProductStore((state) => state.products);

	const locations = fullLocation.split("/");
	return (
		<nav className="flex h-[3vh]" aria-label="Breadcrumb">
			<ol role="list" className="flex space-x-4 rounded-md bg-white ">
				<li className="flex">
					<div className="flex items-center">
						<a href="/" className="text-gray-400 hover:text-gray-500">
							<svg
								className="h-5 w-5 flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24px"
								height="24px"
							>
								<path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
							</svg>
							<span className="sr-only">{locations[0]}</span>
						</a>
					</div>
				</li>
				{locations.map((page, index) => {
					if (!isNaN(Number(page))) {
						page = products.find((product) => product.id === Number(page))?.name!;
					}

					if (index !== 0) {
						return (
							<li key={index} className="flex">
								<div className="flex items-center">
									<svg
										className=" sm:w-4  sm:h-4 !w-2 !h-2 flex-shrink-0 text-gray-200 stroke-[2px] stroke-bodySecondary"
										width={8}
										height={8}
										viewBox="0 0 24 44"
										preserveAspectRatio="none"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
									</svg>
									<div className="ml-4 text-[10px] md:text-xs  text-black hover:text-black/70 uppercase   font-bold">
										{page}
									</div>
								</div>
							</li>
						);
					}
				})}
			</ol>
		</nav>
	);
}
