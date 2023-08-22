// ** Core
import React, { useState } from "react";

// ** Auth they will use
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const SignUp = () => {
	// ** States
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConf, setPasswordConf] = useState("");

	return (
		<>
			<div className="username mt-4">
				<input
					className="authInput"
					type="text"
					placeholder="User Name"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="email mt-4">
				<input
					className="authInput"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
			<div className="password mt-4">
				<input
					className="authInput"
					type="text"
					placeholder="Repeat Password"
					value={passwordConf}
					onChange={(e) => setPasswordConf(e.target.value)}
				/>
			</div>
			<button className="w-full uppercase tracking-widest bg-black p-4 text-bodyPrimary mt-8">Register</button>
		</>
	);
};

export default SignUp;
