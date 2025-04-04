import { Suspense, lazy } from "react";
import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";


const CreateRAOfficerPage = lazy(() =>  import("@/pages/CreateRAOfficerPage"));
const AddForm = lazy(() => import("@/pages/add-forms"));
const  OrganizationPage =lazy(() => import("@/pages/organizations"));
const  RequestPages =lazy(() => import("@/pages/request"));
const  UsersPage =lazy(() => import("@/pages/users"));
function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const others: AppRouteObject[] = [
	{
		path: "organization",
		element: (
			<Wrapper>
				<OrganizationPage/>
			</Wrapper>
		),
		meta: {
			label: "Organizations",
			icon: <Iconify icon="octicon:organization-16" size={20} />,
			key: "/organization",
		},
	 },
	{
		path: "addforms",
		element: (
			<Wrapper>
				<AddForm/>
			</Wrapper>
		),
		meta: {
			label: "Forms",
			icon: <Iconify icon="solar:calendar-bold-duotone" size={20} />,
			key: "/addforms",
		},
	 },
	
	 {
		path: "requests",
		element: (
			<Wrapper>
				<RequestPages/>
			</Wrapper>
		),
		meta: {
			label: "Requests",
			icon: <Iconify icon="charm:git-request" size={20} />,
			key: "/requests",
		},
	 },
	 {
		path: "ra-officers",
		element: (
			<Wrapper>
				<CreateRAOfficerPage/>
			</Wrapper>
		),
		meta: {
			label: "RA-Officers",
			icon: <Iconify icon="grommet-icons:user-admin" size={20} />,
			key: "/ra-officers",
		},
	 },
	 {
		path: "users",
		element: (
			<Wrapper>
				<UsersPage/>
			</Wrapper>
		),
		meta: {
			label: "Users",
			icon: <Iconify icon="mdi:users" size={20} />,
			key: "/users",
		},
	 },
	 
	// {
	// 	path: "addforms",
	// 	element: (
	// 		<Wrapper>
	// 			<AddForm/>
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "AddForms",
	// 		icon: <Iconify icon="solar:calendar-bold-duotone" size={24} />,
	// 		key: "/addforms",
	// 	},
	// },
	// {
	// 	path: "calendar",
	// 	element: (
	// 		<Wrapper>
	// 			<Calendar/>
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.calendar",
	// 		icon: <Iconify icon="solar:calendar-bold-duotone" size={24} />,
	// 		key: "/calendar",
	// 	},
	// },
	// {
	// 	path: "kanban",
	// 	element: (
	// 		<Wrapper>
	// 			<Kanban />
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.kanban",
	// 		icon: <Iconify icon="solar:clipboard-bold-duotone" size={24} />,
	// 		key: "/kanban",
	// 	},
	// },
	// {
	// 	element: (
	// 		<Wrapper>
	// 			<div />
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.disabled",
	// 		icon: (
	// 			<SvgIcon icon="ic_disabled" className="ant-menu-item-icon" size="24" />
	// 		),
	// 		disabled: true,
	// 		key: "/disabled",
	// 	},
	// },
	// {
	// 	path: "label",
	// 	element: (
	// 		<Wrapper>
	// 			<div />
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.label",
	// 		icon: (
	// 			<SvgIcon icon="ic_label" className="ant-menu-item-icon" size="24" />
	// 		),
	// 		suffix: (
	// 			<Tag
	// 				color="cyan"
	// 				icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}
	// 			>
	// 				NEW
	// 			</Tag>
	// 		),
	// 		key: "/label",
	// 	},
	// },
	// {
	// 	path: "frame",
	// 	meta: {
	// 		label: "sys.menu.frame",
	// 		icon: (
	// 			<SvgIcon icon="ic_external" className="ant-menu-item-icon" size="24" />
	// 		),
	// 		key: "/frame",
	// 	},
	// 	children: [
	// 		{
	// 			path: "external_link",
	// 			element: (
	// 				<Wrapper>
	// 					<ExternalLink src="https://ant.design/index-cn" />
	// 				</Wrapper>
	// 			),
	// 			meta: {
	// 				label: "sys.menu.external_link",
	// 				key: "/frame/external_link",
	// 			},
	// 		},
	// 		{
	// 			path: "iframe",
	// 			element: (
	// 				<Wrapper>
	// 					<Iframe src="https://ant.design/index-cn" />
	// 				</Wrapper>
	// 			),
	// 			meta: {
	// 				label: "sys.menu.iframe",
	// 				key: "/frame/iframe",
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	path: "blank",
	// 	element: (
	// 		<Wrapper>
	// 			<Card />
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.blank",
	// 		icon: (
	// 			<SvgIcon icon="ic_blank" className="ant-menu-item-icon" size="24" />
	// 		),
	// 		key: "/blank",
	// 	},
	// },
];

export default others;
