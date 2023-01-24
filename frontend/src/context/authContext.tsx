import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useCookies } from "react-cookie";
import { AuthContextType, IUser } from "../@types/auth";
import { isObjectEmpty } from "../utils";

interface ContextProviderProps {
	children: ReactNode;
}

const defaultValue = {
	authInformation: {
		_id: "",
		username: "",
		email: "",
		auth: false,
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handleAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: ContextProviderProps) => {
	const [user, setUser] = useState<IUser>();
	const [auth, setAuth] = useState<boolean>(false);
	const [cookies, setCookie] = useCookies(["notex"]);

	useEffect(() => {
		if (!isObjectEmpty(cookies)) {
			setAuth(cookies.notex.auth);
			setUser(cookies.notex.user);
		}
	}, []);

	useEffect(() => {
		setCookie("notex", {
			auth,
			user,
		});
	}, [auth, user]);

	const handleAuth = (userValue: IUser) => {
		const { _id, username, email } = userValue;
		if (_id && username && email) {
			setAuth(true);
		}
		setUser({
			_id,
			username,
			email,
		});
	};

	const contextValue = {
		authInformation: { ...user, auth },
		handleAuth,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
