import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "@/middlewares/errors";
import contactsRouter from "@/domains/contacts/v1/router";
import requestLogger from "@/middlewares/requestLog";

const api = express();

api.use(bodyParser.json());
api.use(requestLogger);
api.use("/v1/contacts", contactsRouter);
api.get("/status", (req, res) => res.send("OK"));
api.use(errorHandler);

exports.api = onRequest(api);
