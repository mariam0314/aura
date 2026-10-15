import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface QuizQuestion {
  id: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  xpReward: number
}

// Built-in starter bank of high-yield questions
const DEFAULT_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'quiz_sql_join_1',
    topic: 'SQL & Database Queries',
    difficulty: 'Easy',
    question: 'In SQL, what is the key difference between an INNER JOIN and a LEFT OUTER JOIN?',
    options: [
      'INNER JOIN returns all rows from both tables unconditionally',
      'LEFT JOIN returns only rows that have matching values in both tables',
      'LEFT JOIN returns all rows from the left table, with NULLs for non-matching right rows',
      'There is no difference between INNER JOIN and LEFT JOIN',
    ],
    correctIndex: 2,
    explanation:
      'A LEFT OUTER JOIN preserves every row from the left table. If no match is found in the right table, NULL is filled for all right table attributes.',
    xpReward: 50,
  },
  {
    id: 'quiz_sql_join_2',
    topic: 'SQL & Database Queries',
    difficulty: 'Medium',
    question: 'Which clause is evaluated FIRST in a standard SQL query execution order?',
    options: ['SELECT', 'WHERE', 'FROM', 'GROUP BY'],
    correctIndex: 2,
    explanation:
      'SQL execution order starts with FROM (and JOINs), followed by WHERE, GROUP BY, HAVING, SELECT, and finally ORDER BY.',
    xpReward: 75,
  },
  {
    id: 'quiz_cn_subnet_1',
    topic: 'Computer Networks',
    difficulty: 'Medium',
    question: 'Given an IPv4 subnet mask 255.255.255.192 (/26), how many usable host addresses are available per subnet?',
    options: ['62 usable hosts', '64 usable hosts', '30 usable hosts', '128 usable hosts'],
    correctIndex: 0,
    explanation:
      'A /26 subnet leaves 32 - 26 = 6 host bits. 2^6 = 64 total addresses. Subtract 2 (network ID and broadcast address) = 62 usable host addresses.',
    xpReward: 75,
  },
  {
    id: 'quiz_dbms_norm_1',
    topic: 'DBMS Normalization',
    difficulty: 'Hard',
    question: 'A relational schema is in Boyce-Codd Normal Form (BCNF) if and only if:',
    options: [
      'It contains no transitive dependencies and is in 2NF',
      'For every functional dependency X -> Y, X is a superkey',
      'All attributes are prime attributes and atomic',
      'Every non-prime attribute is fully dependent on the primary key',
    ],
    correctIndex: 1,
    explanation:
      'BCNF is a stricter version of 3NF. For every non-trivial functional dependency X -> Y, the determinant X must be a candidate key or superkey.',
    xpReward: 100,
  },
  {
    id: 'quiz_python_mem_1',
    topic: 'Python Programming',
    difficulty: 'Easy',
    question: 'In Python, what is the difference between a mutable and an immutable object?',
    options: [
      'Immutable objects can be altered in-place without changing their memory id',
      'Mutable objects cannot be modified after instantiation (e.g., tuples)',
      'Immutable objects cannot be modified after creation; modifications create a new object (e.g., str, int, tuple)',
      'Python has no concept of immutability',
    ],
    correctIndex: 2,
    explanation:
      'Objects such as integers, strings, and tuples cannot have their state modified after creation. Lists and dictionaries are mutable.',
    xpReward: 50,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get('topic')
  const difficulty = searchParams.get('difficulty')

  let filtered = DEFAULT_QUIZ_BANK
  if (topic) {
    filtered = filtered.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()))
  }
  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase())
  }

  return NextResponse.json({
    questions: filtered.length > 0 ? filtered : DEFAULT_QUIZ_BANK,
    total: filtered.length > 0 ? filtered.length : DEFAULT_QUIZ_BANK.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, topic, count = 3, questionId, selectedIndex, language = 'en' } = body

    // 1. Submit answer and validate
    if (action === 'submit') {
      const q = DEFAULT_QUIZ_BANK.find((item) => item.id === questionId)
      const isCorrect = q ? q.correctIndex === selectedIndex : false
      const xpEarned = isCorrect ? (q?.xpReward || 50) : 10
      const explanation = q?.explanation || 'Evaluation completed.'

      return NextResponse.json({
        success: true,
        isCorrect,
        correctIndex: q?.correctIndex ?? 0,
        xpEarned,
        explanation,
        feedback: isCorrect
          ? '🎯 Excellent understanding! Your cognitive retention index improved.'
          : '⚠ Misconception identified. AURA has logged this topic to your knowledge-gap review queue.',
      })
    }

    // 2. Generate new quiz questions via Gemini AI
    if (action === 'generate') {
      const geminiKey = process.env.GEMINI_API_KEY
      if (geminiKey && topic) {
        try {
          const langPrompt =
            language === 'hi'
              ? 'Return all text in Hindi (हिन्दी).'
              : language === 'mr'
              ? 'Return all text in Marathi (मराठी).'
              : 'Return all text in English.'

          const prompt = `
You are AURA AI educational assessment generator.
Generate ${count} high quality multiple-choice quiz questions on the subject "${topic}".
${langPrompt}

Return ONLY valid JSON matching this exact structure:
[
  {
    "id": "gen_q1",
    "topic": "${topic}",
    "difficulty": "Easy",
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctIndex": 0,
    "explanation": "Clear explanation of why option 1 is correct and others are false",
    "xpReward": 50
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
                  maxOutputTokens: 1500,
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
              const generated = JSON.parse(clean)
              return NextResponse.json({ questions: generated })
            }
          }
        } catch (genErr) {
          console.warn('Gemini quiz generation fallback:', genErr)
        }
      }

      // Fallback: return default questions
      return NextResponse.json({
        questions: DEFAULT_QUIZ_BANK.slice(0, count),
      })
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
