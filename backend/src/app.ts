import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import toDoRoutes from "./routes/todos";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/todos", toDoRoutes);

// To throw 404 error if endpoint found
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});


// typescript, you have to define your variable types for errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});


export default app;