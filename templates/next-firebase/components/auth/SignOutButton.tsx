"use client";

import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <button
      className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold transition hover:bg-white"
      onClick={handleSignOut}
      type="button"
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}
