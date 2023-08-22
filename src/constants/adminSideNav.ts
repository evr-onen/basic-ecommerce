export const adminSideNav = [
	{
		label: "Dashboard",
		subs: [
			{
				id: 1,
				label: "Dashboard",
				href: "/dashboard/welcome",
				subs: [],
			},
		],
	},
	{
		label: "Product",
		subs: [
			{
				id: 1,
				label: "List",
				href: "/dashboard/product/list",
				subs: [],
			},
			{
				id: 2,
				label: "Create Edit",
				href: "/dashboard/product/create",
				subs: [],
			},
		],
	},
	{
		label: "Category",
		subs: [
			{
				id: 1,
				label: "List",
				href: "/dashboard/category/list",
				subs: [],
			},
			{
				id: 2,
				label: "Create Edit",
				href: "/dashboard/category/create",
				subs: [],
			},
		],
	},
	{
		label: "Options",
		subs: [
			{
				id: 1,
				label: "General",
				href: "/dashboard/category/list",
				subs: [],
			},
			{
				id: 2,
				label: "Slider Options",
				href: "/dashboard/category/create",
				subs: [],
			},
		],
	},
];
