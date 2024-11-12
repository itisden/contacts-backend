export interface IContact {
  id: string;
  ownerId: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

export type ContactWithoutId = Omit<IContact, "id">;

export interface IContactRepository {
  getAllContacts(userId: string): Promise<IContact[]>;
  getContactById(userId: string, id: string): Promise<IContact | null>;
  addContact(userId: string, contact: ContactWithoutId): Promise<IContact>;
  updateContact(
    userId: string,
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact | null>;
  deleteContact(userId: string, id: string): Promise<IContact | null>;
}

export interface IContactsService {
  getAllContacts(userId: string): Promise<IContact[]>;
  getContactById(userId: string, id: string): Promise<IContact>;
  addContact(userId: string, contact: ContactWithoutId): Promise<IContact>;
  updateContact(
    userId: string,
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact>;
  deleteContact(userId: string, id: string): Promise<IContact>;
}
