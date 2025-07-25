"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface Job { id: number; title: string; description: string }

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    apiFetch<Job[]>("/api/v1/jobs").then(setJobs);
  }, []);
  return (
    <div>
      <h1>Jobs</h1>
      <Link href="/jobs/new">New Job</Link>
      <ul>
        {jobs.map((j) => (
          <li key={j.id}>{j.title}</li>
        ))}
      </ul>
    </div>
  );
} 