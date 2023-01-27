/* eslint-disable @typescript-eslint/no-empty-function */
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeCookie } from "typescript-cookie";
import { AuthContextType, ISignIn, IUser } from "../@types/auth";
import * as AuthService from "../services/auth";

interface ContextProviderProps {
	children: ReactNode;
}

const defaultValue = {
	authInformation: {
		_id: "",
		username: "",
		email: "",
		auth: false,
		isLoading: false,
	},
	handleUser: () => {},
	signIn: () => {},
	signOut: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: ContextProviderProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [user, setUser] = useState<IUser>();
	const [auth, setAuth] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const onRefresh = async () => {
		try {
			const userInformation = await AuthService.getUserInformation();
			setIsLoading(false);
			setAuth(true);
			return userInformation;
		} catch (error) {
			setAuth(false);
			return Promise.reject();
		}
	};

	const handleUser = (userValue: IUser) => {
		const { _id, username, email } = userValue;
		setUser({
			_id,
			username,
			email,
		});
	};

	const signIn = async (input: ISignIn) => {
		try {
			await AuthService.signIn(input);
			const userInformation = await AuthService.getUserInformation();
			setIsLoading(false);
			setAuth(true);
			handleUser(userInformation.data);
		} catch (error) {
			return Promise.reject();
		}
	};

	const signOut = async () => {
		try {
			await AuthService.signOut();
			removeCookie("notex");
			navigate("/sign-in");
		} catch (error) {
			return Promise.reject();
		}
	};

	const contextValue = {
		authInformation: { ...user, auth, isLoading },
		signIn,
		signOut,
	};

	useEffect(() => {
		if (pathname !== "/sign-in" && pathname !== "/") {
			onRefresh();
		}
	}, []);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
