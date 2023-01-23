import axios from "axios";
import { ISignIn } from "../@types/note";

export const signIn = async (auth: ISignIn) => {
	const res = await axios.post(
		"http://localhost:8080/api/users/sign-in",
		auth,
		{
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		}
	);
	return res;
};

export const signOut = async () => {
	const res = await axios.post(
		"http://localhost:8080/api/users/sign-out",
		null,
		{
			withCredentials: true,
		}
	);
	return res;
};
