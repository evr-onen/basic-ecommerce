// ** Core
import React, { useState } from "react";

// ** Components
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const ModalAuth = () => {
	const [tabIndex, setTabIndex] = useState<number>(0);

	return (
		<div className="modalAuthWrapper w-full bg-white">
			<div className="tabs flex ">
				<span
					className={`login ${tabIndex === 0 ? "bg-white" : "bg-bodyPrimary "} flex-1 cursor-pointer`}
					onClick={() => setTabIndex(0)}
				>
					<p className="text-center p-4 font-semibold text-sm uppercase tracking-widest">Login</p>
				</span>
				<span
					className={`register ${tabIndex === 1 ? "bg-white" : "bg-bodyPrimary"} flex-1 cursor-pointer`}
					onClick={() => setTabIndex(1)}
				>
					<p className="text-center p-4 font-semibold text-sm uppercase tracking-widest">Register</p>
				</span>
			</div>
			<div className="tabContent p-4 text-black/50;">
				<div className={`loginContent ${tabIndex === 0 ? "flex" : "hidden"}  flex-col`}>
					<SignIn />
				</div>
				<div className={`registerContent ${tabIndex === 1 ? "flex" : "hidden "} py-4 flex-col mt-4`}>
					<SignUp />
				</div>
			</div>
		</div>
	);
};

export default ModalAuth;
