"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const { data: session, status } = useSession();

	return (
		<div id="dashboardPage" className="page min-h-[90vh] max-w-[1240px] w-full p-8 bg-white">
			<div>adasdasd</div>
		</div>
	);
}
