import { Router } from "express";
import authRouter from "@/domains/v1/auth/router";
import contactsRouter from "@/domains/v1/contacts/router";

// eslint-disable-next-line new-cap
const router = Router();

router.use("/auth", authRouter);
router.use("/contacts", contactsRouter);

export default router;
