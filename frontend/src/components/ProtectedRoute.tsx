import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

interface IProtectedRoute {
	isAllowed: boolean;
	isLoading: boolean;
	redirectPath?: string;
	children?: JSX.Element;
}

const ProtectedRoute = ({
	isAllowed,
	redirectPath = "/sign-in",
	isLoading = true,
	children,
}: IProtectedRoute) => {
	console.log("PROTECTED isAllowed", isAllowed);
	console.log("PROTECTED isLoading", isLoading);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
