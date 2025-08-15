"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getForms, deleteForm, Form } from "@/lib/formApi";

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await getForms();
      setForms(data);
    } catch (err) {
      console.error("Error fetching forms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return;
    try {
      await deleteForm(id);
      setForms(forms.filter((form) => form._id !== id));
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold">
           Form <span className="text-red-500">Crafter</span>
        </h1>
        <Link href="/form/create">
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 shadow-lg hover:scale-105 transition">
            + Create New Form
          </button>
        </Link>
      </div>


      {loading && <p className="text-center">Loading forms...</p>}


      {!loading && forms.length === 0 && (
        <p className="text-center text-gray-400">
          No forms available. Create one to get started!
        </p>
      )}


      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.01]"
          >
            <h2 className="text-2xl font-bold mb-2">{form.title}</h2>
            {form.description && (
              <p className="text-gray-400 mb-4">{form.description}</p>
            )}
            <div className="flex justify-between">
              <Link href={`/form/${form._id}`}>
                <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(form._id)}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
