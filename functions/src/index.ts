import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "@/middlewares/errors";
import contactsRouter from "@/domains/contacts/v1/router";
import requestLogger from "@/middlewares/requestLog";

const apiApp = express();

apiApp.use(bodyParser.json());
apiApp.use(requestLogger);
apiApp.use("/api/v1/contacts", contactsRouter);
apiApp.get("/status", (req, res) => res.send("OK"));
apiApp.use(errorHandler);

export const api = onRequest(apiApp);
