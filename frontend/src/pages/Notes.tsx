import { useAuthContext } from "../context/authContext";

const Notes = () => {
	const { signOut: signOutContext } = useAuthContext();

	const signOut = () => {
		signOutContext();
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
