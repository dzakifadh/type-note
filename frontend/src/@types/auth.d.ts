export interface IUser {
	_id?: string;
	username?: string;
	email?: string;
}

export interface ISignIn {
	username: string;
	password: string;
	credentialError?: () => void;
}

export interface IAuthInformation extends IUser {
	auth: boolean;
	isLoading: boolean;
}

export type AuthContextType = {
	authInformation: IAuthInformation;
	signIn: (input: ISignIn) => void;
	signOut: () => void;
};
