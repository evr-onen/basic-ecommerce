// ** Components
import MainHeader from "@/components/sections/MainHeader";
import MainFooter from "@/components/sections/MainFooter";

// ** Providers
import Providers from "@/Providers";

// ** Style
import "@/styles/main.css";

export default async function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
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
