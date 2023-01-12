import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import notesRoutes from "./routes/notes";

const app = express();

app.use(morgan("dev"));

// Only json format allow request from client
app.use(express.json());

// Router
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
	next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = "An unknown error occured";
	if (error instanceof Error) errorMessage = error.message;
	res.status(500).json({ error: errorMessage });
});

export default app;
