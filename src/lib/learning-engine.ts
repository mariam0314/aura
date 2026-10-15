// ─── Mathematical Evaluation & Adaptive Learning Engine ───

export type GapClassification = 'Strong' | 'Good' | 'Intermediate' | 'Needs Improvement' | 'Critical Gap'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type UserRole = 'student' | 'college' | 'professional' | 'company' | 'school'

export interface SubtopicMastery {
  name: string
  score: number
  questionsAttempted: number
  questionsCorrect: number
  repeatedMistakes: number
  status: GapClassification
  difficulty: DifficultyLevel
}

export interface TopicMastery {
  id: string
  name: string
  category: string
  overallScore: number
  status: GapClassification
  subtopics: SubtopicMastery[]
  trend: number // +% or -% change
}

export interface LearningRoadmapStep {
  id: string
  title: string
  status: 'completed' | 'in-progress' | 'current' | 'locked' | 'gap-focus'
  duration: string
  description: string
  badge?: string
  prerequisites: string[]
}

export interface EarlyWarningAlert {
  isTriggered: boolean
  severity: 'low' | 'medium' | 'high'
  previousScore: number
  currentScore: number
  percentageDrop: number
  weakAreas: string[]
  recommendedAction: string
}

export interface ClassAnalytics {
  totalStudents: number
  classAverage: number
  strongestTopic: { name: string; score: number }
  weakestTopic: { name: string; score: number }
  studentsNeedingAttention: number
  improvingCount: number
  stableCount: number
  decliningCount: number
  topicGaps: { name: string; score: number; status: GapClassification }[]
  alertStudents: {
    name: string
    rollNo: string
    currentScore: number
    previousScore: number
    trend: 'declining' | 'stable' | 'improving'
    weakAreas: string[]
    actionNeeded: string
  }[]
}

export interface ProfessionalSkillProfile {
  targetRole: string
  track: 'backend' | 'frontend'
  skills: { name: string; score: number; status: GapClassification; category: string }[]
  identifiedTopGap: string
  recommendedNextSkill: string
  roadmapWeeks: {
    week: number
    title: string
    focus: string
    status: 'completed' | 'in-progress' | 'upcoming'
    keySkills: string[]
    realWorldScenario: string
  }[]
  realWorldCompetencies: {
    domain: string
    competency: string
    progress: number
    status: GapClassification
  }[]
}

export interface CompanyTrainingAnalytics {
  moduleName: string
  completionRate: number
  actualUnderstanding: number
  gapDelta: number
  weakConcepts: string[]
  departments: {
    name: string
    completion: number
    understanding: number
    gap: string
  }[]
}

// ─── Mathematical Knowledge Gap Evaluation ───
export function classifyScore(score: number, repeatedMistakes = 0): GapClassification {
  if (score < 40 || repeatedMistakes >= 2) return 'Critical Gap'
  if (score < 60) return 'Needs Improvement'
  if (score < 75) return 'Intermediate'
  if (score < 85) return 'Good'
  return 'Strong'
}

export function calculateAdaptiveDifficulty(
  currentDifficulty: DifficultyLevel,
  accuracyPercentage: number,
  consecutiveSuccessCount: number,
  consecutiveFailCount: number
): { nextDifficulty: DifficultyLevel; recommendation: string } {
  if (accuracyPercentage >= 80 || consecutiveSuccessCount >= 3) {
    if (currentDifficulty === 'Beginner') {
      return { nextDifficulty: 'Intermediate', recommendation: 'Accuracy > 80% — Scaling up to Intermediate challenges 🔥' }
    }
    if (currentDifficulty === 'Intermediate') {
      return { nextDifficulty: 'Advanced', recommendation: 'Promoting to Advanced mastery level 🚀' }
    }
    return { nextDifficulty: 'Advanced', recommendation: 'Maximum difficulty achieved. Mastering edge-cases!' }
  }

  if (accuracyPercentage < 50 || consecutiveFailCount >= 2) {
    if (currentDifficulty === 'Advanced') {
      return { nextDifficulty: 'Intermediate', recommendation: 'High mistake rate. Adapting down to reinforce core patterns.' }
    }
    if (currentDifficulty === 'Intermediate') {
      return { nextDifficulty: 'Beginner', recommendation: 'Reverting to foundational examples & simpler analogies 💡' }
    }
    return { nextDifficulty: 'Beginner', recommendation: 'Reinforcing basics with intuitive story-driven guidance.' }
  }

  return { nextDifficulty: currentDifficulty, recommendation: 'Maintaining steady difficulty.' }
}

