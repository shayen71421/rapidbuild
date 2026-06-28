"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { createAccount, formatAuthError, resetPassword, signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { useToast } from "@/components/ui/ToastProvider";

export function AuthForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
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
        await signInWithEmail(email, password);
        showToast("Signed in successfully.", "success");
        router.push("/dashboard");
        return;
      }

      if (mode === "signup") {
        await createAccount(email, password);
        showToast("Account created. Check your inbox to verify your email.", "success");
        router.push("/dashboard");
        return;
      }

      await resetPassword(email);
      showToast("Password reset email sent.", "success");
      setMode("signin");
    } catch (currentError) {
      const message = formatAuthError(currentError);
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      showToast("Signed in with Google.", "success");
      router.push("/dashboard");
    } catch (currentError) {
      const message = formatAuthError(currentError);
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{getTitle(mode)}</h1>
      <p className="mt-2 text-sm text-neutral-600">{getDescription(mode)}</p>

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

      {mode !== "reset" ? (
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
      ) : null}

      {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <button
        className="mt-6 w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Working..." : getSubmitLabel(mode)}
      </button>

      {mode !== "reset" ? (
        <button
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          type="button"
          onClick={handleGoogleSignIn}
        >
          <Mail size={16} />
          Continue with Google
        </button>
      ) : null}

      <button
        className="mt-4 w-full text-sm font-medium text-signal"
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin" ? "Need an account?" : "Already have an account?"}
      </button>

      {mode === "signin" ? (
        <button className="mt-3 w-full text-sm font-medium text-neutral-600" type="button" onClick={() => setMode("reset")}>
          Forgot your password?
        </button>
      ) : null}
    </form>
  );
}

function getTitle(mode: "signin" | "signup" | "reset"): string {
  if (mode === "signup") {
    return "Create account";
  }
  if (mode === "reset") {
    return "Reset password";
  }
  return "Sign in";
}

function getDescription(mode: "signin" | "signup" | "reset"): string {
  if (mode === "signup") {
    return "Create an account with Firebase Auth.";
  }
  if (mode === "reset") {
    return "Enter your email and Firebase will send a password reset link.";
  }
  return "Use email/password or Google Sign-In.";
}

function getSubmitLabel(mode: "signin" | "signup" | "reset"): string {
  if (mode === "signup") {
    return "Create account";
  }
  if (mode === "reset") {
    return "Send reset email";
  }
  return "Sign in";
}
