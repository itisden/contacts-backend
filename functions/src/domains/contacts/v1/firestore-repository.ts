import { db } from "@/config/firebase";
import {
  IContact,
  ContactWithoutId,
  IContactRepository,
} from "@/domains/contacts/v1/types";

const contactsCollection = db.collection("contacts");

const FirestoreRepository: IContactRepository = {
  async getAllContacts(): Promise<IContact[]> {
    const snapshot = await contactsCollection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as IContact
    );
  },

  async getContactById(id: string): Promise<IContact | null> {
    const doc = await contactsCollection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as IContact) : null;
  },

  async addContact(contact: ContactWithoutId): Promise<IContact> {
    const docRef = await contactsCollection.add(contact);
    return { id: docRef.id, ...contact };
  },

  async updateContact(
    id: string,
    contact: Partial<IContact>
  ): Promise<IContact | null> {
    const docRef = contactsCollection.doc(id);
    await docRef.update(contact);
    return this.getContactById(id);
  },

  async deleteContact(id: string): Promise<void> {
    const docRef = contactsCollection.doc(id);
    await docRef.delete();
  },
};

export default FirestoreRepository;
