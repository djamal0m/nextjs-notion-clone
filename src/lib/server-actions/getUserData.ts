import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default async function getUserData(): Promise<User | null> {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;
  return user;
}
