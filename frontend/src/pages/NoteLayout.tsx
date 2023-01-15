import { Outlet } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import SearchForm from "../components/SearchForm";
import { useNoteContext } from "../context/noteContext";

const NoteLayout = () => {
	const noteContext = useNoteContext();

	return (
		<section className="flex h-screen text-white">
			<aside className="overlay-bottom h-screen w-96 flex-shrink-0 overflow-auto p-4 dark:bg-dark-10">
				{!noteContext?.notes.length && (
					<div className="absolute inset-0 flex items-center justify-center">
						<p className="text-lg text-gray-100/90">Note Empty 🥹</p>
					</div>
				)}
				<SearchForm />
				Tags
				<div className="flex flex-col gap-4">
					{noteContext?.notes.map((note) => (
						<NoteCard key={note._id} note={note} />
					))}
				</div>
			</aside>
			<main className="flex-1 p-8 dark:bg-dark">
				<Outlet />
			</main>
			<aside className="w-72 flex-shrink-0 dark:bg-dark-10"></aside>
		</section>
	);
};

export default NoteLayout;
