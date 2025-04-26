import { createClient, type Session } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export const authState : {session: Session | null, displayName: string} = $state({session: null, displayName: ''})

supabase.auth.onAuthStateChange(async (event, session) => {
    authState.session = session;
    authState.displayName = session?.user.user_metadata.custom_claims.global_name ?? '';
});

export const login = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: 'https://balatro-multiplayer.vercel.app/',
        },
    });
}

export const logout = async () => {
    await supabase.auth.signOut();
}