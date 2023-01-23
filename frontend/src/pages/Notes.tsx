import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../services/auth";

const Notes = () => {
	const navigate = useNavigate();

	const signOut = async () => {
		try {
			await AuthService.signOut();
			navigate(`/sign-in`);
		} catch (error) {
			const err = error as AxiosError;

			console.log("Heheh", err);

			// if (axios.isAxiosError(err)) {
			// 	const errorMessage = err.response?.data;
			// 	setError("credentialError", {
			// 		type: "custom",
			// 		message: errorMessage.error,
			// 	});
			// }
		}
	};
	return (
		<div className="flex h-screen items-center justify-center dark:bg-dark dark:text-white">
			<div>
				<h1>Notes Cards Here!</h1>
				<button
					onClick={signOut}
					className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
				>
					Sign Out
				</button>
			</div>
		</div>
	);
};

export default Notes;
