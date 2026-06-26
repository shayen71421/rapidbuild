"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { auth } from "@/lib/firebase";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <p className="mt-2 text-sm text-neutral-600">Use Firebase email/password authentication.</p>

      <label className="mt-6 block text-sm font-medium">
        Email
        <input
          className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none ring-signal focus:ring-2"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className="mt-4 block text-sm font-medium">
        Password
        <input
          className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none ring-signal focus:ring-2"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />
      </label>

      {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <button
        className="mt-6 w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
      </button>

      <button
        className="mt-4 w-full text-sm font-medium text-signal"
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin" ? "Need an account?" : "Already have an account?"}
      </button>
    </form>
  );
}
