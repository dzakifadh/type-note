import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import notesRoutes from "./routes/notes";

const app = express();

app.use(cors());

app.use(morgan("dev"));

// Only json format allow request from client
app.use(express.json());

// Router
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
	next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = "An unknown error occured";
	let statusCode = 500;

	// if (error instanceof Error) errorMessage = error.message;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
});

export default app;
