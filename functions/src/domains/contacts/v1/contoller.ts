import { Request, Response, NextFunction } from "express";
import { IContactsService } from "@/domains/contacts/v1/types";
import { logger } from "firebase-functions/v2";

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
      const contacts = await this.contactsService.getAllContacts();
      res.json(contacts);
    } catch (e) {
      next(e);
    }
  }

  async getContactById(req: Request, res: Response, next: NextFunction) {
    try {
      const contact = await this.contactsService.getContactById(req.params.id);
      res.json(contact);
    } catch (e) {
      next(e);
    }
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("req.body", req.body);
      const newContact = await this.contactsService.addContact(req.body);
      res.status(201).json(newContact);
    } catch (e) {
      next(e);
    }
  }

  async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedContact = await this.contactsService.updateContact(
        req.params.id,
        req.body
      );
      res.json(updatedContact);
    } catch (e) {
      next(e);
    }
  }

  async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      await this.contactsService.deleteContact(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export default ContactsController;
