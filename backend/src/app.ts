import MongoStore from "connect-mongo";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import { requiresAuth } from "./middleware/auth";
import notesRoutes from "./routes/notes";
import usersRoutes from "./routes/users";
import env from "./utils/validateEnv";

const app = express();

const whitelist: string[] = ["http://localhost:3000"];

app.use(
	cors({
		origin: (origin, callback) => {
			if (origin) {
				if (whitelist.indexOf(origin) !== -1 || !origin) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			} else {
				// if origin undefined it's mean come from postman
				// If request come from postman
				callback(null, false);
			}
		},
		methods: ["POST", "PUT", "GET", "DELETE", "HEAD", "OPTIONS"],
		credentials: true,
	})
);

app.use(morgan("dev"));

// Only json format allow request from client
app.use(express.json());

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 60 minute
		},
		rolling: true,
		store: MongoStore.create({
			mongoUrl: env.MONGO_CONNECTION_STRING,
		}),
	})
);

// Router
app.use("/api/notes", requiresAuth, notesRoutes);
app.use("/api/users", usersRoutes);

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
