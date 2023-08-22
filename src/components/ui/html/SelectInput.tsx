"use client";
import React, { useRef, forwardRef, useId, useEffect, useState, LabelHTMLAttributes, DetailedHTMLProps } from "react";

interface PropsType {
	type?: string;
	placeholder?: string;
	name?: string;
	width?: string;
	className?: string;
	options: { id: number; label: string }[] | [];
	value: { id: number; label: string } | null;
	onChange: React.Dispatch<
		React.SetStateAction<{
			id: number;
			label: string;
		} | null>
	>;
}

const SelectInput = forwardRef<HTMLDivElement, PropsType>(
	(
		{ className = "", type = "text", placeholder = "", name = "", value, onChange, width = "100%", options }: PropsType,
		ref
	) => {
		const [optionItems, setOptionItems] = useState<{ id: number; label: string }[] | []>(options);
		const [isFocus, setIsFocus] = useState(false);

		return (
			<div className={`selectInputWrapper flex flex-col relative mt-3 min-w-[140px] w-full ${className}`} ref={ref}>
				<label className="">{placeholder}</label>
				<select
					style={{ width: width }}
					className="selectInput"
					id={name}
					value={value?.id?.toString()}
					onChange={(e) => {
						onChange({
							id: Number(e.target.value),
							label: e.target.options[e.target.selectedIndex].text,
						});
					}}
				>
					<option className="" hidden>
						Please Choose
					</option>
					{optionItems.map((item) => (
						<option key={item.id} className="" value={item.id}>
							{item.label}
						</option>
					))}
				</select>
			</div>
		);
	}
);

export default SelectInput;
