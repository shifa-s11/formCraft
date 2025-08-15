// components/form/QuestionModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuestionTypeProps {
  open: boolean;
  onClose: () => void;
  onPick: (type: "comprehension" | "cloze" | "categorize") => void;
}

export default function QuestionType({ open, onClose, onPick }: QuestionTypeProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>Select Question Type</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => onPick("comprehension")}
          >
            Comprehension
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => onPick("cloze")}
          >
            Cloze
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => onPick("categorize")}
          >
            Categorize
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

