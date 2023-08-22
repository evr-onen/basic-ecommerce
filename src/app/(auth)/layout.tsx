import "@/styles/main.css";
import Providers from "@/Providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<body className="flex flex-col items-center ">
				{/* {children} */}
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
