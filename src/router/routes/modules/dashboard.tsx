import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const HomePage = lazy(() => import("@/pages/functions/workbench"));
const Analysis = lazy(() => import("@/pages/functions/analysis"));

const dashboard: AppRouteObject = {
	order: 1,
	path: "dashboard",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.dashboard",
		icon: (
			<SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />
		),
		key: "/dashboard",
	},
	children: [
		{
			index: true,
			element: <Navigate to="analysis" replace />,
		},
		{
			path: "analysis",
			element: <HomePage />,
			meta: { label: "Analysis", key: "/dashboard/analysis" },
		},
		// {
		// 	path: "analysis",
		// 	element: <Analysis />,
		// 	meta: { label: "sys.menu.analysis", key: "/dashboard/analysis" },
		// },
	],
};

export default dashboard;
