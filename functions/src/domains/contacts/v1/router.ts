import { Router } from "express";
import ContactsController from "@/domains/contacts/v1/contoller";
import ContactsService from "@/domains/contacts/v1/service";
import firebaseRepository from "@/domains/contacts/v1/firestore-repository";
import {
  createContactValidator,
  updateContactValidator,
} from "@/domains/contacts/v1/middlewares/validators";
import { sanitizeContactPayload } from "@/domains/contacts/v1/middlewares/sanitizer";

// eslint-disable-next-line new-cap
const router = Router();
const contactsService = new ContactsService(firebaseRepository);
const contactsController = new ContactsController(contactsService);

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
