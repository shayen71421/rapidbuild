"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/lib/auth";
import { useToast } from "@/components/ui/ToastProvider";

export function SignOutButton() {
  const router = useRouter();
  const { showToast } = useToast();

  async function handleSignOut() {
    await signOutUser();
    showToast("Signed out.", "success");
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
