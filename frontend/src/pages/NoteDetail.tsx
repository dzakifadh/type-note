import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WarningIcon from "../components/icons/WarningIcon";
import { NoteInput } from "../models/notes";
import * as NoteService from "../services/note";
import "../style/quilljs-custom.css";

const NoteDetail = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<NoteInput>();

	const handleOnSubmit = async (input: NoteInput) => {
		console.log("INPUT", input);
		return false;

		try {
			const noteRes = await NoteService.createNote(input);
		} catch (error) {
			console.log(error);
		}
	};

	const [quillText, setQuillText] = useState<string>();

	return (
		<div>
			<h1 className="mb-10 text-4xl font-bold">Note Details</h1>
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
							<WarningIcon />
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
							required: "Please enter note detail",
						}}
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<ReactQuill
								theme="snow"
								value={quillText}
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
								modules={{
									toolbar: [
										["bold", "italic", "underline", "strike"], // toggled buttons
										["blockquote", "code-block"],

										[{ header: 1 }, { header: 2 }], // custom button values
										[{ list: "ordered" }, { list: "bullet" }],
										[{ script: "sub" }, { script: "super" }], // superscript/subscript
										[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
										[{ direction: "rtl" }], // text direction

										[{ size: ["small", false, "large", "huge"] }], // custom dropdown
										[{ header: [1, 2, 3, 4, 5, 6, false] }],

										[{ color: [] }, { background: [] }], // dropdown with defaults from theme
										[{ font: [] }],
										[{ align: [] }],

										["clean"], // remove formatting button
									],
								}}
							/>
						)}
					/>

					{errors.text && (
						<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
							<WarningIcon />
							{errors.text.message}
						</span>
					)}
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="rounded-lg bg-blue-600 py-3 px-6 duration-300 hover:bg-blue-700"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default NoteDetail;
