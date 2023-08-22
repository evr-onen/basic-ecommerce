import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const { username, password } = credentials as { username: string; password: string };

				if (username === "admin" && password === "1234") {
					return { id: "1", name: "admin", email: "admin@example.com" };
				} else {
					throw new Error("Invalid Credentials");
				}
			},
		}),
	],
	pages: {
		signIn: "/sign-in",
	},
};
