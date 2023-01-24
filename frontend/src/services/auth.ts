import { ISignIn } from "../@types/note";
import { default as axios } from "../config/axios";

export const signIn = async (auth: ISignIn) => {
	const res = await axios.post("users/sign-in", auth);
	return res;
};

export const signOut = async () => {
	const res = await axios.post("users/sign-out", null);
	return res;
};

export const getUserInformation = async () => {
	const res = await axios.get("users");
	return res;
};
