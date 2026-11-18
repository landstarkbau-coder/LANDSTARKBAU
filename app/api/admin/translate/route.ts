// app/api/admin/translate/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { text, from = 'UK', to } = await req.json()

    if (!text || !to) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    if (text.length > 50000) {
      return NextResponse.json(
        { error: 'Text is too long (max 50k chars)' },
        { status: 400 }
      )
    }

    const apiKey = process.env.DEEPL_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepL API key not configured' },
        { status: 500 }
      )
    }

    const isFree = apiKey.endsWith(':fx')
    const baseUrl = isFree
      ? 'https://api-free.deepl.com/v2/translate'
      : 'https://api.deepl.com/v2/translate'

    const sourceLang = from.toUpperCase()
    const targetLang = to.toUpperCase()

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: sourceLang,
        target_lang: targetLang,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('DeepL API error:', err)
      return NextResponse.json(
        { error: `DeepL error: ${response.status}`, details: err },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ translatedText: data.translations[0].text })
  } catch (error: any) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}