'use client';

import React from 'react';
import { DndContext, closestCenter,DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Trash, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import type { Question } from "@/lib/questionApi";

interface SortableQuestionsListProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

function SortableQuestionItem({
  question,
  isFirst,
  isLast,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  question: Question;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question._id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400 tracking-wider">{question.type?.toUpperCase()}</div>
        <div className="flex items-center gap-2">
          <Button onClick={onMoveUp} disabled={isFirst} variant="ghost" size="icon" className="p-1 h-auto w-auto text-gray-400 hover:text-white">
            <ArrowUp size={16} />
          </Button>
          <Button onClick={onMoveDown} disabled={isLast} variant="ghost" size="icon" className="p-1 h-auto w-auto text-gray-400 hover:text-white">
            <ArrowDown size={16} />
          </Button>
          <Button onClick={onDelete} variant="ghost" size="icon" className="p-1 h-auto w-auto text-red-500 hover:bg-red-500/10">
            <Trash size={16} />
          </Button>
          <Button {...listeners} {...attributes} variant="ghost" size="icon" className="p-1 h-auto w-auto text-gray-400 cursor-grab active:cursor-grabbing" aria-label="Drag to reorder">
            <GripVertical size={16} />
          </Button>
        </div>
      </div>

      {question.type === "comprehension" && (
        <>
          <p className="mt-1 font-semibold">Passage:</p>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{question.passage}</p>
          <p className="mt-2 text-sm text-gray-400">Sub-questions: {question.subQuestions?.length || 0}</p>
        </>
      )}
    </div>
  );
}

export default function SortableQuestionsList({ questions, setQuestions }: SortableQuestionsListProps) {
  const handleDragEnd = (event:DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setQuestions((items) => {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);
      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      return newItems;
    });
  };

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === questions.length - 1)) return;
    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(index, 1);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    newQuestions.splice(newIndex, 0, moved);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };
  if (questions.length === 0) {
    return <p className="text-gray-400 text-center">No questions added yet.</p>;
  }
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={questions.map((q) => q._id!)} strategy={verticalListSortingStrategy}>
        {questions.map((q, i) => (
          <SortableQuestionItem
            key={q._id}
            question={q}
            index={i}
            isFirst={i === 0}
            isLast={i === questions.length - 1}
            onDelete={() => handleDeleteQuestion(i)}
            onMoveUp={() => handleMoveQuestion(i, "up")}
            onMoveDown={() => handleMoveQuestion(i, "down")}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
