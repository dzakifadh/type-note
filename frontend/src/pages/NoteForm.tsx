import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { INoteInput } from "../@types/note";
import { WarningIcon } from "../components/icons";
import * as NoteService from "../services/note";
import "../style/quilljs-custom.css";

type INoteparams = {
	id: string;
};

const NoteForm = () => {
	const { mutate } = useSWRConfig();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { id: urlId } = useParams<INoteparams>();

	const {
		data: noteData,
		error: noteError,
		isLoading: noteIsLoading,
	} = useSWR(urlId ? urlId : null, NoteService.getNote);

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<INoteInput>({
		reValidateMode: "onBlur",
	});

	const handleOnSubmit = async (input: INoteInput) => {
		try {
			if (action === "create") {
				await NoteService.createNote(input);
			} else {
				await NoteService.updateNote(input, urlId);
			}
			reset({ title: "", text: "" });
			setQuillText("");
			mutate("/");
			navigate(`/notes/${urlId}`);
		} catch (error) {
			console.log(error);
		}
	};

	const [action, setAction] = useState<string>("");
	const [quillText, setQuillText] = useState<string>();

	useEffect(() => {
		setAction(pathname.split("/")[2]);
	}, [pathname]);

	useEffect(() => {
		if (noteData && action === "update" && urlId) {
			setValue("title", noteData.data.title);
			setValue("text", noteData.data.text);
			setQuillText(noteData.data.text);
		}
	}, [noteData, action, urlId]);

	if (noteError)
		return (
			<div className="flex h-full items-center justify-center">
				Failed to load 🥹
			</div>
		);
	if (noteIsLoading)
		return (
			<div className="flex h-full items-center justify-center">Loading...</div>
		);

	return (
		<>
			<h1 className="mb-10 text-4xl font-bold">
				{action === "create" ? "Create Note" : null}
				{action === "update" ? "Update Note" : null}
			</h1>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="mb-6">
					<label
						htmlFor="title"
						className="mb-2 inline-block font-medium tracking-wide"
					>
						Title
					</label>
					<input
						type="text"
						className="form-input block w-full rounded-lg px-3 py-2 dark:border dark:border-dark-30 dark:bg-dark-30"
						placeholder="Type title here..."
						{...register("title", { required: "Please enter note title" })}
					/>
					{errors.title && (
						<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
							<WarningIcon color="fill-amber-400" className="h-4 w-4" />
							{errors.title.message}
						</span>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="text"
						className="mb-2 inline-block font-medium tracking-wide"
					>
						Text
					</label>

					<Controller
						control={control}
						name="text"
						rules={{
							required: "Please enter note (text) detail",
						}}
						render={({ field: { onChange, onBlur } }) => (
							<ReactQuill
								theme="snow"
								onBlur={(content: ReactQuill.Range) => {
									if (content?.index !== undefined && content.index > 0) {
										onBlur();
									}
								}}
								onChange={(content) => {
									if (content !== "<p><br></p>" || !content) {
										onChange(content);
										setQuillText(content);
									} else {
										onChange("");
										setQuillText("");
									}
								}}
								placeholder="Type text here..."
								value={quillText}
								modules={{
									toolbar: [
										["bold", "italic", "underline", "strike"],
										["blockquote", "code-block"],
										["link", "image"],

										[{ header: 1 }, { header: 2 }],
										[{ list: "ordered" }, { list: "bullet" }],
										[{ script: "sub" }, { script: "super" }],
										[{ indent: "-1" }, { indent: "+1" }],
										[{ direction: "rtl" }],

										[{ size: ["small", false, "large", "huge"] }],
										[{ header: [1, 2, 3, 4, 5, 6, false] }],

										[{ color: [] }, { background: [] }],
										[{ align: [] }],

										["clean"],
									],
								}}
							/>
						)}
					/>

					{errors.text && (
						<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
							<WarningIcon color="fill-amber-400" className="h-4 w-4" />
							{errors.text.message}
						</span>
					)}
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={isSubmitting}
						className="rounded-lg bg-blue-600 py-3 px-6 duration-300 hover:bg-blue-700 disabled:cursor-wait disabled:bg-gray-200/20"
					>
						Save
					</button>
				</div>
			</form>
		</>
	);
};

export default NoteForm;
