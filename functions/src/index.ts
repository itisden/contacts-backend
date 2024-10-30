import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import express, { Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";

const api = express().use(bodyParser.json());

api.get("/v1", (req: Request, res: Response) => {
  res.status(200).send("Hello from Firebase Express123!");
});

exports.api = onRequest(api);
