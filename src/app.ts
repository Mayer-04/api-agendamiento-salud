import express, { type Request, type Response } from "express";

const app = express();

app.disable("x-powered-by");

app.get("/health", (req: Request, res: Response) => {
  res.send("Hola");
});

export default app;
