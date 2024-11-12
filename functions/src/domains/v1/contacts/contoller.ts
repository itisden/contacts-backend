import { Request, Response, NextFunction } from "express";
import { IContactsService } from "@/domains/v1/contacts/types";

class ContactsController {
  private contactsService: IContactsService;

  constructor(contactsService: IContactsService) {
    this.contactsService = contactsService;

    this.getAllContacts = this.getAllContacts.bind(this);
    this.getContactById = this.getContactById.bind(this);
    this.addContact = this.addContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  async getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.uid;
      const contacts = await this.contactsService.getAllContacts(userId);
      res.json(contacts);
    } catch (e) {
      next(e);
    }
  }

  async getContactById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.uid;
      const contact = await this.contactsService.getContactById(
        userId,
        req.params.id,
      );
      res.json(contact);
    } catch (e) {
      next(e);
    }
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.uid;
      const newContact = await this.contactsService.addContact(
        userId,
        req.body,
      );
      res.status(201).json(newContact);
    } catch (e) {
      next(e);
    }
  }

  async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.uid;
      const updatedContact = await this.contactsService.updateContact(
        userId,
        req.params.id,
        req.body,
      );
      res.json(updatedContact);
    } catch (e) {
      next(e);
    }
  }

  async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.uid;
      await this.contactsService.deleteContact(userId, req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export default ContactsController;
