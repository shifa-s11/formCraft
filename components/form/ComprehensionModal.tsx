// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { createQuestion } from "@/lib/questionApi";

// interface SubQuestion {
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSave: (question: any) => void;
// }

// export default function ComprehensionModal({ open, onClose, onSave }: Props) {
//   const [passage, setPassage] = useState("");
//   const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [options, setOptions] = useState<string[]>([]);
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//    const [passageImage, setPassageImage] = useState<File | null>(null);

//   const addOption = () => {
//     if (options.length < 4) {
//       setOptions((prev) => [...prev, ""]);
//     }
//   };

//   const updateOption = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setPassageImage(file);
//   };
//   const addSubQuestion = () => {
//     if (!currentQuestion || options.length < 2 || !correctAnswer) return;
//     setSubQuestions((prev) => [
//       ...prev,
//       { question: currentQuestion, options, correctAnswer },
//     ]);
//     setCurrentQuestion("");
//     setOptions([]);
//     setCorrectAnswer("");
//   };

//   const handleSave = async () => {
//     if (!passage || subQuestions.length === 0) return;

//     setIsSaving(true);
//      try {
//       const formData = new FormData();
//       formData.append("type", "comprehension");
//       formData.append("passage", passage);
//       formData.append("subQuestions", JSON.stringify(subQuestions));
//       if (passageImage) {
//         formData.append("image", passageImage);
//       }

//       const newQuestion = await createQuestion(formData);

//       onSave(newQuestion);
//       onClose();
//       setPassage("");
//       setPassageImage(null);
//       setSubQuestions([]);
//     } catch (error) {
//       console.error("Error creating comprehension question:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-gray-900 text-white max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Create Comprehension Question</DialogTitle>
//         </DialogHeader>

//         <Textarea
//           placeholder="Enter passage..."
//           value={passage}
//           onChange={(e) => setPassage(e.target.value)}
//           className="bg-gray-800 border-gray-700 text-white mb-4"
//         />
//          <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800 mb-6">
//           {passageImage ? (
//             <p className="text-sm">{passageImage.name}</p>
//           ) : (
//             <p className="text-gray-400 text-sm">Click or drag an image to upload</p>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="hidden"
//           />
//         </label>

//         {/* Sub-question creator */}
//         <div className="mb-4">
//           <Input
//             placeholder="Sub-question text"
//             value={currentQuestion}
//             onChange={(e) => setCurrentQuestion(e.target.value)}
//             className="mb-2 bg-gray-800 border-gray-700 text-white"
//           />
//           {options.map((opt, i) => (
//             <Input
//               key={i}
//               placeholder={`Option ${i + 1}`}
//               value={opt}
//               onChange={(e) => updateOption(i, e.target.value)}
//               className="mb-2 bg-gray-800 border-gray-700 text-white"
//             />
//           ))}
//           <Button
//             onClick={addOption}
//             className="bg-blue-600 hover:bg-blue-700 text-white mb-2"
//           >
//             + Add Option
//           </Button>

//           <Input
//             placeholder="Correct Answer"
//             value={correctAnswer}
//             onChange={(e) => setCorrectAnswer(e.target.value)}
//             className="mb-2 bg-gray-800 border-gray-700 text-white"
//           />
//           <Button
//             onClick={addSubQuestion}
//             className="bg-purple-600 hover:bg-purple-700 text-white"
//           >
//             Add Sub-question
//           </Button>
//         </div>

//         {/* List of sub-questions */}
//         {subQuestions.length > 0 && (
//           <div className="bg-gray-800 p-3 rounded-lg mb-4">
//             <p className="font-semibold mb-2">Sub-questions:</p>
//             {subQuestions.map((sq, i) => (
//               <div key={i} className="text-sm text-gray-300 mb-2">
//                 <span className="font-medium">{sq.question}</span>  
//                 <br />
//                 Options: {sq.options.join(", ")}  
//                 <br />
//                 Correct: {sq.correctAnswer}
//               </div>
//             ))}
//           </div>
//         )}

//         <Button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {isSaving ? "Saving..." : "Save Question"}
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createQuestion,Question } from "@/lib/questionApi";
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
   onSave: (question:Question) => void;
}

