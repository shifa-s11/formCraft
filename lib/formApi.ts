// lib/formApi.ts
import axios from "axios";
import { routes } from "./route";

export interface Form {
  _id: string;
  title: string;
  description?: string;
  headerImage?: string;
  questions: string[];
}

export const createForm = async (formData: FormData): Promise<Form> => {
  try {
    const res = await axios.post(routes.createForm, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
};

export const getForms = async (): Promise<Form[]> => {
  try {
    const res = await axios.get(routes.getForms);
    return res.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

export const getFormById = async (id: string): Promise<Form> => {
  try {
    const res = await axios.get(routes.getFormById(id));
    return res.data;
  } catch (error) {
    console.error(`Error fetching form with ID ${id}:`, error);
    throw error;
  }
};

export const updateForm = async (id: string, updatedData: FormData): Promise<Form> => {
  try {
    const res = await axios.put(routes.updateForm(id), updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating form with ID ${id}:`, error);
    throw error;
  }
};

export const deleteForm = async (id: string): Promise<{ message: string }> => {
  try {
    const res = await axios.delete(routes.deleteForm(id));
    return res.data;
  } catch (error) {
    console.error(`Error deleting form with ID ${id}:`, error);
    throw error;
  }
};



