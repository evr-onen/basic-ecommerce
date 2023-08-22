"use client";
import { adminSideNav } from "@/constants/adminSideNav";
import { AdminSideNavType } from "@/types/constants";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AdminSideNav = () => {
	const location = usePathname();
	const currentLocation = location.split("/")[2] === "welcome" ? "dashboard" : location.split("/")[2];
	const [isOpenArray, setIsOpenArray] = useState<string[] | []>([currentLocation]);

	const clickTitleHandler = (title: string) => {
		if (isOpenArray.indexOf(title.toLowerCase() as never) === -1) {
			setIsOpenArray((prev) => [...prev, title.toLowerCase()]);
		} else {
			setIsOpenArray((prev) => prev.filter((item) => item !== title));
		}
	};

	return (
		<ul id="mainHeader" className="font-montserrat font-light  ">
			{adminSideNav.map((navSection: AdminSideNavType) => {
				let theHeight = navSection.subs.length * 32 + (navSection.subs.length - 1) * 8 + "px";
				return (
					<Fragment key={navSection.label}>
						<li onClick={() => clickTitleHandler(navSection.label.toLowerCase())} className="">
							<p className="font-medium text-sm tracking-wide rounded-sm">{navSection.label}</p>
						</li>
						<div
							style={{ height: isOpenArray.indexOf(navSection.label.toLowerCase() as never) !== -1 ? theHeight : 0 }}
							className="!ml-4"
						>
							{navSection.subs?.map((sub) => {
								return (
									<div
										key={sub.id}
										className={`${
											sub.href.split("/").slice(-1)[0] === location.split("/").slice(-1)[0] &&
											sub.href.split("/").slice(-2)[0] === location.split("/").slice(-2)[0]
												? "onSelected"
												: ""
										}`}
									>
										<Link href={sub.href} className="w-full tracking-widest text-xs font-normal">
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
	);
};

export default AdminSideNav;