export default function ComprehensionModal({ open, onClose, onSave }: Props) {
  const [passage, setPassage] = useState("");
  const [passageImage, setPassageImage] = useState<File | null>(null);
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Adds a new option to the current sub-question
  const addOption = () => {
    if (options.length < 4) {
      setOptions((prev) => [...prev, ""]);
    }
  };

  // Updates the value of a specific option
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handles adding or updating a sub-question
  const handleSaveSubQuestion = () => {
    if (!currentQuestion || options.length < 2 || !correctAnswer) return;

    const newSubQuestion = { question: currentQuestion, options, correctAnswer };

    if (editingIndex !== null) {
      // Update existing sub-question
      const updatedQuestions = [...subQuestions];
      updatedQuestions[editingIndex] = newSubQuestion;
      setSubQuestions(updatedQuestions);
      setEditingIndex(null);
    } else {
      // Add new sub-question
      setSubQuestions((prev) => [...prev, newSubQuestion]);
    }

    // Reset fields
    setCurrentQuestion("");
    setOptions([""]);
    setCorrectAnswer("");
  };

  // Sets up the form for editing a sub-question
  const editSubQuestion = (index: number) => {
    const questionToEdit = subQuestions[index];
    setCurrentQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setEditingIndex(index);
  };

  // Removes a sub-question from the list
  const deleteSubQuestion = (index: number) => {
    setSubQuestions(subQuestions.filter((_, i) => i !== index));
  };

  // Resets the sub-question form
  const cancelEdit = () => {
    setCurrentQuestion("");
    setOptions([""]);
    setCorrectAnswer("");
    setEditingIndex(null);
  };

  // Handles file input for the passage image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPassageImage(file);
  };

  // Handles the final save of the entire comprehension question
  const handleSave = async () => {
    if (!passage || subQuestions.length === 0) return;

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("type", "comprehension");
      formData.append("passage", passage);
      formData.append("subQuestions", JSON.stringify(subQuestions));
      if (passageImage) {
        formData.append("image", passageImage);
      }

      const newQuestion = await createQuestion(formData);

      onSave(newQuestion);
      onClose();
      setPassage("");
      setPassageImage(null);
      setSubQuestions([]);
    } catch (error) {
      console.error("Error creating comprehension question:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-gray-800 text-white max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">Create Comprehension Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Enter passage..."
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-green-500 focus:ring-2 focus:border-transparent transition-colors"
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
        </div>

        {/* Sub-question creator */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-300">
            {editingIndex !== null ? "Edit Sub-question" : "Add a new sub-question"}
          </h3>
          <Input
            placeholder="Sub-question text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-green-500 focus:ring-2 focus:border-transparent transition-colors"
          />
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-green-500 focus:ring-2 focus:border-transparent transition-colors"
              />
            ))}
          </div>
          {options.length < 4 && (
            <Button
              onClick={addOption}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Add Option
            </Button>
          )}

          <Input
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:ring-green-500 focus:ring-2 focus:border-transparent transition-colors"
          />
          <div className="flex space-x-2">
            <Button
              onClick={handleSaveSubQuestion}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            >
              {editingIndex !== null ? "Update Sub-question" : "Add Sub-question"}
            </Button>
            {editingIndex !== null && (
              <Button onClick={cancelEdit} variant="outline" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800">
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* List of sub-questions with scrollbar */}
        {subQuestions.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-xl mt-4 max-h-64 overflow-y-auto space-y-3">
            <p className="font-semibold text-gray-300">Added Sub-questions:</p>
            {subQuestions.map((sq, i) => (
              <div
                key={i}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600 flex items-center justify-between transition-colors hover:bg-gray-600"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{i + 1}. {sq.question}</p>
                  <p className="text-sm text-gray-400">Options: {sq.options.join(", ")}</p>
                  <p className="text-sm text-green-400">Correct Answer: {sq.correctAnswer}</p>
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
        )}

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full text-white py-3 px-5 rounded-xl shadow-lg transition-all duration-300 font-bold transform hover:scale-105 bg-green-600 hover:bg-green-700"
          >
            {isSaving ? "Saving..." : "Save Question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


