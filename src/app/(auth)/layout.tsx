// ** Style
import "@/styles/main.css";

// ** Providers
import Providers from "@/Providers";

export default async function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
	return (
		<html lang="en">
			<body className="flex flex-col items-center ">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
