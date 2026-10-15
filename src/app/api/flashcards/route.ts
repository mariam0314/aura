import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export interface FlashcardItem {
  id: string
  topic: string
  front: string
  back: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  mastered?: boolean
}

const DEFAULT_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc_1',
    topic: 'Database Management',
    category: 'ACID Properties',
    front: 'What does the "I" in ACID stand for and why is it crucial?',
    back: 'Isolation: Ensures concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.',
    difficulty: 'Easy',
    mastered: false,
  },
  {
    id: 'fc_2',
    topic: 'Database Management',
    category: 'SQL Performance',
    front: 'What is a B-Tree Index and how does it speed up queries?',
    back: 'A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time (O(log n)).',
    difficulty: 'Medium',
    mastered: false,
  },
  {
    id: 'fc_3',
    topic: 'Networking',
    category: 'OSI Model',
    front: 'Which OSI layer handles routing and logical addressing (IP addresses)?',
    back: 'Layer 3: The Network Layer. It routes packets across multiple networks and assigns IP addresses (e.g. IPv4, IPv6, ICMP, OSPF).',
    difficulty: 'Easy',
    mastered: false,
  },
  {
    id: 'fc_4',
    topic: 'Operating Systems',
    category: 'Concurrency',
    front: 'What are the 4 Coffman conditions required for Deadlock to occur?',
    back: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\nEliminating any ONE condition prevents deadlock.',
    difficulty: 'Hard',
    mastered: false,
  },
  {
    id: 'fc_5',
    topic: 'Software Architecture',
    category: 'Microservices',
    front: 'What is the CAP Theorem in distributed data stores?',
    back: 'It states that any distributed data store can only provide at most TWO of the following three guarantees: Consistency, Availability, and Partition Tolerance.',
    difficulty: 'Hard',
    mastered: false,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get('topic')

  let results = DEFAULT_FLASHCARDS
  if (topic) {
    results = results.filter((f) => f.topic.toLowerCase().includes(topic.toLowerCase()))
  }

  return NextResponse.json({
    flashcards: results.length > 0 ? results : DEFAULT_FLASHCARDS,
    total: results.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, topic, count = 4, language = 'en' } = body

    if (action === 'generate' && topic) {
      const geminiKey = process.env.GEMINI_API_KEY
      if (geminiKey) {
        try {
          const langPrompt =
            language === 'hi'
              ? 'Return all text in Hindi (हिन्दी).'
              : language === 'mr'
              ? 'Return all text in Marathi (मराठी).'
              : 'Return all text in English.'

          const prompt = `
Generate ${count} high-yield educational study flashcards for "${topic}".
${langPrompt}

Return ONLY valid JSON matching this schema:
[
  {
    "id": "gen_fc_1",
    "topic": "${topic}",
    "category": "Category tag",
    "front": "Clear question, prompt, or term",
    "back": "Accurate, concise, multi-bullet or structured definition/answer",
    "difficulty": "Easy"
  }
]
`

          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.3,
                  maxOutputTokens: 1200,
                  responseMimeType: 'application/json',
                },
              }),
            }
          )

          if (res.ok) {
            const data = await res.json()
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) {
              const clean = text.replace(/^```json/m, '').replace(/```$/m, '').trim()
              const cards = JSON.parse(clean)
              return NextResponse.json({ flashcards: cards })
            }
          }
        } catch (err) {
          console.warn('Gemini flashcard generation error, falling back:', err)
        }
      }
    }

    return NextResponse.json({ flashcards: DEFAULT_FLASHCARDS.slice(0, count) })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
