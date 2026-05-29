import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { mapJobDescription } from "@/lib/db/mappers";
import type { DbJobDescription } from "@/lib/db/types";

export async function listJobDescriptions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_descriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as DbJobDescription[]).map(mapJobDescription);
}

export async function getJobDescriptionById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("job_descriptions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as DbJobDescription;
}

export async function createJobDescription(input: { title: string; body: string }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("job_descriptions")
    .insert({
      title: input.title.trim(),
      body: input.body.trim(),
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapJobDescription(data as DbJobDescription);
}

export async function deleteJobDescription(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("job_descriptions").delete().eq("id", id);
  if (error) throw error;
}
