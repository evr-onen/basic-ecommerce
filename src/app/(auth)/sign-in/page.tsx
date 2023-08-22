"use client";
import TextInput from "@/components/ui/html/TextInput";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
	const ref = useRef(null);
	const [username, setUsername] = useState("admin");
	const [password, setPassword] = useState("1234");
	const [errMessage, setErrMessage] = useState<string | null>(null);
	const { data: session, status } = useSession();

	const router = useRouter();
	const handleSignIn = async () => {
		try {
			const response = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});
			console.log(response);
			if (response?.error === null) {
				router.push("/dashboard/welcome");
			} else {
				setErrMessage(response?.error!);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	router.push("/");
	// }, [status]);

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center bg-bodyPrimary">
			<span className="mb-12">
				<h1>LOGO</h1>
			</span>
			<div className="bg-white p-12 flex flex-col justify-center items-center max-w-[420px] w-full rounded-md relative">
				{errMessage && (
					<span className="p-2 rounded-md w-3/4 text-center bg-error text-bodyPrimary absolute top-4">
						{errMessage}
					</span>
				)}
				<div className="head mt-4">
					<h2 className="font-bold">Sign In</h2>
					<p></p>
				</div>
				<div className="content w-full  ">
					<TextInput placeholder="Username" ref={ref} value={username} onChange={(e) => setUsername(e.target.value)} />
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
				<button
					className="bg-primary text-bodyPrimary w-full rounded-lg hover:opacity-80 mt-4 p-4 uppercase font-bold"
					onClick={handleSignIn}
				>
					Log in
				</button>
				<p className="capitalize text-sm mt-4">
					dont have an account?
					<Link className="ml-1 text-primary font-bold hover:opacity-80" href="/sign-up">
						Sign Up!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Page;
