import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className="flex h-screen items-center justify-center dark:bg-dark dark:text-white">
			<div className="text-center">
				<h1 className="text-3xl">
					Welcome to <span className="font-bold">Notepad Web</span>
				</h1>
				<Link
					to="/notes"
					className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 px-6 duration-300 hover:bg-blue-700"
				>
					{/* <PencilIcon className="fill-white" /> New Note */}
				</Link>
			</div>
		</div>
	);
};

export default Welcome;
