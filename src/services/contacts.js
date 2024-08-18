import { Contact } from '../db/contact.js';
import mongoose from 'mongoose';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw error;
  }
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (id) => {
  const contact = await Contact.findOneAndDelete({ _id: id });
  return contact;
};