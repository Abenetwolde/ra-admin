import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useUserToken } from "@/store/userStore";

import PageError from "@/pages/sys/error/PageError";
import { useRouter } from "../hooks";
import { useSelector } from "react-redux";

type Props = {
	children: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
	const router = useRouter();
const userState=useSelector((state:any)=>state.user);

	const check = useCallback(() => {
		if (!userState.token) {
			router.replace("/login");
		}
	}, [router, userState?.token]);

	useEffect(() => {
		check();
	}, [check]);

	return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
