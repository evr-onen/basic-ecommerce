// ** Components
import MainHeader from "@/components/sections/MainHeader";
import MainFooter from "@/components/sections/MainFooter";

// ** Providers
import Providers from "@/Providers";

// ** Style
import "@/styles/main.css";
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
	return (
		<html lang="en">
			<body className={`flex flex-col items-center relative bg-white min-h-[70vh] `}>
				<Providers>
					<MainHeader />
					{children}
					<MainFooter />
				</Providers>
			</body>
		</html>
	);
}
