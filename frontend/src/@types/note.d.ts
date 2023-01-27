export interface INote {
	_id: string;
	title: string;
	text?: string;
	createdAt: string;
	updatedAt: string;
}

export interface INoteInput {
	title: string;
	text?: string;
}
