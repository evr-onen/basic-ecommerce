"use client";
// ** Core
import React, { forwardRef, useState } from "react";

// ** Types
interface PropsType {
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

const SelectInput = forwardRef<HTMLDivElement, PropsType>((props: PropsType, ref) => {
	const { className = "", placeholder = "", name = "", value, onChange, width = "100%", options } = props;
	// ** States
	const [optionItems, setOptionItems] = useState<{ id: number; label: string }[] | []>(options);

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
});
SelectInput.displayName = "SelectInput";
export default SelectInput;
