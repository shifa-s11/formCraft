import axios from "axios";
import { routes } from "./route";

export interface Question {
  _id: string;
  type: "comprehension";
  passage: string;
  subQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export const createQuestion = async (formData: FormData) => {
  const res = await axios.post(routes.createQuestion, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateQuestion = async (id: string, formData: FormData) => {
  const res = await axios.put(routes.updateQuestion(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteQuestion = async (id: string) => {
  const res = await axios.delete(routes.deleteQuestion(id));
  return res.data;
};

export const getQuestions = async () => {
  const res = await axios.get(routes.getQuestions);
  return res.data;
};

