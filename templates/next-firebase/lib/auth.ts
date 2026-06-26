import { User } from "firebase/auth";

export function getDisplayName(user: User | null): string {
  return user?.displayName ?? user?.email ?? "Signed in user";
}
