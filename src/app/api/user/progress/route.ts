import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface LeaderboardUser {
  rank: number
  id: string
  name: string
  avatar: string
  xp: number
  streak: number
  level: number
  badge: string
  isCurrentUser?: boolean
}

let LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'u1',
    name: 'Aarav Sharma',
    avatar: '👨‍🎓',
    xp: 6420,
    streak: 28,
    level: 16,
    badge: 'Master Scholar',
  },
  {
    rank: 2,
    id: 'u2',
    name: 'Ananya Deshmukh',
    avatar: '👩‍💻',
    xp: 5890,
    streak: 21,
    level: 15,
    badge: 'Logic Architect',
  },
  {
    rank: 3,
    id: 'u3',
    name: 'Rohan Patel',
    avatar: '🧑‍🔬',
    xp: 5240,
    streak: 19,
    level: 14,
    badge: 'Code Synthesizer',
  },
  {
    rank: 4,
    id: 'u4',
    name: 'Sneha Kulkarni',
    avatar: '👩‍🏫',
    xp: 4950,
    streak: 17,
    level: 13,
    badge: 'Network Specialist',
  },
  {
    rank: 5,
    id: 'u_curr',
    name: 'You (Maria)',
    avatar: '🌟',
    xp: 3850,
    streak: 14,
    level: 12,
    badge: 'Scholar',
    isCurrentUser: true,
  },
  {
    rank: 6,
    id: 'u6',
    name: 'Vikram Joshi',
    avatar: '🧑‍💼',
    xp: 3410,
    streak: 11,
    level: 11,
    badge: 'Learner',
  },
]

export async function GET() {
  return NextResponse.json({
    leaderboard: LEADERBOARD_DATA,
    userStats: {
      xp: 3850,
      streak: 14,
      level: 12,
      accuracy: 72,
      completedTopics: 8,
      totalQuizzes: 25,
      activeHours: 28.5,
      retentionScore: 94.2,
      rank: 5,
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, addedXp = 0 } = body

    if (action === 'addXp') {
      const user = LEADERBOARD_DATA.find((u) => u.isCurrentUser)
      if (user) {
        user.xp += addedXp
        user.level = Math.floor(user.xp / 300) + 1
      }
      // Re-sort leaderboard
      LEADERBOARD_DATA.sort((a, b) => b.xp - a.xp)
      LEADERBOARD_DATA.forEach((u, idx) => {
        u.rank = idx + 1
      })

      return NextResponse.json({
        success: true,
        newXp: user?.xp,
        newRank: user?.rank,
        leaderboard: LEADERBOARD_DATA,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
