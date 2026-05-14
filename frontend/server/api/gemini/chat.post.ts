import { serverSupabaseClient } from '#supabase/server'
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userMessage = body.message

  if (!userMessage) {
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  }

  const config = useRuntimeConfig()
  const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)

  const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })

  const embedResult = await embeddingModel.embedContent({
    content: { role: 'user', parts: [{ text: userMessage }] },
    taskType: TaskType.RETRIEVAL_QUERY,
    outputDimensionality: 768,
  })

  const queryVector = embedResult.embedding.values

  const supabase = await serverSupabaseClient<Database>(event)

  const { data: documents, error } = await supabase.rpc('match_site_documentation', {
    query_embedding: queryVector,
    match_threshold: 0.5,
    match_count: 3,
  })

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  const contextText = documents?.map(doc => doc.content).join('\n\n') || 'No internal documentation found.'

  const systemPrompt = `
  You are 'Hub Assistant', the friendly and professional AI guide for our Scholarship Platform.
  
  CORE BEHAVIOR:
  1. GREETINGS: You are encouraged to respond politely to greetings (hello, hi, good morning), well-wishes, and questions about who you are. Do not introduce yourself every query, only when asked to.
  2. DATA ACCURACY: For any questions regarding scholarships, deadlines, tiers, or platform features, you MUST use ONLY the 'Internal Context' provided.
  3. NO HALLUCINATION: If a user asks a technical or platform question that is NOT in the context, say: "I'm sorry, I don't have information on that. Please contact support."
  4. TONE: Be encouraging, helpful, and concise. Use Markdown for clarity.
`

  const chatModel = genAI.getGenerativeModel({
    model: 'gemini-3.1-flash-lite',
    systemInstruction: systemPrompt,
  })

  const finalPrompt = `
    Internal Context:
    ${contextText}

    User Question:
    ${userMessage}
  `

  const chat = chatModel.startChat({
    history: [
      { role: 'user', parts: [{ text: 'Previous user question' }] },
      { role: 'model', parts: [{ text: 'Previous AI answer' }] },
    ],
  })

  try {
    const result = await chat.sendMessage(finalPrompt)
    const aiResponse = result.response.text()

    return {
      success: true,
      role: 'assistant',
      content: aiResponse,
    }
  }
  catch (error: any) {
    console.error('Gemini Error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate response' })
  }
})
