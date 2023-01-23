import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true },
		title: { type: String, required: true },
		text: { type: String, required: true },
	},
	{ timestamps: true }
);

type INote = InferSchemaType<typeof noteSchema>;

export default model<INote>("Note", noteSchema);
