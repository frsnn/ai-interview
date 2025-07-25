"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface Candidate { id:number; name:string; email:string; status?:string }

export default function CandidatesPage() {
  const [cands, setCands] = useState<Candidate[]>([]);
  useEffect(() => { apiFetch<Candidate[]>("/api/v1/candidates").then(setCands); }, []);
  return (
    <div>
      <h1>Candidates</h1>
      <Link href="/candidates/new">New Candidate</Link>
      <ul>
        {cands.map(c => (
          <li key={c.id} style={{marginBottom:"0.5rem"}}>
            {c.name} – {c.email}
            <button style={{marginLeft:"1rem"}} onClick={async()=>{
              await apiFetch(`/api/v1/candidates/${c.id}/send-link`,{method:"POST"});
              alert("Link sent");
            }}>Send Link</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 