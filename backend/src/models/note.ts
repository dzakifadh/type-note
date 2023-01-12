import { model, Schema } from "mongoose";

interface INote {
	title: string;
	text: string;
}

const noteSchema = new Schema<INote>(
	{
		title: { type: String, required: true },
		text: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<INote>("Note", noteSchema);
