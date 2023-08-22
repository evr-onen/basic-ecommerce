"use client";
import React, { SetStateAction, useState } from "react";

type SizeType = "xs" | "sm" | "md" | "lg" | "full";

const Modal = ({
	children,
	size = "full",
	isOpen = false,
	height = "h-screen",
	onChange,
}: {
	children: React.ReactNode;
	size?: SizeType;
	isOpen?: boolean;
	height?: string;
	onChange: (value: SetStateAction<boolean>) => void;
}) => {
	const renderSizeStyle = (size: string) => {
		switch (size) {
			case "xs":
				return { maxWidth: "300px" };
			case "sm":
				return { maxWidth: "460px" };
			case "md":
				return { maxWidth: "900px" };
			case "lg":
				return { maxWidth: "1200px" };
			default:
				return { width: "100%" };
		}
	};
	const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const targetElement = e.target as HTMLElement;
		if (targetElement.classList[0] === "overlay") onChange(false);
	};
	return (
		<div
			className={`${
				isOpen ? "overlay" : ""
			} duration-500 ${height} invisible opacity-0 flex z-50 fixed bg-black/70 left-0 right-0 top-0 bottom-0`}
			onClick={(e) => closeModalHandler(e)}
		>
			<div style={renderSizeStyle(size)} className="modalWrapper w-full bg-white text-black m-auto flex ">
				{children}
			</div>
		</div>
	);
};
Modal;
export default Modal;
