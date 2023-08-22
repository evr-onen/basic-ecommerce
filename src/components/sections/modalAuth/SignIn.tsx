// ** Core
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// ** Next-Auth
import { signIn } from "next-auth/react";

const SignIn = () => {
	// ** States
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState<string | null>(null);

	// ** Hooks
	const router = useRouter();

	// ** Handlers
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

	return (
		<>
			<div className="relative top-0 bg-error w-full text-center text-white">{errMessage}</div>
			<div className="username  mt-4">
				<input
					className="authInput"
					type="text"
					placeholder="User Name"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="password mt-4">
				<input
					className="authInput"
					type="text"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button className="w-full uppercase tracking-widest bg-black p-4 text-bodyPrimary mt-8" onClick={handleSignIn}>
				login
			</button>
		</>
	);
};

export default SignIn;
