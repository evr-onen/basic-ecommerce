"use client";
// ** Core
import React, { useRef, useState } from "react";
import Link from "next/link";

// ** Reusable Components
import TextInput from "@/components/ui/html/TextInput";

const Page = () => {
	const ref = useRef(null);

	// ** States
	const [username, setUsername] = useState("John");
	const [lastName, setLastName] = useState("Doe");
	const [password, setPassword] = useState("");
	const [passwordConf, setPasswordConf] = useState("");

	// ** Handler
	const submitHandler = () => {
		if (password === passwordConf && password !== "") {
		} else {
			console.log("the password didnt match or need fill password label");
		}
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center bg-bodyPrimary">
			<div className="mb-12">
				<h1>LOGO</h1>
			</div>
			<div className="bg-white p-12 flex flex-col justify-center items-center max-w-[420px] w-full rounded-md">
				<div className="head mb-4">
					<h2 className="font-bold text-center">Sign Up</h2>
					<p className="text-primary text-sm">Welcome & Join us by creating a free account !</p>
				</div>
				<div className="content w-full  mt-3">
					<TextInput placeholder="Username" ref={ref} value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="content w-full  mt-3">
					<TextInput placeholder="Last Name" ref={ref} value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</div>

				<div className="content w-full mt-3">
					<TextInput
						type="password"
						placeholder="Password"
						ref={ref}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="content w-full mt-3">
					<TextInput
						type="password"
						placeholder="Password Confirmation"
						ref={ref}
						value={passwordConf}
						onChange={(e) => setPasswordConf(e.target.value)}
					/>
				</div>
				<button
					className="bg-primary text-bodyPrimary w-full rounded-lg hover:opacity-80 mt-4 p-4 uppercase font-bold"
					onClick={submitHandler}
				>
					Create Account
				</button>
				<p className="capitalize text-sm mt-4">
					Already have an account?
					<Link className="ml-1 text-primary font-bold hover:opacity-80" href="/sign-in">
						Sign In!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Page;
