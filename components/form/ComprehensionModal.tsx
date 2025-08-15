

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createQuestion, updateQuestion, Question, deleteQuestion } from "@/lib/questionApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";

interface SubQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  initialData?: Question;
}

export default function ComprehensionModal({ open, onClose, onSave, initialData }: Props) {
  const [passage, setPassage] = useState("");
  const [passageImage, setPassageImage] = useState<File | null>(null);
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setPassage(initialData.passage);
      setSubQuestions(initialData.subQuestions || []);
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setPassage("");
    setPassageImage(null);
    setSubQuestions([]);
    setCurrentQuestion("");
    setOptions(["", ""]);
    setCorrectAnswer("");
    setEditingIndex(null);
  };

  const addOption = () => { if (options.length < 4) setOptions([...options, ""]); };
  const updateOption = (i: number, value: string) => { const newOpts = [...options]; newOpts[i] = value; setOptions(newOpts); };

  const handleSaveSubQuestion = () => {
    if (!currentQuestion || options.length < 2 || !correctAnswer) return;

    const newSubQuestion: SubQuestion = { question: currentQuestion, options, correctAnswer };

    if (editingIndex !== null) {
      const updated = [...subQuestions];
      updated[editingIndex] = newSubQuestion;
      setSubQuestions(updated);
      setEditingIndex(null);
    } else {
      setSubQuestions([...subQuestions, newSubQuestion]);
    }

    setCurrentQuestion("");
    setOptions(["", ""]);
    setCorrectAnswer("");
  };

  const editSubQuestion = (i: number) => {
    const sq = subQuestions[i];
    setCurrentQuestion(sq.question);
    setOptions(sq.options);
    setCorrectAnswer(sq.correctAnswer);
    setEditingIndex(i);
  };

  const deleteSubQuestion = (i: number) => {
    setSubQuestions(subQuestions.filter((_, idx) => idx !== i));
    if (editingIndex === i) resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassageImage(e.target.files?.[0] || null);
  };

  const handleSave = async () => {
    if (!passage || subQuestions.length === 0) return;
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("type", "comprehension");
      formData.append("passage", passage);
      formData.append("subQuestions", JSON.stringify(subQuestions));
      if (passageImage) formData.append("image", passageImage);

      let savedQuestion: Question;

      if (initialData?._id) {
        savedQuestion = await updateQuestion(initialData._id, formData);
      } else {
        savedQuestion = await createQuestion(formData);
      }

      onSave(savedQuestion);
      onClose();
      resetForm();

    } catch (err) {
      console.error("Error saving comprehension question:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!initialData?._id) return;
    try {
      await deleteQuestion(initialData._id);
      onClose();
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">{initialData ? "Edit Comprehension" : "Add Comprehension"}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Textarea 
            value={passage} 
            onChange={e => setPassage(e.target.value)} 
            placeholder="Passage" 
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:border-transparent transition-colors"
          />
          <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800 transition-colors hover:border-gray-500">
            <label className="w-full h-32 flex flex-col items-center justify-center cursor-pointer">
              {passageImage ? (
                <p className="text-sm text-gray-400 truncate w-3/4 text-center">{passageImage.name}</p>
              ) : (
                <p className="text-gray-400 text-sm">Click or drag an image to upload</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          

          <div className="flex flex-col gap-2 mt-3">
            <Input 
              placeholder="Sub-question" 
              value={currentQuestion} 
              onChange={e => setCurrentQuestion(e.target.value)} 
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-green-500 focus:ring-2 focus:border-transparent transition-colors"
            />
            {options.map((opt, i) => (
              <Input 
                key={i} 
                placeholder={`Option ${i + 1}`} 
                value={opt} 
                onChange={e => updateOption(i, e.target.value)} 
                className="bg-gray-700 border-gray-600 text-white"
              />
            ))}
            <div className="flex gap-2 mt-1">
              <Button onClick={addOption} className="bg-blue-600 hover:bg-blue-700 text-white">Add Option</Button>
              <Input 
                placeholder="Correct Answer" 
                value={correctAnswer} 
                onChange={e => setCorrectAnswer(e.target.value)} 
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSaveSubQuestion}>{editingIndex !== null ? "Update" : "Add Sub-Question"}</Button>
              {editingIndex !== null && <Button variant="secondary" onClick={() => setEditingIndex(null)}>Cancel</Button>}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-3">
             {subQuestions.map((sq, i) => (
              <div key={i} className="bg-gray-800 p-3 rounded flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold">{sq.question}</p>
                  <p className="text-sm text-gray-300">Options: {sq.options.join(", ")}</p>
                  <p className="text-sm text-green-400">Answer: {sq.correctAnswer}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    <DropdownMenuItem onClick={() => editSubQuestion(i)} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteSubQuestion(i)} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-4">
  <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700 mr-2">
            {isSaving ? "Saving..." : (initialData ? "Update Question" : "Save Question")}
          </Button>
          {initialData?._id && <Button variant="destructive" onClick={handleDeleteQuestion}>Delete Question</Button>}
          <Button onClick={onClose} variant="secondary">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}