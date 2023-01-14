import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import SearchForm from "../components/SearchForm";
import { Note as NoteModel } from "../models/notes";
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
			<aside className="w-96 flex-shrink-0 p-4 dark:bg-dark-10">
				<SearchForm />
				Tags
				<div className="flex flex-col gap-4">
					{notes.map((note) => (
						<NoteCard key={note._id} note={note} />
					))}
				</div>
			</aside>
			<main className="flex-1 bg-dark p-8">
				<Outlet />
			</main>
			<aside className="w-72 flex-shrink-0 bg-dark-10"></aside>
		</section>
	);
};

export default NoteLayout;
