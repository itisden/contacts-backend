import {
  IContactRepository,
  IContact,
  ContactWithoutId,
  IContactsService,
} from "@/domains/v1/contacts/types";
import { NotFoundError } from "@/utils/exeptions";

export class ContactService implements IContactsService {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async getAllContacts(userId: string): Promise<IContact[]> {
    return await this.contactRepository.getAllContacts(userId);
  }

  async getContactById(userId: string, id: string): Promise<IContact> {
    const contact = await this.contactRepository.getContactById(userId, id);
    if (!contact) {
      throw new NotFoundError(`Contact ${id} not found`);
    }
    return contact;
  }

  async addContact(
    userId: string,
    contact: ContactWithoutId,
  ): Promise<IContact> {
    return await this.contactRepository.addContact(userId, contact);
  }

  async updateContact(
    userId: string,
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact> {
    const updatedContact = await this.contactRepository.updateContact(
      userId,
      id,
      contact,
    );
    if (!updatedContact) {
      throw new NotFoundError(`Contact ${id} not found`);
    }
    return updatedContact;
  }

  async deleteContact(userId: string, id: string): Promise<IContact> {
    const deletedContact = await this.contactRepository.deleteContact(
      userId,
      id,
    );
    if (!deletedContact) {
      throw new NotFoundError(`Contact ${id} not found`);
    }
    return deletedContact;
  }
}

export default ContactService;
