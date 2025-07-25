"use client";
import { useEffect,useState } from "react";
import { apiFetch } from "@/lib/api";

interface Interview{ id:number; job_id:number; candidate_id:number; status:string }

export default function InterviewsPage(){
 const [list,setList]=useState<Interview[]>([]);
 useEffect(()=>{apiFetch<Interview[]>("/api/v1/interviews").then(setList);},[]);
 const toggle=async(id:number,status:string)=>{
  const newStatus=status==="pending"?"completed":"pending";
  await apiFetch(`/api/v1/interviews/${id}/status`,{method:"PATCH",body:JSON.stringify({status:newStatus})});
  setList(prev=>prev.map(i=>i.id===id?{...i,status:newStatus}:i));
 };
 return(
  <div>
   <h1>Interviews</h1>
   <ul>
    {list.map(i=>(
      <li key={i.id}>
        ID {i.id} – Job {i.job_id} – Candidate {i.candidate_id} – {i.status}
        <button onClick={()=>toggle(i.id,i.status)}>Toggle</button>
      </li>
    ))}
   </ul>
  </div>
 );
} 