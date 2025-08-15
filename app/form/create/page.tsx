// 'use client';

// import { useState } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import QuestionType from "@/components/form/QuestionModal";
// import ComprehensionModal from "@/components/form/ComprehensionModal";
// import { createForm } from "@/lib/formApi";
// import type { Question } from "@/lib/questionApi";
// import { toast } from "sonner";
// import { Plus } from "lucide-react";
// import { useRouter } from 'next/navigation';

// // ✅ Import drag-and-drop hook/component
// import SortableQuestionsList from "@/hook/Draghook";

// export default function CreateFormPage() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [headerImage, setHeaderImage] = useState<File | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);

//   const [openTypeSelect, setOpenTypeSelect] = useState(false);
//   const [openComprehension, setOpenComprehension] = useState(false);

//   const [isSaving, setIsSaving] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setHeaderImage(file);
//   };

//   const handlePickType = (type: "comprehension" | "cloze" | "categorize") => {
//     setOpenTypeSelect(false);
//     if (type === "comprehension") setOpenComprehension(true);
//   };

//   const router = useRouter();
//   const addQuestion = (question: Question) => {
//     const newQuestion = { ...question, _id: question._id || crypto.randomUUID() };
//     setQuestions((prev) => [...prev, newQuestion]);
//   };

//   const handleSave = async () => {
//     if (!title) {
//       toast.error('Form title is required.');
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       if (headerImage) formData.append("headerImage", headerImage);
//       formData.append("questions", JSON.stringify(questions.map((q) => q._id)));

//       await createForm(formData);
//       toast.success('Form saved successfully!');
//      router.push('/form');
//     } catch (error) {
//       console.error("Failed to save form:", error);
//       toast.error('Failed to save form. Please try again.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
//       <Card className="w-full max-w-3xl bg-gray-900 border-gray-700 shadow-lg">
//         <CardHeader className="text-center">
//           <h1 className="text-3xl font-bold text-white">Create New Form</h1>
//         </CardHeader>
//         <CardContent>
//           <Input
//             placeholder="Form Title"
//             className="mb-4 bg-gray-800 border-gray-700 text-white"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <Textarea
//             placeholder="Form Description (optional)"
//             className="mb-4 bg-gray-800 border-gray-700 text-white"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <label
//             htmlFor="headerImage"
//             className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800 mb-6"
//           >
//             {headerImage ? (
//               <p className="text-sm">{headerImage.name}</p>
//             ) : (
//               <p className="text-gray-400 text-sm">Click or drag an image to upload</p>
//             )}
//             <input
//               id="headerImage"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>

//           <div className="flex items-center my-6">
//             <div className="flex-grow border-t border-gray-700"></div>
//             <Button
//               onClick={() => setOpenTypeSelect(true)}
//               className="mx-4 px-4 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 rounded-full"
//             >
//               <Plus size={16} className="mr-2" /> Add Question
//             </Button>
//             <div className="flex-grow border-t border-gray-700"></div>
//           </div>

//           {/* ✅ Drag & Drop Questions List */}
//         <SortableQuestionsList
//   questions={questions}
//   setQuestions={setQuestions}
//   onEdit={(q) => {
//     setEditingQuestion(q);
//     setOpenComprehension(true);
//   }}
//   onDelete={(id) => setQuestions(prev => prev.filter(q => q._id !== id))}
// />

//           <div className="mt-8 flex justify-end">
//             <Button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="bg-green-600 hover:bg-green-700"
//             >
//               {isSaving ? "Saving..." : "Save Form"}
//             </Button>
//           </div>

//           <QuestionType
//             open={openTypeSelect}
//             onClose={() => setOpenTypeSelect(false)}
//             onPick={handlePickType}
//           />

//           <ComprehensionModal
//             open={openComprehension}
//             onClose={() => setOpenComprehension(false)}
//             onSave={addQuestion}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QuestionType from "@/components/form/QuestionModal";
import ComprehensionModal from "@/components/form/ComprehensionModal";
import { createForm } from "@/lib/formApi";
import type { Question } from "@/lib/questionApi";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import SortableQuestionsList from "@/hook/Draghook";

export default function CreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openTypeSelect, setOpenTypeSelect] = useState(false);
  const [openComprehension, setOpenComprehension] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null); // ✅ Add this
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setHeaderImage(file);
  };

  const handlePickType = (type: "comprehension" | "cloze" | "categorize") => {
    setOpenTypeSelect(false);
    if (type === "comprehension") setOpenComprehension(true);
  };

  // ✅ Add or edit question
  const handleSaveQuestion = (question: Question) => {
    if (editingQuestion) {
      // Replace the edited question
      setQuestions(prev =>
        prev.map(q => (q._id === question._id ? question : q))
      );
    } else {
      // Add new question
      const newQuestion = { ...question, _id: question._id || crypto.randomUUID() };
      setQuestions(prev => [...prev, newQuestion]);
    }
    setEditingQuestion(null);
    setOpenComprehension(false);
  };

  const handleSave = async () => {
    if (!title) {
      toast.error('Form title is required.');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (headerImage) formData.append("headerImage", headerImage);
      formData.append("questions", JSON.stringify(questions.map(q => q._id)));

      await createForm(formData);
      toast.success('Form saved successfully!');
      router.push('/form');
    } catch (error) {
      console.error("Failed to save form:", error);
      toast.error('Failed to save form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-gray-900 border-gray-700 shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-white">Create New Form</h1>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Form Title"
            className="mb-4 bg-gray-800 border-gray-700 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Form Description (optional)"
            className="mb-4 bg-gray-800 border-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label
            htmlFor="headerImage"
            className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800 mb-6"
          >
            {headerImage ? (
              <p className="text-sm">{headerImage.name}</p>
            ) : (
              <p className="text-gray-400 text-sm">Click or drag an image to upload</p>
            )}
            <input
              id="headerImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <Button
              onClick={() => setOpenTypeSelect(true)}
              className="mx-4 px-4 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 rounded-full"
            >
              <Plus size={16} className="mr-2" /> Add Question
            </Button>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* ✅ Render question list with edit/delete */}
          <SortableQuestionsList
            questions={questions}
            setQuestions={setQuestions}
            onEdit={(q) => {
              setEditingQuestion(q);
              setOpenComprehension(true);
            }}
            onDelete={(id) => setQuestions(prev => prev.filter(q => q._id !== id))}
          />

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? "Saving..." : "Save Form"}
            </Button>
          </div>

          <QuestionType
            open={openTypeSelect}
            onClose={() => setOpenTypeSelect(false)}
            onPick={handlePickType}
          />

          <ComprehensionModal
            open={openComprehension}
            onClose={() => {
              setOpenComprehension(false);
              setEditingQuestion(null);
            }}
            onSave={handleSaveQuestion}
            initialData={editingQuestion ?? undefined} // ✅ pass question for editing
          />
        </CardContent>
      </Card>
    </div>
  );
}
