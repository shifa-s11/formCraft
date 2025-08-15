'use client';

import React, { useState } from 'react';
import type { Question } from "@/lib/questionApi";
import { Pencil, Trash } from "lucide-react"; // ShadCN icons
import { Button } from "@/components/ui/button";
import ComprehensionModal from "@/components/form/ComprehensionModal"; // Assuming path

interface QuestionDisplayCardProps {
  question: Question;
  onEdit: (updated: Question) => void;
  onDelete: (id: string) => void;
}

export default function QuestionDisplayCard({ question, onEdit, onDelete }: QuestionDisplayCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditSave = async (updatedQuestion: Question) => {
    onEdit(updatedQuestion);
    setIsModalOpen(false);
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-900 relative">
      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsModalOpen(true)}
          title="Edit Question"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(question._id)}
          title="Delete Question"
        >
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {/* Question content */}
      {question.type === "comprehension" ? (
        <>
          <p className="mt-1 font-semibold text-white">Passage:</p>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{question.passage}</p>
          <p className="mt-2 text-sm text-gray-400">Sub-questions: {question.subQuestions?.length || 0}</p>
        </>
      ) : (
        <p className="text-gray-400">Unknown question type.</p>
      )}

      {/* Edit modal */}
      {isModalOpen && question.type === "comprehension" && (
        <ComprehensionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEditSave}
        //   initialData={question} 
        />
      )}
    </div>
  );
}
