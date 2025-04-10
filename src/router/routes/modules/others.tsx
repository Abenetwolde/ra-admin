import { Suspense, lazy } from "react";
import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";


const CreateUsersOfficerPage = lazy(() =>  import("@/pages/CreateRAOfficerPage"));
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
		path: "ra-users",
		element: (
			<Wrapper>
				<CreateUsersOfficerPage/>
			</Wrapper>
		),
		meta: {
			label: "RA-Users",
			icon: <Iconify icon="grommet-icons:user-admin" size={20} />,
			key: "/ra-users",
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
	 

];

export default others;
