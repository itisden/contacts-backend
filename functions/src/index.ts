import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "@/middlewares/errors";
import v1Router from "@/domains/v1/router";

const apiApp = express();

apiApp.use(bodyParser.json());
apiApp.use("/api/v1", v1Router);
apiApp.get("/status", (req, res) => res.send("OK"));
apiApp.use(errorHandler);

export const app = onRequest({ cors: true }, apiApp);
