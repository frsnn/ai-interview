"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function NewJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const submit = async () => {
    await apiFetch("/api/v1/jobs", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
    router.push("/jobs");
  };
  return (
    <div>
      <h1>New Job</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
      <button onClick={submit}>Save</button>
    </div>
  );
} 