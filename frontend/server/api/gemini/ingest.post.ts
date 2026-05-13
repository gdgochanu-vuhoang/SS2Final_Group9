import { serverSupabaseServiceRole } from '#supabase/server'
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, content, url } = body

  if (!content) {
    throw createError({ statusCode: 400, statusMessage: 'Content is required' })
  }

  const config = useRuntimeConfig()
  const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })

  try {
    const result = await model.embedContent({
      content: { role: 'user', parts: [{ text: content }] },
      taskType: TaskType.RETRIEVAL_QUERY,
      outputDimensionality: 768,
    })
    const embedding = result.embedding.values

    const supabase = serverSupabaseServiceRole<Database>(event)

    const { error } = await supabase
      .from('site_documentation')
      .insert({
        title,
        content,
        url: url || null,
        embedding,
      })

    if (error) throw error

    return { success: true, message: 'Documentation embedded and saved!' }
  }
  catch (error: any) {
    console.error('Ingestion Error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
