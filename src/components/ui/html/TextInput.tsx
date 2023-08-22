"use client";
import React, { useRef, forwardRef, useId, useEffect, useState, LabelHTMLAttributes, DetailedHTMLProps } from "react";

interface PropsType {
	type?: string;
	placeholder?: string;
	name?: string;
	width?: string;
	className?: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = forwardRef<HTMLInputElement, PropsType>(
	(
		{ className = "", type = "text", placeholder = "", name = "", value = "", onChange, width = "100%" }: PropsType,
		ref
	) => {
		const [isFocus, setIsFocus] = useState(false);
		const labelRef = useRef<HTMLLabelElement>(null);
		useEffect(() => {
			if (value === "" && !isFocus) {
				if (!!labelRef?.current) {
					const label = labelRef?.current;
					label?.classList?.remove("inputFocus");
				}
			} else if (value === "" && isFocus) {
				if (!!labelRef?.current) {
					const label = labelRef?.current;
					label?.classList?.add("inputFocus");
				}
			} else if (value !== "") {
				if (!!labelRef?.current) {
					const label = labelRef?.current;
					label?.classList?.add("inputFocus");
				}
			}
		}, [value, isFocus]);

		return (
			<div className={`flex flex-col relative mt-3 min-w-[140px] w-full ${className}`}>
				<label
					htmlFor={placeholder}
					className="absolute  top-[30%] truncate left-1/2 -translate-x-1/2 px-[2px] duration-500 text-sm font-medium  bg-white capitalize cursor-text"
					ref={labelRef}
				>
					{placeholder}
				</label>
				<input
					style={{ width: width }}
					className="textInput h-12 pl-2 border-2  border-bodySecondary/70 rounded text-sm "
					id={placeholder}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					ref={ref}
					autoComplete="off"
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
				/>
			</div>
		);
	}
);

export default TextInput;
