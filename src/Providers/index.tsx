import React from "react";
import NextAuthProvider from "./NextAuth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Cookies from "./Cookies";
const index = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions);

	return (
		<NextAuthProvider session={session}>
			<Cookies>{children}</Cookies>
		</NextAuthProvider>
	);
};

export default index;
