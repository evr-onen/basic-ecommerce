export type mainHeaderNavPageType = {
	pageType: string;
	pages: PagesType[];
};

export type PagesType = {
	id: number;
	label: string;
	href: string;
};

export type mainFooterPagesType = {
	pageType: string;
	pages: PagesType[];
};

export type AdminSideNavType = {
	label: string;
	subs: SubsType[];
};
export type SubsType = {
	id: number;
	label: string;
	href: string;
	subs: never[];
};
