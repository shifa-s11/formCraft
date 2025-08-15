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
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return res.data;
};
