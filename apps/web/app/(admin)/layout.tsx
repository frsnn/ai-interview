"use client";
import Link from "next/link";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div style={{ padding: "1rem" }}>
        <Nav />
        <div style={{ marginTop: "2rem" }}>{children}</div>
      </div>
    </AuthProvider>
  );
}

function Nav() {
  const { token, logout } = useAuth();
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      {token ? (
        <>
          <Link href="/jobs">Jobs</Link>
          <Link href="/candidates">Candidates</Link>
          <Link href="/interviews">Interviews</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : null}
    </nav>
  );
} 