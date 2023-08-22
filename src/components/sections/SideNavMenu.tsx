"use client";
import { adminSideNav } from "@/constants/adminSideNav";
import { AdminSideNavType } from "@/types/constants";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SideNavMenu = () => {
	const location = usePathname();
	const currentLocation = location.split("/")[2] === "welcome" ? "dashboard" : location.split("/")[2];
	const [isOpenArray, setIsOpenArray] = useState<string[] | []>([currentLocation]);
	const [isOpen, setIsOpen] = useState(false);

	const openHandler = () => {
		setIsOpen(true);
	};
	const closeHandler = () => {
		setIsOpen(false);
	};

	const clickTitleHandler = (title: string) => {
		if (isOpenArray.indexOf(title.toLowerCase() as never) === -1) {
			setIsOpenArray((prev) => [...prev, title.toLowerCase()]);
		} else {
			setIsOpenArray((prev) => prev.filter((item) => item !== title));
		}
	};
	return (
		<div className="order-3 ml-auto ">
			<div onClick={openHandler} className="mr-8 block md:hidden  ">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20 7L4 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
					<path d="M20 12L4 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
					<path d="M20 17L4 17" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
				</svg>
			</div>
			<div
				id="sideNavSlider"
				className={`fixed top-0 left-0 right-0 h-screen z-50 bg-white/90  justify-center items-center ${
					isOpen ? "flex" : "hidden"
				}`}
			>
				<span onClick={closeHandler} className="fixed right-10 top-8">
					<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
					</svg>
				</span>
				<ul className="font-montserrat font-light  ">
					{adminSideNav.map((navSection: AdminSideNavType) => {
						let theHeight = navSection.subs.length * 32 + (navSection.subs.length - 1) * 8 + "px";
						return (
							<Fragment key={navSection.label}>
								<li onClick={() => clickTitleHandler(navSection.label.toLowerCase())} className="">
									<p className="font-medium text-3xl tracking-wide rounded-sm">{navSection.label}</p>
								</li>
								<div
									style={{
										height: isOpenArray.indexOf(navSection.label.toLowerCase() as never) !== -1 ? theHeight : 0,
									}}
									className="!ml-4"
								>
									{navSection.subs?.map((sub) => {
										return (
											<div
												key={sub.id}
												className={`${
													sub.href.split("/").slice(-1)[0] === location.split("/").slice(-1)[0] &&
													sub.href.split("/").slice(-2)[0] === location.split("/").slice(-2)[0]
														? "onSelectedSideNav"
														: ""
												}`}
											>
												<Link
													href={sub.href}
													className="w-full tracking-widest text-2xl  font-normal"
													onClick={closeHandler}
												>
													{sub.label}
												</Link>
											</div>
										);
									})}
								</div>
							</Fragment>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default SideNavMenu;
