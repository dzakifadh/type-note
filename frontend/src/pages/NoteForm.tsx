import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSWRConfig } from "swr";
import { INoteInput } from "../@types/note";
import WarningIcon from "../components/icons/WarningIcon";
import * as NoteService from "../services/note";
import "../style/quilljs-custom.css";

const NoteForm = () => {
	const { mutate } = useSWRConfig();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<INoteInput>({
		reValidateMode: "onBlur",
	});

	const handleOnSubmit = async (input: INoteInput) => {
		try {
			await NoteService.createNote(input);
			reset({ title: "", text: "" });
			setQuillText("");
			mutate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const [quillText, setQuillText] = useState<string>();

	return (
		<>
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
							required: "Please enter note (text) detail",
						}}
						render={({ field: { onChange, onBlur, value, ref } }) => (
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
							<WarningIcon />
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
