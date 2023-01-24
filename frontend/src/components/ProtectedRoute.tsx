import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoute {
	isAllowed: boolean;
	redirectPath?: string;
	children?: JSX.Element;
}

const ProtectedRoute = ({
	isAllowed,
	redirectPath = "/sign-in",
	children,
}: IProtectedRoute) => {
	console.log("PROTECTED", isAllowed);

	if (!isAllowed) {
		setTimeout(() => {
			return <Navigate to={redirectPath} replace />;
		}, 500);
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
