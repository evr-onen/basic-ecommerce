import MainHeader from "@/components/sections/MainHeader";
import MainFooter from "@/components/sections/MainFooter";
import Providers from "@/Providers";
import "@/styles/main.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<body className="flex flex-col items-center relative bg-white ">
				<Providers>
					<MainHeader />
					{children}
					<MainFooter />
				</Providers>
			</body>
		</html>
	);
}
