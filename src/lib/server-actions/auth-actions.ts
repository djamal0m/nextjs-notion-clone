"use server";

import { FormSchema } from "../types";
import { z } from "zod";
import { createClient } from "../supabase/server";
import { redirect, useRouter } from "next/navigation";

export async function loginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function registerUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (user?.length) return { error: { message: "User already exists" }, user };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });

  return response;
}
