import { Outlet } from "react-router-dom";
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
					<nav className="sticky top-0 bg-dark-20 py-5 px-6 dark:shadow dark:shadow-dark">
						Navbar
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
