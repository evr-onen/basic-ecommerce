import { Catamaran, Montserrat } from "next/font/google";

import AdminSideNav from "@/components/ui/AdminSideNav";
import "@/styles/main.css";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Link from "next/link";
import Providers from "@/Providers";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import SideNavMenu from "@/components/sections/SideNavMenu";

const catamaran = Catamaran({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<html lang="en">
			<body className={`flex flex-col items-center ${(catamaran.className, montserrat.className)} `}>
				<Providers>
					<div id="adminHeader" className="h-[5vh] w-full  flex items-center justify-between">
						<div className="logo xl:min-w-[300px] md:min-w-[200px] min-w-[200px]  items-center bg-bodySecondary h-full hidden sm:flex">
							<p className="text-center min-w-full block  text-white">
								<Link href="/">LOGO</Link>
							</p>
						</div>
						<div className=" xl:max-w-[calc(100%-300px)] md:max-w-[calc(100%-200px)]  w-full shadowBottom h-full flex items-center bg md:pl-12 pl-4 bg-white ">
							<SideNavMenu />
							<BreadCrumbs />
						</div>
					</div>
					<div id="adminContentSection" className="min-h-[95vh] w-full flex justify-between ">
						<div className="sideNav md:min-w-[200px] xl:min-w-[300px] shadow bg-bodySecondary hidden md:block">
							<AdminSideNav />
						</div>
						<div className="adminContent w-full xl:p-12 p-6">{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
