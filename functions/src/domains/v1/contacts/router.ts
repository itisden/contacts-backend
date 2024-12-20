import { Router } from "express";
import ContactsController from "@/domains/v1/contacts/contoller";
import ContactsService from "@/domains/v1/contacts/service";
import firebaseRepository from "@/domains/v1/contacts/firestore-repository";
import {
  createContactValidator,
  updateContactValidator,
} from "@/domains/v1/contacts/middlewares/requestValidators";
import { sanitizeContactPayload } from "@/domains/v1/contacts/middlewares/sanitizer";
import authorizationValidator from "@/domains/v1/auth/middlewares/authorizationValidator";

// eslint-disable-next-line new-cap
const router = Router();
const contactsService = new ContactsService(firebaseRepository);
const contactsController = new ContactsController(contactsService);

router.use(authorizationValidator);
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post(
  "/",
  createContactValidator,
  sanitizeContactPayload,
  contactsController.addContact,
);
router.put(
  "/:id",
  updateContactValidator,
  sanitizeContactPayload,
  contactsController.updateContact,
);
router.delete("/:id", contactsController.deleteContact);

export default router;
