import {
  IContactRepository,
  IContact,
  ContactWithoutId,
  IContactsService,
} from "@/domains/contacts/v1/types";
import { NotFoundError } from "@/utils/errors";

export class ContactService implements IContactsService {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async getAllContacts(): Promise<IContact[]> {
    return await this.contactRepository.getAllContacts();
  }

  async getContactById(id: string): Promise<IContact> {
    const contact = await this.contactRepository.getContactById(id);
    if (!contact) {
      throw new NotFoundError(`Contact ${id} not found`);
    }
    return contact;
  }

  async addContact(contact: ContactWithoutId): Promise<IContact> {
    return await this.contactRepository.addContact(contact);
  }

  async updateContact(
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact> {
    const updatedContact = await this.contactRepository.updateContact(
      id,
      contact,
    );
    if (!updatedContact) {
      throw new NotFoundError(`Contact ${id} not found`);
    }
    return updatedContact;
  }

  async deleteContact(id: string): Promise<void> {
    await this.contactRepository.deleteContact(id);
  }
}

export default ContactService;
