export interface IUser {
	_id?: string;
	username?: string;
	email?: string;
}

export interface IAuthInformation extends IUser {
	auth: boolean;
}

export type AuthContextType = {
	authInformation: IAuthInformation;
	handleAuth: (userValue: IUser) => void;
};
