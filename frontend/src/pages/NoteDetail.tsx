import { AxiosError } from "axios";
import HTMLReactParser from "html-react-parser";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INote } from "../@types/note";
import * as NoteService from "../services/note";

type INoteparams = {
	id: string;
};

const NoteDetail = () => {
	const [note, setNote] = useState<INote>();
	const { id: urlId } = useParams<INoteparams>();

	const getNote = async (id?: string) => {
		try {
			const resultNotes = await NoteService.getNote(id);
			setNote(resultNotes.data);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		}
	};

	useLayoutEffect(() => {
		getNote(urlId);
	}, [urlId]);

	return (
		<>
			<h1 className="mb-10 text-4xl font-bold">Note Details</h1>
			<h2 className="mb-4 text-3xl font-semibold">{note?.title}</h2>
			<div className="prose prose-p:text-white">
				{note?.text && HTMLReactParser(note.text)}
			</div>
		</>
	);
};

export default NoteDetail;
