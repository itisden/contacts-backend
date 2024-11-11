export interface IContact {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

export type ContactWithoutId = Omit<IContact, "id">;

export interface IContactRepository {
  getAllContacts(): Promise<IContact[]>;
  getContactById(id: string): Promise<IContact | null>;
  addContact(contact: ContactWithoutId): Promise<IContact>;
  updateContact(
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact | null>;
  deleteContact(id: string): Promise<void>;
}

export interface IContactsService {
  getAllContacts(): Promise<IContact[]>;
  getContactById(id: string): Promise<IContact | null>;
  addContact(contact: ContactWithoutId): Promise<IContact>;
  updateContact(
    id: string,
    contact: Partial<ContactWithoutId>,
  ): Promise<IContact>;
  deleteContact(id: string): Promise<void>;
}
