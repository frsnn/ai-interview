import Router from "next/router";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") Router.push("/login");
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error");
  }
  return res.status === 204 ? ({} as T) : res.json();
} 