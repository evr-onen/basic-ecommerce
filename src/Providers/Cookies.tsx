"use client";
import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";

const Cookies = ({ children }: { children: React.ReactNode }) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

export default Cookies;
