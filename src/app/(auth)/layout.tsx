// ** Style
import "@/styles/main.css";

// ** Providers
import Providers from "@/Providers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="flex flex-col items-center ">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
