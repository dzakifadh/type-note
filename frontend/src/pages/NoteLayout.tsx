import { Avatar } from "@boringer-avatars/react";
import {
	faAngleDown,
	faArrowLeftLong,
	faBarsStaggered,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import useSWR from "swr";
import { INote } from "../@types/note";
import LoadingPage from "../components/LoadingPage";
import NoteCard from "../components/NoteCard";
import SearchForm from "../components/SearchForm";
import * as NoteService from "../services/note";

const NoteLayout = () => {
	const {
		data: notesData,
		error: notesError,
		isLoading: notesIsLoading,
	} = useSWR("/", NoteService.getNotes);

	console.log("NoteLayout", notesError);

	if (notesError)
		return (
			<div className="flex h-screen items-center justify-center">
				{notesError.response.data.error
					? `${notesError.response.data.error} 😎`
					: "Failed to load 🥹"}
			</div>
		);
	if (notesIsLoading) return <LoadingPage />;

	return (
		<>
			<section className="flex h-screen text-white">
				<aside className="overlay-bottom h-screen w-96 flex-shrink-0 overflow-auto p-4 dark:bg-dark-10">
					{notesIsLoading ? (
						<div className="absolute inset-0 flex items-center justify-center gap-3">
							<div className="spinner"></div>
							<p>Loading</p>
						</div>
					) : (
						<>
							{!notesData?.data && (
								<div className="absolute inset-0 flex items-center justify-center">
									<p className="text-lg text-gray-100/90">Note Empty 🥹</p>
								</div>
							)}
							<div className="mb-4 flex justify-between">
								<Link
									to="/notes"
									className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300 dark:bg-neutral-700 dark:hover:bg-neutral-700/80"
								>
									<FontAwesomeIcon
										icon={faArrowLeftLong}
										className="h-4 w-4 text-white"
									/>
									Go Back
								</Link>
								<Link
									to="/notes/create"
									className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium duration-300 hover:bg-blue-700"
								>
									<FontAwesomeIcon
										icon={faPlus}
										className="h-4 w-4 text-white"
									/>
									Create
								</Link>
							</div>
							<SearchForm />
							<div className="mt-4 mb-6">
								<h5 className="mb-3 font-medium text-slate-200/50">
									Filter by tag
								</h5>
								<div className="flex flex-wrap gap-1.5">
									<span className="badge">NodeJS</span>
									<span className="badge">Laravel</span>
									<span className="badge">HTML</span>
									<span className="badge">PostgreSQL</span>
									<span className="badge">CSS</span>
									<span className="badge">Go</span>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								{notesData?.data.map((note: INote) => (
									<NoteCard key={note._id} note={note} />
								))}
							</div>
						</>
					)}
				</aside>
				<main className="flex-1 overflow-y-auto dark:bg-dark">
					<nav className="sticky top-0 flex items-center justify-between bg-dark-20 py-4 px-6 dark:shadow dark:shadow-dark">
						<FontAwesomeIcon
							icon={faBarsStaggered}
							className="h-6 w-6 text-white"
						/>
						<div className="inline-flex items-center gap-1.5">
							<Avatar
								title={false}
								size={34}
								variant="beam"
								name="Mary Baker"
								square={false}
								colors={["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"]}
							/>
							<FontAwesomeIcon
								icon={faAngleDown}
								className="h-3.5 w-3.5 text-white"
							/>
						</div>
					</nav>
					<div className="p-8">
						<Outlet />
					</div>
				</main>
				<aside className="w-72 flex-shrink-0 dark:bg-dark-10"></aside>
			</section>
		</>
	);
};

export default NoteLayout;
