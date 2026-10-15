import type { DifficultyLevel } from './learning-engine'

export interface QuizQuestion {
  id: string
  topicId: string
  topicName: string
  subtopicName: string
  difficulty: DifficultyLevel
  question: string
  codeSnippet?: string
  options: string[]
  correctIndex: number
  explanation: string
  genZSuccessComment: string
  genZFailComment: string
}

export const QUIZ_BANK: QuizQuestion[] = [
  // ─── SQL JOINs & Queries ───
  {
    id: 'sql-1',
    topicId: 'sql',
    topicName: 'SQL & Database Queries',
    subtopicName: 'JOIN Operations (INNER/LEFT/OUTER)',
    difficulty: 'Beginner',
    question: 'Which SQL JOIN returns all rows from the left table, and the matched rows from the right table (with NULLs for unmatched rows)?',
    options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
    correctIndex: 1,
    explanation: 'A LEFT JOIN guarantees all records from Table A (left) are present. If there is no corresponding row in Table B, NULL values populate Table B’s columns.',
    genZSuccessComment: "Okayyy, that's a W! You nailed LEFT JOIN fundamentals 🔥",
    genZFailComment: "Close 😭 Remember: LEFT JOIN keeps EVERYTHING on the left table, even if the right table leaves it on read with NULLs.",
  },
  {
    id: 'sql-2',
    topicId: 'sql',
    topicName: 'SQL & Database Queries',
    subtopicName: 'JOIN Operations (INNER/LEFT/OUTER)',
    difficulty: 'Intermediate',
    question: 'What is the result of executing an INNER JOIN when there are NO matching keys between Table A and Table B?',
    options: [
      'All rows from Table A with NULLs for Table B',
      'An empty result set (0 rows)',
      'A cartesian product of both tables',
      'A syntax error exception',
    ],
    correctIndex: 1,
    explanation: 'INNER JOIN strictly requires the join condition to evaluate to TRUE. If zero keys match, zero rows are returned in the output.',
    genZSuccessComment: 'Clean answer! INNER JOIN is strict — no match means 0 rows fr.',
    genZFailComment: "Nah 💀 INNER JOIN only shows rows where both tables agree. No match = 0 rows returned.",
  },
  {
    id: 'sql-3',
    topicId: 'sql',
    topicName: 'SQL & Database Queries',
    subtopicName: 'GROUP BY & HAVING',
    difficulty: 'Intermediate',
    question: 'Why does this SQL query throw an error?',
    codeSnippet: 'SELECT department_id, AVG(salary) \nFROM employees \nWHERE AVG(salary) > 50000 \nGROUP BY department_id;',
    options: [
      'GROUP BY must come before WHERE',
      'Aggregate functions like AVG() cannot be evaluated in the WHERE clause; use HAVING instead',
      'department_id must be wrapped in an aggregate function',
      'The salary column cannot be averaged',
    ],
    correctIndex: 1,
    explanation: 'The WHERE clause filters individual rows BEFORE grouping takes place. To filter calculated aggregate groupings (like AVG(salary) > 50k), the HAVING clause must be used.',
    genZSuccessComment: 'You cooked on this one ngl! HAVING filters groups, WHERE filters rows.',
    genZFailComment: "Tricky one 😭 WHERE runs BEFORE the group is formed. You gotta use HAVING for aggregate filters.",
  },
  {
    id: 'sql-4',
    topicId: 'sql',
    topicName: 'SQL & Database Queries',
    subtopicName: 'Subqueries & CTEs',
    difficulty: 'Advanced',
    question: 'What is the primary operational difference between a Common Table Expression (WITH cte AS ...) and a Correlated Subquery?',
    options: [
      'CTEs are only supported in MySQL 5.7',
      'A correlated subquery executes once per outer row, whereas a CTE is defined once and can be referenced like a named temporary view',
      'CTEs cannot accept WHERE clauses',
      'Correlated subqueries always run faster than indexed CTEs',
    ],
    correctIndex: 1,
    explanation: 'A correlated subquery references values from the outer query, re-executing for every candidate row. CTEs improve readability and can be materialized or optimized by modern query planners.',
    genZSuccessComment: 'That answer was immaculate! CTEs make code clean and avoid row-by-row correlation lag.',
    genZFailComment: "Yeah, this one's kinda deep 🧠 Correlated subqueries run row-by-row, which is why CTEs are usually way cleaner.",
  },

  // ─── DBMS & Architecture ───
  {
    id: 'dbms-1',
    topicId: 'dbms',
    topicName: 'DBMS & Storage Architecture',
    subtopicName: 'Normalization (1NF to BCNF)',
    difficulty: 'Beginner',
    question: 'A relational table is in 2nd Normal Form (2NF) if and only if it is in 1NF and:',
    options: [
      'It contains no transitive functional dependencies',
      'Every non-prime attribute is fully functionally dependent on the entire primary key (no partial key dependencies)',
      'Every determinant is a candidate key',
      'All column values are JSON arrays',
    ],
    correctIndex: 1,
    explanation: '2NF removes partial functional dependencies. Every non-key column must depend on the WHOLE primary key, not just a slice of a composite key.',
    genZSuccessComment: 'Solid! 2NF means no partial dependencies — the whole key or nothing.',
    genZFailComment: "Close! 2NF fixes partial dependencies (depending on half the key). Transitive dependencies get fixed in 3NF.",
  },
  {
    id: 'dbms-2',
    topicId: 'dbms',
    topicName: 'DBMS & Storage Architecture',
    subtopicName: 'Transaction Concurrency & Locks',
    difficulty: 'Intermediate',
    question: 'Which ACID property ensures that once a database transaction commits, its changes survive even in the event of an immediate power outage or system crash?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 3,
    explanation: 'Durability ensures committed transaction changes are persisted to non-volatile storage (via Write-Ahead Logging / WAL or data files) and will not be lost during crashes.',
    genZSuccessComment: 'W! Durability means committed data stays written, no matter what crashes.',
    genZFailComment: "Almost! Atomicity is 'all or nothing', but Durability is the one that survives power cuts and crashes.",
  },

  // ─── Computer Networks ───
  {
    id: 'net-1',
    topicId: 'networking',
    topicName: 'Computer Networks',
    subtopicName: 'Subnetting & CIDR Calculation',
    difficulty: 'Beginner',
    question: 'How many usable host IP addresses are available in an IPv4 network configured with a /28 CIDR subnet mask?',
    options: ['16 usable hosts', '14 usable hosts (16 total minus Network & Broadcast)', '30 usable hosts', '12 usable hosts'],
    correctIndex: 1,
    explanation: 'A /28 prefix leaves 32 - 28 = 4 host bits. Total addresses = 2^4 = 16. Subtracting 1 network address and 1 broadcast address leaves 14 usable hosts.',
    genZSuccessComment: 'Math was clean! 2^4 - 2 = 14 usable host IPs.',
    genZFailComment: "Subnetting is tricky at first 💀 Remember the -2 rule: 1 for network ID and 1 for broadcast.",
  },
  {
    id: 'net-2',
    topicId: 'networking',
    topicName: 'Computer Networks',
    subtopicName: 'TCP/IP 3-Way Handshake',
    difficulty: 'Intermediate',
    question: 'What is the exact chronological packet sequence exchanged between client and server during the TCP 3-Way Handshake to establish a reliable connection?',
    options: [
      'ACK → SYN → SYN-ACK',
      'SYN → SYN-ACK → ACK',
      'SYN → ACK → DATA',
      'FIN → ACK → FIN-ACK',
    ],
    correctIndex: 1,
    explanation: 'Client sends SYN (Synchronize sequence number) → Server responds with SYN-ACK (Synchronize + Acknowledge) → Client replies with ACK (Acknowledge).',
    genZSuccessComment: 'SYN → SYN-ACK → ACK! Perfect connection handshake W 🔥',
    genZFailComment: "Handshake went sideways 😭 It's always Client SYN → Server SYN-ACK → Client ACK.",
  },

  // ─── Python Programming ───
  {
    id: 'py-1',
    topicId: 'python',
    topicName: 'Python Programming',
    subtopicName: 'Functions & Lambdas',
    difficulty: 'Beginner',
    question: 'What is the output of the following Python expression?',
    codeSnippet: 'nums = [1, 2, 3, 4]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, nums)))\nprint(result)',
    options: ['[1, 4, 9, 16]', '[4, 16]', '[2, 4]', '[16]'],
    correctIndex: 1,
    explanation: 'filter(lambda x: x % 2 == 0, nums) extracts even numbers [2, 4]. Then map(lambda x: x ** 2, ...) squares each element to produce [4, 16].',
    genZSuccessComment: 'Spot on! Filter caught [2, 4] and map squared them to [4, 16] 🎯',
    genZFailComment: "Watch the execution order: filter picks [2, 4] first, then map squares them into [4, 16].",
  },
  {
    id: 'py-2',
    topicId: 'python',
    topicName: 'Python Programming',
    subtopicName: 'OOP & Classes',
    difficulty: 'Intermediate',
    question: 'In Python class design, what is the key behavioral difference between a @staticmethod and a @classmethod?',
    options: [
      '@staticmethod can modify class state, while @classmethod cannot',
      '@classmethod receives the class reference (`cls`) as its implicit first parameter, whereas @staticmethod receives neither `self` nor `cls`',
      '@staticmethod is deprecated in Python 3.10+',
      '@classmethod cannot be called without an instantiated object',
    ],
    correctIndex: 1,
    explanation: '@classmethod receives `cls` as its first parameter, allowing factory constructors and class-state access. @staticmethod is a plain function scoped inside the class namespace.',
    genZSuccessComment: 'Clean distinction! @classmethod gets `cls`, @staticmethod is just a standalone utility in the class.',
    genZFailComment: "Close! Remember: @classmethod gets the `cls` reference, but @staticmethod gets nothing passed automatically.",
  },

  // ─── Professional Skills (Git, AWS, Docker, Cybersecurity) ───
  {
    id: 'git-1',
    topicId: 'git',
    topicName: 'Git & Version Control',
    subtopicName: 'Branching & Merge Conflicts',
    difficulty: 'Intermediate',
    question: 'What is the difference between `git merge feature` and `git rebase main` on a feature branch?',
    options: [
      'Merge modifies commit hashes, while rebase creates a merge commit',
      'Merge creates a new merge commit joining histories, while rebase rewires the feature commits on top of the tip of main for a linear commit log',
      'Rebase deletes the commit history permanently',
      'Merge cannot be undone with git reflog',
    ],
    correctIndex: 1,
    explanation: 'Git rebase takes the commits from your branch and reapplies them sequentially on top of the target branch, maintaining a clean, linear project history.',
    genZSuccessComment: 'Linear git history W! Rebase replays your commits right on top of main.',
    genZFailComment: "Don't stress, git rebase trips up a lot of people. Merge makes a joint commit, Rebase replays commits on top.",
  },
  {
    id: 'aws-1',
    topicId: 'aws',
    topicName: 'AWS Cloud Architecture',
    subtopicName: 'VPC & IAM Security',
    difficulty: 'Beginner',
    question: 'In AWS IAM, what is the principle of least privilege?',
    options: [
      'Granting full AdministratorAccess to every new engineer for fast onboarding',
      'Granting only the minimal set of permissions and resources required for an entity to perform its specific task',
      'Disabling Multi-Factor Authentication for automated scripts',
      'Storing AWS root access keys in public GitHub repositories',
    ],
    correctIndex: 1,
    explanation: 'Least privilege mandates that users, services, and roles receive only the exact permissions needed to execute their intended operations, minimizing attack surface.',
    genZSuccessComment: 'Locked in! Least privilege means zero excess access.',
    genZFailComment: "Security rule #1: Never give extra keys. Least privilege gives ONLY what's needed to do the job.",
  },
]