export function detectEarlyWarning(previousScore: number, currentScore: number, weakAreas: string[]): EarlyWarningAlert {
  const drop = previousScore - currentScore
  if (drop >= 12 || currentScore < 50) {
    return {
      isTriggered: true,
      severity: drop >= 18 || currentScore < 45 ? 'high' : 'medium',
      previousScore,
      currentScore,
      percentageDrop: drop > 0 ? drop : 0,
      weakAreas,
      recommendedAction: 'Targeted revision required before upcoming assessments.',
    }
  }
  return {
    isTriggered: false,
    severity: 'low',
    previousScore,
    currentScore,
    percentageDrop: drop > 0 ? drop : 0,
    weakAreas: [],
    recommendedAction: 'Performance on track.',
  }
}

// ─── Default Initial Learning Profiles ───
export const INITIAL_STUDENT_TOPICS: TopicMastery[] = [
  {
    id: 'python',
    name: 'Python Programming',
    category: 'Computer Science',
    overallScore: 82,
    status: 'Good',
    trend: 8,
    subtopics: [
      { name: 'Syntax & Types', score: 92, questionsAttempted: 14, questionsCorrect: 13, repeatedMistakes: 0, status: 'Strong', difficulty: 'Advanced' },
      { name: 'Functions & Lambdas', score: 85, questionsAttempted: 12, questionsCorrect: 10, repeatedMistakes: 0, status: 'Strong', difficulty: 'Advanced' },
      { name: 'OOP & Classes', score: 78, questionsAttempted: 10, questionsCorrect: 8, repeatedMistakes: 1, status: 'Good', difficulty: 'Intermediate' },
      { name: 'Decorators & Generators', score: 62, questionsAttempted: 8, questionsCorrect: 5, repeatedMistakes: 1, status: 'Intermediate', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL & Database Queries',
    category: 'Computer Science',
    overallScore: 64,
    status: 'Intermediate',
    trend: 4,
    subtopics: [
      { name: 'SELECT & Filtering', score: 91, questionsAttempted: 12, questionsCorrect: 11, repeatedMistakes: 0, status: 'Strong', difficulty: 'Advanced' },
      { name: 'WHERE & Aggregations', score: 86, questionsAttempted: 10, questionsCorrect: 9, repeatedMistakes: 0, status: 'Strong', difficulty: 'Advanced' },
      { name: 'GROUP BY & HAVING', score: 78, questionsAttempted: 9, questionsCorrect: 7, repeatedMistakes: 0, status: 'Good', difficulty: 'Intermediate' },
      { name: 'Subqueries & CTEs', score: 59, questionsAttempted: 8, questionsCorrect: 4, repeatedMistakes: 1, status: 'Needs Improvement', difficulty: 'Intermediate' },
      { name: 'JOIN Operations', score: 42, questionsAttempted: 12, questionsCorrect: 5, repeatedMistakes: 3, status: 'Critical Gap', difficulty: 'Beginner' },
    ],
  },
  {
    id: 'dbms',
    name: 'DBMS & Database Architecture',
    category: 'Computer Science',
    overallScore: 51,
    status: 'Needs Improvement',
    trend: -6,
    subtopics: [
      { name: 'ER Diagrams & Schemas', score: 74, questionsAttempted: 8, questionsCorrect: 6, repeatedMistakes: 0, status: 'Intermediate', difficulty: 'Intermediate' },
      { name: 'Relational Model', score: 68, questionsAttempted: 9, questionsCorrect: 6, repeatedMistakes: 1, status: 'Intermediate', difficulty: 'Intermediate' },
      { name: 'ACID & Transactions', score: 55, questionsAttempted: 10, questionsCorrect: 5, repeatedMistakes: 2, status: 'Needs Improvement', difficulty: 'Intermediate' },
      { name: 'Normalization (1NF-BCNF)', score: 48, questionsAttempted: 11, questionsCorrect: 5, repeatedMistakes: 2, status: 'Needs Improvement', difficulty: 'Beginner' },
      { name: 'Concurrency & Locks', score: 38, questionsAttempted: 7, questionsCorrect: 2, repeatedMistakes: 2, status: 'Critical Gap', difficulty: 'Beginner' },
    ],
  },
  {
    id: 'statistics',
    name: 'Probability & Statistics',
    category: 'Mathematics',
    overallScore: 73,
    status: 'Intermediate',
    trend: 12,
    subtopics: [
      { name: 'Descriptive Stats', score: 90, questionsAttempted: 10, questionsCorrect: 9, repeatedMistakes: 0, status: 'Strong', difficulty: 'Advanced' },
      { name: 'Probability Distributions', score: 75, questionsAttempted: 8, questionsCorrect: 6, repeatedMistakes: 0, status: 'Good', difficulty: 'Intermediate' },
      { name: 'Bayes Theorem', score: 65, questionsAttempted: 7, questionsCorrect: 4, repeatedMistakes: 1, status: 'Intermediate', difficulty: 'Intermediate' },
      { name: 'Hypothesis Testing', score: 58, questionsAttempted: 6, questionsCorrect: 3, repeatedMistakes: 1, status: 'Needs Improvement', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'networking',
    name: 'Computer Networks',
    category: 'Computer Science',
    overallScore: 46,
    status: 'Critical Gap',
    trend: -13,
    subtopics: [
      { name: 'OSI 7-Layer Model', score: 68, questionsAttempted: 8, questionsCorrect: 5, repeatedMistakes: 1, status: 'Intermediate', difficulty: 'Intermediate' },
      { name: 'IP Addressing & Subnetting', score: 34, questionsAttempted: 10, questionsCorrect: 3, repeatedMistakes: 3, status: 'Critical Gap', difficulty: 'Beginner' },
      { name: 'TCP/UDP Protocols', score: 52, questionsAttempted: 9, questionsCorrect: 4, repeatedMistakes: 2, status: 'Needs Improvement', difficulty: 'Beginner' },
      { name: 'DNS & HTTP/HTTPS', score: 62, questionsAttempted: 7, questionsCorrect: 4, repeatedMistakes: 0, status: 'Intermediate', difficulty: 'Intermediate' },
    ],
  },
]

export const DEFAULT_STUDENT_ROADMAP: LearningRoadmapStep[] = [
  {
    id: 'step-1',
    title: 'Python Core & Lambdas',
    status: 'completed',
    duration: 'Completed',
    description: 'Foundational syntax, functional tools, map/filter, and list comprehensions.',
    prerequisites: [],
  },
  {
    id: 'step-2',
    title: 'Relational Database Fundamentals',
    status: 'completed',
    duration: 'Completed',
    description: 'Relational algebra, SELECT filtering, WHERE clauses, and group aggregations.',
    prerequisites: ['Python Core'],
  },
  {
    id: 'step-3',
    title: 'SQL JOIN Operations Mastery',
    status: 'gap-focus',
    duration: 'Active Target',
    description: 'Remedial unit: INNER vs LEFT vs FULL OUTER joins with visual dataset mapping.',
    badge: 'Critical Gap ⚠',
    prerequisites: ['SQL Filtering'],
  },
  {
    id: 'step-4',
    title: 'DBMS Normalization (1NF to BCNF)',
    status: 'current',
    duration: '3 Days',
    description: 'Eliminating redundancy, functional dependencies, and lossless decomposition.',
    badge: 'Focus Area',
    prerequisites: ['SQL JOINs Mastery'],
  },
  {
    id: 'step-5',
    title: 'Computer Networks Subnetting CIDR',
    status: 'locked',
    duration: 'Upcoming',
    description: 'IP binary addressing, subnet masks, CIDR notation, and network routing.',
    prerequisites: ['DBMS Normalization'],
  },
  {
    id: 'step-6',
    title: 'Advanced Database Systems & Sharding',
    status: 'locked',
    duration: 'Upcoming',
    description: 'Replication, partition keys, CAP theorem, and distributed transactions.',
    prerequisites: ['Computer Networks Subnetting CIDR'],
  },
]

export const INITIAL_ROADMAP = DEFAULT_STUDENT_ROADMAP

export const DEFAULT_CLASS_ANALYTICS: ClassAnalytics = {
  totalStudents: 72,
  classAverage: 68,
  strongestTopic: { name: 'Python Programming', score: 84 },
  weakestTopic: { name: 'Computer Networks', score: 46 },
  studentsNeedingAttention: 8,
  improvingCount: 42,
  stableCount: 18,
  decliningCount: 4,
  topicGaps: [
    { name: 'Python Programming', score: 84, status: 'Strong' },
    { name: 'Probability & Statistics', score: 71, status: 'Good' },
    { name: 'DBMS & Architecture', score: 63, status: 'Intermediate' },
    { name: 'SQL & Query Design', score: 58, status: 'Needs Improvement' },
    { name: 'Computer Networks', score: 46, status: 'Critical Gap' },
  ],
  alertStudents: [
    {
      name: 'Aarav Sharma',
      rollNo: 'CS-2024-042',
      currentScore: 48,
      previousScore: 61,
      trend: 'declining',
      weakAreas: ['Computer Networks (Subnetting)', 'DBMS Normalization', 'SQL JOINs'],
      actionNeeded: 'Immediate targeted diagnostic review on JOINs & Subnets before midterm.',
    },
    {
      name: 'Priya Patel',
      rollNo: 'CS-2024-019',
      currentScore: 52,
      previousScore: 67,
      trend: 'declining',
      weakAreas: ['Computer Networks (TCP 3-Way Handshake)', 'DBMS Locks'],
      actionNeeded: 'Assign Story-Mode explanation for OSI & Concurrency.',
    },
    {
      name: 'Rohan Gupta',
      rollNo: 'CS-2024-068',
      currentScore: 44,
      previousScore: 59,
      trend: 'declining',
      weakAreas: ['SQL Subqueries', 'Networking CIDR', 'Normalization'],
      actionNeeded: 'Prerequisite remediation module scheduled.',
    },
    {
      name: 'Ananya Deshmukh',
      rollNo: 'CS-2024-007',
      currentScore: 50,
      previousScore: 63,
      trend: 'declining',
      weakAreas: ['Computer Networks', 'SQL JOINs'],
      actionNeeded: 'Review targeted practice sets with AI Mentor.',
    },
  ],
}

// ─── WORKING PROFESSIONALS: Learning & Upskilling Profile (Zero Exam Language) ───
export const DEFAULT_PROFESSIONAL_PROFILE: ProfessionalSkillProfile = {
  targetRole: 'Senior Backend Engineer / Cloud Infrastructure',
  track: 'backend',
  skills: [
    { name: 'Node.js & Runtime Internals', score: 82, status: 'Strong', category: 'Backend' },
    { name: 'REST APIs & WebSockets', score: 71, status: 'Good', category: 'Backend' },
    { name: 'MongoDB & Database Modeling', score: 64, status: 'Intermediate', category: 'Database' },
    { name: 'OAuth2 / JWT Authentication', score: 43, status: 'Needs Improvement', category: 'Security' },
    { name: 'Docker & Containerization', score: 38, status: 'Critical Gap', category: 'DevOps' },
    { name: 'AWS Cloud & Deployment Workflow', score: 41, status: 'Critical Gap', category: 'Cloud' },
  ],
  identifiedTopGap: 'Docker Containerization & Production Cloud Deployment',
  recommendedNextSkill: 'Week 1: Docker Fundamentals & Container Lifecycle',
  roadmapWeeks: [
    {
      week: 1,
      title: 'Week 1: Docker Fundamentals & Architecture',
      focus: 'Container isolation, Docker CLI commands, port forwarding, and image caching.',
      status: 'completed',
      keySkills: ['docker run/build/exec', 'Image layers & caching', 'Port binding'],
      realWorldScenario: 'Containerizing a legacy monolithic Node.js service into a clean standalone image.',
    },
    {
      week: 2,
      title: 'Week 2: Containers & Multi-Stage Builds',
      focus: 'Optimizing production image size, alpine baselines, and security vulnerability pruning.',
      status: 'in-progress',
      keySkills: ['Multi-stage Dockerfile', 'Non-root user security', '.dockerignore best practices'],
      realWorldScenario: 'Reducing a 1.2GB development build to a 140MB slim production image.',
    },
    {
      week: 3,
      title: 'Week 3: Docker with Node.js & Microservices',
      focus: 'Docker Compose orchestration, volume mounts for state, and Redis network links.',
      status: 'upcoming',
      keySkills: ['Docker Compose v2', 'Service networking', 'Named volumes & bind mounts'],
      realWorldScenario: 'Orchestrating a 3-service stack: API Gateway, Node.js worker, and Redis cache.',
    },
    {
      week: 4,
      title: 'Week 4: Production Deployment Workflow & Cloud',
      focus: 'AWS ECS Fargate tasks, automated CI/CD GitHub Actions, and zero-downtime rolling deploys.',
      status: 'upcoming',
      keySkills: ['AWS ECS / ECR', 'GitHub Actions CI/CD', 'Health check endpoints'],
      realWorldScenario: 'Automating continuous deployment to AWS ECS with blue-green rollback triggers.',
    },
  ],
  realWorldCompetencies: [
    {
      domain: 'Containerization & Docker Architecture',
      competency: 'Builds secure, multi-stage images and local compose environments.',
      progress: 68,
      status: 'Intermediate',
    },
    {
      domain: 'Backend API Security & Auth',
      competency: 'Implements stateless JWT rotation, rate-limiting, and RBAC middleware.',
      progress: 54,
      status: 'Needs Improvement',
    },
    {
      domain: 'Production Deployment & Cloud CI/CD',
      competency: 'Deploys containerized services to AWS ECS with automated health checks.',
      progress: 42,
      status: 'Critical Gap',
    },
    {
      domain: 'Database Query Optimization',
      competency: 'Indexes compound queries, manages connection pools, and handles transactions.',
      progress: 84,
      status: 'Strong',
    },
  ],
}

export const DEFAULT_COMPANY_TRAINING: CompanyTrainingAnalytics = {
  moduleName: 'Enterprise Cybersecurity & Data Compliance 2026',
  completionRate: 94,
  actualUnderstanding: 68,
  gapDelta: 26,
  weakConcepts: [
    'Spear Phishing Identification & URL Analysis (48% mastery)',
    'Password Entropy & MFA Hardware Tokens (54% mastery)',
    'Customer Data Redaction & GDPR/DPDP Handling (61% mastery)',
  ],
  departments: [
    { name: 'Software Engineering', completion: 98, understanding: 82, gap: 'Low (16% gap)' },
    { name: 'Finance & Accounts', completion: 95, understanding: 59, gap: 'High (36% gap ⚠)' },
    { name: 'Human Resources', completion: 91, understanding: 54, gap: 'Critical (37% gap ⚠)' },
    { name: 'Product & Design', completion: 92, understanding: 76, gap: 'Moderate (16% gap)' },
  ],
}
