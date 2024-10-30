import { Router } from "express";
import ContactsController from "@/domains/contacts/v1/contoller";
import ContactsService from "@/domains/contacts/v1/service";
import firebaseRepository from "@/domains/contacts/v1/firestore-repository";

const router = Router();
const contactsService = new ContactsService(firebaseRepository);
const contactsController = new ContactsController(contactsService);

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.addContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

export default router;
