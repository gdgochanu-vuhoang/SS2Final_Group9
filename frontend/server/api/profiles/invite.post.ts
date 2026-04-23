import {
    serverSupabaseUser,
    serverSupabaseClient,
    serverSupabaseServiceRole
} from '#supabase/server'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized: You must be logged in.' })
    }

    const client = await serverSupabaseClient(event)
    const { data: profile } = await client
        .from('profiles')
        .select('role')
        .eq('id', user.sub)
        .single()

    if (profile?.role !== 'ADMIN') {
        throw createError({ statusCode: 403, statusMessage: 'Forbidden: You do not have admin privileges.' })
    }

    const adminClient = await serverSupabaseServiceRole(event)

    const body = await readBody(event)

    const { data, error } = await adminClient.auth.admin.inviteUserByEmail(body.email, {
        redirectTo: `${body.url}/auth/callback`,
        data: {
            role: body.role,
            username: body.username
        }
    })

    if (error) {
        throw createError({ statusCode: 400, statusMessage: error.message })
    }

    return { success: true, user: data.user }
})