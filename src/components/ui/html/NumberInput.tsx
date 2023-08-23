import React, { ChangeEvent, SetStateAction, useState } from "react";

type PropsType = {
	value: number;
	onChange: React.Dispatch<React.SetStateAction<number>>;
	size?: "sm" | "md";
};
const NumberInput = (props: PropsType) => {
	const { value, onChange, size = "md" } = props;
	const [inputValue, setInputValues] = useState(value);

	const increaseHandler = () => {
		setInputValues(inputValue + 1);
		onChange(inputValue + 1);
	};
	const decreaseHandler = () => {
		if (inputValue > 1) {
			setInputValues(inputValue - 1);
			onChange(inputValue - 1);
		}
	};
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		onChange(newValue);
		setInputValues(newValue);
	};
	console.log(value);
	return (
		<div className="numberInput flex">
			<div
				style={size === "sm" ? { width: "2rem", height: "2rem" } : { width: "3rem", height: "3rem" }}
				className="minus prevent-select mr-2 w-12 h-12 bg-black  text-bodyPrimary flex cursor-pointer hover:bg-black/80"
				onClick={decreaseHandler}
			>
				<p className="m-auto">-</p>
			</div>
			<input
				className="w-12 text-center"
				type="number"
				value={inputValue.toString()}
				onChange={(e) => changeHandler(e)}
			/>
			<div
				style={size === "sm" ? { width: "2rem", height: "2rem" } : { width: "3rem", height: "3rem" }}
				className="plus prevent-select ml-2 w-12 h-12 bg-black  text-bodyPrimary  flex cursor-pointer hover:bg-black/80"
				onClick={increaseHandler}
			>
				<p className="m-auto">+</p>
			</div>
		</div>
	);
};
export default NumberInput;
