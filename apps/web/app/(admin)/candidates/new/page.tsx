"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function NewCandidatePage() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [error,setError]=useState<string|null>(null);
  const router=useRouter();
  const submit=async()=>{
    try{
      await apiFetch("/api/v1/candidates",{method:"POST",body:JSON.stringify({name,email})});
      router.push("/candidates");
    }catch(e:any){ setError(e.message); }
  };
  return (
    <div>
      <h1>New Candidate</h1>
      {error && <p style={{color:"red"}}>{error}</p>}
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <button onClick={submit}>Save</button>
    </div>
  );
} 