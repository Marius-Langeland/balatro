import { supabase } from "$lib/supabaseClient.svelte";

export async function load() {
  const { data } = await supabase.from("instruments").select();
  return {
    instruments: data ?? [],
  };
}