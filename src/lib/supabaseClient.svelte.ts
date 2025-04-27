import { createClient, type Session } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL, PUBLIC_VERCEL_URL } from "$env/static/public";

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export const authState : {session: Session | null, displayName: string} = $state({session: null, displayName: ''})

supabase.auth.onAuthStateChange(async (event, session) => {
    authState.session = session;
    authState.displayName = session?.user.user_metadata.custom_claims.global_name ?? '';
});

const getURL = () => {
    let url = PUBLIC_VERCEL_URL;

    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
}

export const login = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: getURL(),
        },
    });
}

export const logout = async () => {
    await supabase.auth.signOut();
}