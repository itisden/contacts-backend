import { db } from "@/config/firebase";
import {
  IContact,
  ContactWithoutId,
  IContactRepository,
} from "@/domains/v1/contacts/types";

const contactsCollection = db.collection("contacts");

const FirestoreRepository: IContactRepository = {
  async getAllContacts(userId: string): Promise<IContact[]> {
    const snapshot = await contactsCollection
      .where("ownerId", "==", userId)
      .get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as IContact,
    );
  },

  async getContactById(userId: string, id: string): Promise<IContact | null> {
    const doc = await contactsCollection.doc(id).get();
    return doc.exists && doc.data()?.ownerId === userId
      ? ({ id: doc.id, ...doc.data() } as IContact)
      : null;
  },

  async addContact(
    userId: string,
    contact: ContactWithoutId,
  ): Promise<IContact> {
    const docRef = await contactsCollection.add({
      ...contact,
      ownerId: userId,
    });
    const doc = await docRef.get();
    return { id: docRef.id, ...doc.data() } as IContact;
  },

  async updateContact(
    userId: string,
    id: string,
    contact: Partial<IContact>,
  ): Promise<IContact | null> {
    const docRef = contactsCollection.doc(id);
    const doc = await docRef.get();
    if (doc.exists && doc.data()?.ownerId === userId) {
      await docRef.update(contact);
      return this.getContactById(userId, id);
    }
    return null;
  },

  async deleteContact(userId: string, id: string): Promise<IContact | null> {
    const docRef = contactsCollection.doc(id);
    const doc = await docRef.get();
    if (doc.exists && doc.data()?.ownerId === userId) {
      const contact = { id: doc.id, ...doc.data() } as IContact;
      await docRef.delete();
      return contact; // Return the contact data being removed
    }
    return null; // Return null if the contact is not found
  },
};

export default FirestoreRepository;
