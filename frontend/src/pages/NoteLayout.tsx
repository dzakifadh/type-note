import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import SearchForm from "../components/SearchForm";
import { Note as NoteModel } from "../models/notes";
// import NoteCard from "./components/NoteCard";
// import SearchForm from "./components/SearchForm";
// import { Note as NoteModel } from "./models/notes";
// import Note from "./pages/Note";
import * as NoteService from "../services/note";

const NoteLayout = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);

	const getNotes = async () => {
		try {
			const resultNotes = await NoteService.getNote();
			setNotes(resultNotes.data);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	return (
		<section className="flex h-screen text-white">
			<aside className="dark:bg-dark-10 w-96 flex-shrink-0 p-4">
				<SearchForm />
				Tags
				<div className="flex flex-col gap-4">
					{notes.map((note) => (
						<NoteCard key={note._id} note={note} />
					))}
				</div>
			</aside>
			<main className="p-8 bg-dark flex-1">
				<Outlet />
			</main>
			<aside className="w-72 bg-dark-10 flex-shrink-0"></aside>
		</section>
	);
};

export default NoteLayout;
