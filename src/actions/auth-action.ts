"use server";

import { auth, signIn } from "@/lib/auth";
import { Session } from "next-auth";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function ensureAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session as Session & {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  };
}
