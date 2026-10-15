export type LangCode =
  | 'en'
  | 'hi'
  | 'mr'
  | 'gu'
  | 'ta'
  | 'te'
  | 'bn'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'ur'

export const languageOptions: { code: LangCode; name: string; native: string; flag: string; locale: string }[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', locale: 'en-US' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', locale: 'hi-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', locale: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', locale: 'gu-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', locale: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', locale: 'te-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', locale: 'bn-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', locale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', locale: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', locale: 'pa-IN' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', locale: 'ur-PK' },
]

export interface FeatureTranslation {
  title: string
  desc: string
  detail: string
  points: string[]
}

export interface Translations {
  nav: {
    about: string
    features: string
    technology: string
    research: string
    roadmap: string
    adaptive: string
    mentor: string
    dashboard: string
    gallery: string
    testimonials: string
    faq: string
    support: string
    docs: string
    settings: string
    profile: string
    contact: string
    login: string
    signup: string
  }
  hero: {
    eyebrow: string
    title: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    startFree: string
    exploreFeatures: string
    statLanguages: string
    statTutor: string
    statCost: string
    languagesLabel: string
    aiStatus: string
  }
  about: {
    tag: string
    title: string
    subtitle: string
    platformVisionTitle: string
    platformVisionDesc: string
    problemTitle: string
    solutionTitle: string
    problem: string
    solution: string
    problems: string[]
    solutions: string[]
    architectureTitle: string
    architectureSubtitle: string
    timelineTitle: string
    phases: { phase: string; title: string; desc: string }[]
    futureScopeTitle: string
    futurePoints: string[]
  }
  audience: {
    tag: string
    title: string
    subtitle: string
    segments: { segment: string; approach: string; badge: string }[]
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
  featurePage: {
    back: string
    highlights: string
    tryIt: string
  }
  features: {
    tag: string
    title: string
    subtitle: string
    explore: string
    items: Record<string, FeatureTranslation>
  }
  mentor: {
    title: string
    subtitle: string
    listening: string
    thinking: string
    speaking: string
    ready: string
    selectPedagogy: string
    askPlaceholder: string
    send: string
    personaActive: string
    welcomeMessage: string
    sampleQuestion: string
    modes: { id: string; name: string; desc: string }[]
  }
  dashboard: {
    title: string
    subtitle: string
    xpLabel: string
    streakLabel: string
    badgeLabel: string
    masteryLabel: string
    weakTopicsTitle: string
    recentActivityTitle: string
    studentTab: string
    teacherTab: string
    professionalTab: string
    companyTab: string
    viewProfile: string
    learningRoadmap: string
    earlyWarningAlert: string
    topics: { name: string; mastery: string; status: string }[]
  }
  quiz: {
    title: string
    subtitle: string
    question: string
    correct: string
    incorrect: string
    explanation: string
    nextQuestion: string
    viewResults: string
    restartQuiz: string
    score: string
    accuracy: string
    strongAreas: string
    areasToImprove: string
  }
  settings: {
    title: string
    subtitle: string
    languageLabel: string
    toneLabel: string
    normalEnglish: string
    normalDesc: string
    genzEnglish: string
    genzDesc: string
    aiProviderLabel: string
    voiceSpeedLabel: string
    saveBtn: string
    resetProfileBtn: string
    savedSuccess: string
  }
  footer: {
    copy: string
    platform: string
    rights: string
  }
  common: {
    back: string
    enterAura: string
    selectLanguage: string
    continueBtn: string
    learnMore: string
    submitTicket: string
    sendMessage: string
    saveSettings: string
    loginBtn: string
    signupBtn: string
    close: string
    active: string
  }
}

// ─── 1. ENGLISH ───
const en: Translations = {
  nav: {
    about: 'About Platform',
    features: 'Features',
    technology: 'Architecture',
    research: 'Cognitive Science',
    roadmap: 'Roadmap',
    adaptive: 'Adaptive Engine',
    mentor: 'AI Mentor',
    dashboard: 'Dashboard',
    gallery: 'Desktops Showcase',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    support: 'Support',
    docs: 'Documentation',
    settings: 'Settings',
    profile: 'Profile',
    contact: 'Contact Us',
    login: 'Log In',
    signup: 'Get Started',
  },
  hero: {
    eyebrow: 'AI-POWERED ADAPTIVE LEARNING & SKILL GAP PLATFORM',
    title: 'Aura Doesn’t Just Answer. It Manages Your Entire Learning Journey.',
    titleLine1: 'Aura Doesn’t Just Answer.',
    titleLine2: 'It Manages Your Learning Journey.',
    subtitle:
      'Aura understands what you know, discovers what you are missing, adapts how it teaches you, measures whether you improved, and decides what you should learn next.',
    startFree: 'Launch 3D AI Mentor',
    exploreFeatures: 'Explore Learning Profile',
    statLanguages: 'Supported Regional Languages',
    statTutor: 'Adaptive Memory Retention',
    statCost: 'Closed-Loop Cognitive Cycle',
    languagesLabel: '11 Regional Languages Supported',
    aiStatus: 'AI Mentor Active • Voice Engine Online',
  },
  about: {
    tag: 'AI-Powered Adaptive Learning Platform',
    title: 'AURA — Adaptive Learning & Skill-Gap Analysis',
    subtitle:
      'A software platform that understands what a student or professional knows, identifies what they do not know, creates a personalized learning path, continuously assesses progress, and adapts the learning experience accordingly.',
    platformVisionTitle: 'Product Vision & Core Adaptive Cycle',
    platformVisionDesc:
      'ChatGPT gives an answer. Aura manages the learning journey. People have access to information, but do not always know where their knowledge gaps are, how to improve, or whether they are actually improving. Aura solves this through a closed-loop ASSESS → ANALYZE → PERSONALIZE → TEACH → TEST → MEASURE → ADAPT engine.',
    problemTitle: 'Core Problem in Learning Today',
    solutionTitle: 'The AURA Adaptive Solution Engine',
    problem: 'Core Problem in Learning Today',
    solution: 'The AURA Adaptive Solution Engine',
    problems: [
      'Access to information does not equal knowing what you need to learn',
      'Generic AI chatbots suffer from context amnesia and passive question-answering',
      'Teachers cannot continuously monitor every student’s individual understanding',
      'Course completion in enterprises does not reflect actual conceptual retention',
    ],
    solutions: [
      'Mathematical knowledge-gap detection classifying topics from Strong to Critical Gap',
      'Dynamic pedagogy modes (Story, Visual, Deep Proof, Exam, Practical) with Gen-Z study companion tone',
      'Multi-role intelligence: Student profiles, Teacher class analytics, Professional skill roadmaps, and Company training metrics',
      'Continuous early-warning detection for at-risk declining students before exams',
    ],
    architectureTitle: 'Enterprise System Architecture',
    architectureSubtitle:
      'Decoupled multi-provider architecture connecting Next.js clients to Express APIs, MongoDB Atlas, Cloudinary CDN, and AI Inferencing Engines.',
    timelineTitle: 'Commercial Product Milestones',
    phases: [
      { phase: 'Phase 1', title: 'Adaptive Learning Core', desc: 'Knowledge gap engine, mathematical score classification, and persistent profile state.' },
      { phase: 'Phase 2', title: '3D AI Character Mentor & Voice', desc: 'Three.js VRM avatar with real-time emotion triggers, Gen-Z study companion tone, and Web Speech TTS.' },
      { phase: 'Phase 3', title: 'Multi-Role Analytics Dashboards', desc: 'Dedicated views for Students, College faculty, Working Professionals, and Companies.' },
      { phase: 'Phase 4', title: 'Interactive Assessment Engine', desc: 'Diagnostic testing, adaptive difficulty scaling, and early warning decline alerts.' },
      { phase: 'Phase 5', title: 'Multilingual Regional Deployment', desc: 'End-to-end localization and natural tone adaptation across 11 Indian and global languages.' },
    ],
    futureScopeTitle: 'Enterprise Expansion & AI Roadmap',
    futurePoints: [
      'Continuous Speech Viva: Real-time conversational oral examination and grading.',
      'Institutional LMS Integration: Deep LTI interoperability with Canvas, Moodle, and Blackboard.',
      'Automated Prerequisite Graph Generation: Real-time knowledge dependency trees across university curriculums.',
    ],
  },
  audience: {
    tag: 'Learner Segment Matrix',
    title: 'Target Audience & Learning Segment Matrix',
    subtitle: 'Tailored pedagogical strategies for every learning stage and cognitive level.',
    segments: [
      {
        segment: 'Primary / Middle School',
        approach: 'Story-driven, highly visual explanations, basic math/science, and intense gamification.',
        badge: 'Interactive & Visual',
      },
      {
        segment: 'High School & College',
        approach: 'Deep learning, exam preparation, programming practices (Python/DBMS), and document analysis.',
        badge: 'Deep Learning & Exams',
      },
      {
        segment: 'Working Professionals',
        approach: 'Skill gap analysis, 4-week career upskilling roadmaps, tool masteries (Docker, AWS, Node.js), and production architecture.',
        badge: 'Upskilling & Reskilling',
      },
      {
        segment: 'Lifelong Learners',
        approach: 'Flexible topic exploration, conversational audio tutoring, and cross-disciplinary concepts.',
        badge: 'Conversational Audio',
      },
    ],
  },
  cta: {
    title: 'Ready to Transform Your Learning Journey?',
    subtitle: 'Experience personalized AI mentoring with dynamic voice tutoring and adaptive cognitive memory.',
    button: 'Launch AI Workspace Free',
  },
  featurePage: {
    back: 'Back to Platform Features',
    highlights: 'Key Capabilities & Technical Highlights',
    tryIt: 'Try This Module in AI Mentor',
  },
  features: {
    tag: 'Platform Capabilities',
    title: 'Engineered for Maximum Retention',
    subtitle: 'Explore the suite of interactive tools powering the AURA learning operating system.',
    explore: 'Explore Module',
    items: {
      'ai-tutor': {
        title: 'AI Character Tutor',
        desc: 'Interactive persona with dynamic expressions, 11-language voice, and real-time speech synthesis.',
        detail: 'Meet your personal AI mentor that adapts its teaching style, remembers historical mistakes, and speaks in your preferred language.',
        points: ['Dynamic character expressions', '11-language voice synthesis', 'Persistent memory engine', 'Adaptive pedagogy mode shifting'],
      },
      'document-explainer': {
        title: 'Document Explainer & Summarizer',
        desc: 'Parse PDF, PPTX, and DOCX files for instant summaries and granular concept breakdown.',
        detail: 'Transform static textbooks and slide decks into interactive summaries and automated flashcard decks.',
        points: ['PDF, PPTX & DOCX support', 'Automatic flashcard generation', 'Granular concept extraction', 'Contextual document Q&A'],
      },
      'quiz-generator': {
        title: 'Knowledge-Gap Detection Engine',
        desc: 'Automated evaluation mechanics generating targeted questions for weak cognitive areas.',
        detail: 'Assess knowledge in real-time with AI-crafted quizzes and mock viva questions based on your performance history.',
        points: ['Dynamic question generation', 'Weak area targeting', 'Mock viva voice mode', 'Instant explanation breakdown'],
      },
      'virtual-desktops': {
        title: 'Virtual Desktops & Whiteboards',
        desc: 'Dedicated workspaces supporting code sandboxes, drawing canvas, and diagram tools.',
        detail: 'Interactive canvas environments for coding practice, architectural drawing, and visual math explanations.',
        points: ['Live code execution sandbox', 'Vector drawing canvas', 'Diagram visualization', 'Multi-tab workspace state'],
      },
      gamification: {
        title: 'Gamification Engine',
        desc: 'XP points, daily streaks, rank badges, and interactive roadmap progression.',
        detail: 'Stay motivated with daily achievement trackers, streak shields, global leaderboards, and skill tree unlocks.',
        points: ['XP & level progression', 'Streak counter & shields', 'Milestone badges', 'Skill tree maps'],
      },
      'progress-dashboard': {
        title: 'Unified Progress Dashboard',
        desc: 'Centralized analytics tracking cognitive levels, identified weak topics, and study roadmaps.',
        detail: 'Comprehensive view of your learning velocity, master topics, and recommended next steps.',
        points: ['Real-time XP analytics', 'Weak topic heatmaps', 'Personalized roadmaps', 'Cognitive history retention'],
      },
    },
  },
  mentor: {
    title: 'Interactive AI Character Mentor',
    subtitle: 'Experience dynamic character responses, real-time voice synthesis, and custom pedagogy modes.',
    listening: 'Listening to your voice input...',
    thinking: 'Analyzing context & synthesizing response...',
    speaking: 'Speaking response in your selected language...',
    ready: 'Ready for your question',
    selectPedagogy: 'Pedagogy Mode',
    askPlaceholder: 'Ask AURA anything (e.g. Explain SQL joins using a story)...',
    send: 'Ask Mentor',
    personaActive: 'Persona Active • 100% Adaptive Memory Engine',
    welcomeMessage: 'Hello! I am AURA, your personal adaptive AI mentor. How can I help you master a concept today?',
    sampleQuestion: 'Explain SQL LEFT JOIN with visual analogies',
    modes: [
      { id: 'story', name: 'Storytelling Mode 📖', desc: 'Metaphors, visual narratives, and engaging analogies.' },
      { id: 'visual', name: 'Visual Diagram Mode 🎨', desc: 'Concept maps, code structures, and visual breakdowns.' },
      { id: 'deep', name: 'Deep Learning Mode 🧠', desc: 'First-principles reasoning and mathematical depth.' },
      { id: 'exam', name: 'Exam Prep Mode 📝', desc: 'Concise key points, formula highlights, and practice questions.' },
      { id: 'practical', name: 'Practical Hands-on 🛠️', desc: 'Real-world code, projects, and step-by-step implementation.' },
    ],
  },
  dashboard: {
    title: 'Unified Progress Dashboard',
    subtitle: 'Track your cognitive progress, XP gains, active streaks, and weak topic focus areas.',
    xpLabel: 'Total XP Earned',
    streakLabel: 'Active Streak',
    badgeLabel: 'Rank Badge',
    masteryLabel: 'Mastery Index',
    weakTopicsTitle: 'Identified Focus Areas & Heatmap',
    recentActivityTitle: 'Recent Learning Sessions',
    studentTab: 'Student Profile',
    teacherTab: 'College / Faculty Analytics',
    professionalTab: 'Working Professional Upskilling',
    companyTab: 'Enterprise Training',
    viewProfile: 'View Learning Profile',
    learningRoadmap: 'Your AURA Learning Roadmap',
    earlyWarningAlert: 'Performance Decline Alert',
    topics: [
      { name: 'Python Programming', mastery: '82%', status: 'Strong' },
      { name: 'SQL & Database Queries', mastery: '64%', status: 'Intermediate' },
      { name: 'DBMS Normalization', mastery: '51%', status: 'Needs Improvement' },
      { name: 'Computer Networks', mastery: '46%', status: 'Critical Gap' },
    ],
  },
  quiz: {
    title: 'Diagnostic Knowledge-Gap Assessment',
    subtitle: 'Targeted drill to evaluate sub-topic understanding and adapt difficulty.',
    question: 'Question',
    correct: 'Correct Response',
    incorrect: 'Misconception Detected',
    explanation: 'Conceptual Explanation',
    nextQuestion: 'Next Question',
    viewResults: 'View Assessment Results',
    restartQuiz: 'Restart Assessment',
    score: 'Assessment Score',
    accuracy: 'Accuracy Rate',
    strongAreas: 'Strong Concept Areas',
    areasToImprove: 'Identified Knowledge Gaps',
  },
  settings: {
    title: 'Settings & Preferences',
    subtitle: 'Configure conversational tone, role perspective, AI inferencing providers, and localization.',
    languageLabel: 'Platform Language (11 Languages)',
    toneLabel: 'AURA Conversational Personality & Tone',
    normalEnglish: 'Normal English (Clear & Professional)',
    normalDesc: 'Clear, natural, professional, and easy to understand.',
    genzEnglish: 'Gen-Z English (Casual & Playful)',
    genzDesc: 'Casual, friendly, modern, smart, and slightly playful.',
    aiProviderLabel: 'AI Inferencing Engine & Cost Management',
    voiceSpeedLabel: 'Voice Speech Synthesis Speed',
    saveBtn: 'Save Settings',
    resetProfileBtn: 'Reset Learning Profile',
    savedSuccess: 'Preferences saved successfully!',
  },
  footer: {
    copy: 'AURA — AI-Powered Adaptive Learning & Skill-Gap Analysis Platform.',
    platform: 'Enterprise AI Platform • Web & Mobile',
    rights: 'All rights reserved.',
  },
  common: {
    back: 'Back to Home',
    enterAura: 'Enter AURA',
    selectLanguage: 'Choose Platform Language',
    continueBtn: 'Continue to Application',
    learnMore: 'Learn More',
    submitTicket: 'Submit Support Ticket',
    sendMessage: 'Send Message',
    saveSettings: 'Save Preferences',
    loginBtn: 'Enter Workspace',
    signupBtn: 'Create Profile & Launch',
    close: 'Close',
    active: 'Active',
  },
}

// ─── 2. HINDI (हिन्दी) ───
const hi: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'प्लेटफॉर्म के बारे में',
    features: 'विशेषताएं',
    technology: 'आर्किटेक्चर',
    research: 'कॉग्निटिव साइंस',
    roadmap: 'रोडमैप',
    adaptive: 'एडैप्टिव इंजन',
    mentor: 'एआई मेंटर',
    dashboard: 'डैशबोर्ड',
    support: 'सहायता',
    docs: 'दस्तावेज़',
    settings: 'सेटिंग्स',
    profile: 'प्रोफाइल',
    contact: 'संपर्क करें',
    login: 'लॉग इन',
    signup: 'शुरू करें',
  },
  hero: {
    ...en.hero,
    eyebrow: 'एआई-संचालित अनुकूलनीय शिक्षण और कौशल-अंतर विश्लेषण',
    title: 'ऑरा केवल उत्तर नहीं देता। यह आपकी पूरी सीखने की यात्रा का प्रबंधन करता है।',
    titleLine1: 'ऑरा केवल उत्तर नहीं देता।',
    titleLine2: 'यह सीखने की यात्रा का प्रबंधन करता है।',
    subtitle: 'ऑरा समझता है कि आप क्या जानते हैं, क्या सीखना बाकी है, सिखाने का तरीका बदलता है और सुधार मापता है।',
    startFree: '3D एआई मेंटर शुरू करें',
    exploreFeatures: 'लर्निंग प्रोफाइल देखें',
    statLanguages: '11 समर्थित क्षेत्रीय भाषाएं',
    statTutor: 'अनुकूलनीय मेमोरी रिटेंशन',
    statCost: 'क्लोज्ड-लूप कॉग्निटिव चक्र',
    languagesLabel: '11 क्षेत्रीय भाषाओं का समर्थन',
    aiStatus: 'एआई मेंटर सक्रिय • वॉयस इंजन ऑनलाइन',
  },
  about: {
    ...en.about,
    tag: 'एआई-संचालित एडैप्टिव लर्निंग प्लेटफॉर्म',
    title: 'AURA — अनुकूलनीय शिक्षण और कौशल-अंतर विश्लेषण',
    subtitle: 'एक ऐसा सॉफ्टवेयर प्लेटफॉर्म जो छात्र या पेशेवर के ज्ञान को समझकर व्यक्तिगत शिक्षण पथ बनाता है।',
    platformVisionTitle: 'उत्पाद दृष्टिकोण और मुख्य चक्र',
    platformVisionDesc: 'ChatGPT केवल एक उत्तर देता है। Aura पूरी सीखने की यात्रा का प्रबंधन करता है।',
    problemTitle: 'शिक्षा में मुख्य चुनौतियाँ',
    solutionTitle: 'AURA का समाधान इंजन',
  },
  mentor: {
    ...en.mentor,
    title: 'इंटरैक्टिव 3D एआई कैरेक्टर मेंटर',
    subtitle: 'वास्तविक समय में वॉयस सिंथेसिस, अभिव्यक्ति और कस्टम शिक्षण मोड का अनुभव करें।',
    listening: 'आपकी आवाज सुनी जा रही है...',
    thinking: 'विश्लेषण और उत्तर तैयार किया जा रहा है...',
    speaking: 'उत्तर दिया जा रहा है...',
    ready: 'आपके प्रश्न के लिए तैयार',
    selectPedagogy: 'शिक्षण मोड चुनें',
    askPlaceholder: 'ऑरा से कुछ भी पूछें (उदा. SQL JOINs को कहानी से समझाएं)...',
    send: 'पूछें',
    welcomeMessage: 'नमस्ते! मैं AURA हूँ, आपका व्यक्तिगत 3D एआई मेंटर। आज आप क्या सीखना चाहते हैं?',
  },
  dashboard: {
    ...en.dashboard,
    title: 'एकीकृत प्रगति डैशबोर्ड',
    subtitle: 'अपनी प्रगति, एक्सपी, स्ट्रीक और कमजोर विषयों के हीटमैप को ट्रैक करें।',
    studentTab: 'छात्र प्रोफाइल',
    teacherTab: 'कॉलेज / शिक्षक एनालिटिक्स',
    professionalTab: 'वर्किंग प्रोफेशनल अपस्किलिंग',
    companyTab: 'कंपनी ट्रेनिंग',
    viewProfile: 'लर्निंग प्रोफाइल देखें',
    learningRoadmap: 'आपका AURA लर्निंग रोडमैप',
    earlyWarningAlert: 'प्रदर्शन गिरावट चेतावनी',
  },
  quiz: {
    ...en.quiz,
    title: 'नैदानिक ज्ञान-अंतर मूल्यांकन',
    subtitle: 'उप-विषय की समझ का परीक्षण और कठिनाई का अनुकूलन।',
    question: 'प्रश्न',
    correct: 'सही उत्तर',
    incorrect: 'गलत उत्तर / सुधार आवश्यक',
    explanation: 'विस्तृत व्याख्या',
    nextQuestion: 'अगला प्रश्न',
    viewResults: 'परिणाम देखें',
    restartQuiz: 'पुनः प्रारंभ करें',
    score: 'मूल्यांकन अंक',
    strongAreas: 'मजबूत विषय',
    areasToImprove: 'कमजोर क्षेत्र (Knowledge Gaps)',
  },
  settings: {
    ...en.settings,
    title: 'सेटिंग्स और प्राथमिकताएं',
    subtitle: 'भाषा, बातचीत का लहजा, भूमिका और एआई प्रदाता कॉन्फ़िगर करें।',
    languageLabel: 'प्लेटफॉर्म भाषा (11 भाषाएं)',
    toneLabel: 'बातचीत की शैली और व्यक्तित्व',
    normalEnglish: 'सामान्य अंग्रेज़ी (स्पष्ट और पेशेवर)',
    genzEnglish: 'Gen-Z अंग्रेज़ी (दोस्ताना और आधुनिक)',
    saveBtn: 'सेटिंग्स सुरक्षित करें',
    resetProfileBtn: 'प्रोफाइल रीसेट करें',
    savedSuccess: 'प्राथमिकताएं सफलतापूर्वक सुरक्षित की गईं!',
  },
  common: {
    ...en.common,
    enterAura: 'ऑरा में प्रवेश करें',
    selectLanguage: 'भाषा चुनें',
    saveSettings: 'सेटिंग्स सुरक्षित करें',
    back: 'पीछे जाएं',
  },
}

// ─── 3. MARATHI (मराठी) ───
const mr: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'मंचाबद्दल',
    features: 'वैशिष्ट्ये',
    technology: 'आर्किटेक्चर',
    adaptive: 'ॲडॉप्टिव्ह इंजिन',
    mentor: 'एआय मेंटर',
    dashboard: 'डॅशबोर्ड',
    settings: 'सेटिंग्ज',
    profile: 'प्रोफाइल',
    contact: 'संपर्क करा',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'एआय-आधारित ॲडॉप्टिव्ह लर्निंग आणि स्किल गॅप विश्लेषण मंच',
    title: 'ऑरा फक्त उत्तरे देत नाही. ती तुमचा संपूर्ण शिकण्याचा प्रवास सांभाळते.',
    titleLine1: 'ऑरा फक्त उत्तरे देत नाही.',
    titleLine2: 'ती शिकण्याचा प्रवास सांभाळते.',
    subtitle: 'तुम्हाला काय माहिती आहे ते समजून, ज्ञान-त्रुटी ओळखून तुमच्या गतीने शिकवणारा एआय मार्गदर्शक.',
    startFree: '3D एआय मेंटर सुरू करा',
    exploreFeatures: 'शिकण्याची प्रोफाइल पहा',
    languagesLabel: '११ प्रादेशिक भाषा समर्थित',
  },
  dashboard: {
    ...hi.dashboard,
    title: 'प्रगती डॅशबोर्ड',
    subtitle: 'तुमची बौद्धिक प्रगती, XP आणि कमकुवत विषयांचे विश्लेषण पहा.',
    studentTab: 'विद्यार्थी प्रोफाइल',
    teacherTab: 'शिक्षक / कॉलेज विश्लेषण',
    professionalTab: 'प्रोफेशनल अपस्किलिंग',
    companyTab: 'कंपनी प्रशिक्षण',
    learningRoadmap: 'तुमचा AURA लर्निंग रोडमॅप',
  },
  mentor: {
    ...hi.mentor,
    welcomeMessage: 'नमस्कार! मी AURA आहे, तुमची वैयक्तिक 3D एआय मेंटर. आज आपण काय शिकायचे?',
  },
}

// ─── 4. GUJARATI (ગુજરાતી) ───
const gu: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'પ્લેટફોર્મ વિશે',
    features: 'વિશેષતાઓ',
    technology: 'આર્કિટેક્ચર',
    dashboard: 'ડેશબોર્ડ',
    mentor: 'AI મેન્ટર',
    settings: 'સેટિંગ્સ',
    profile: 'પ્રોફાઇલ',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'AI-સંચાલિત અનુકૂલનશીલ શિક્ષણ અને કૌશલ્ય અંતર વિશ્લેષણ',
    title: 'ઓરા ફક્ત જવાબ નથી આપતી. તે તમારી સંપૂર્ણ શીખવાની યાત્રાનું સંચાલન કરે છે.',
    titleLine1: 'ઓરા ફક્ત જવાબ નથી આપતી.',
    titleLine2: 'તે શીખવાની યાત્રાનું સંચાલન કરે છે.',
    subtitle: 'ઓરા સમજે છે કે તમે શું જાણો છો, શું ખૂટે છે અને તે મુજબ તમને શીખવે છે.',
    startFree: '3D AI મેન્ટર શરૂ કરો',
    exploreFeatures: 'લર્નિંગ પ્રોફાઇલ જુઓ',
    languagesLabel: '૧૧ પ્રાદેશિક ભાષાઓ સમર્થિત',
  },
  dashboard: {
    ...hi.dashboard,
    title: 'પ્રગતિ ડેશબોર્ડ',
    studentTab: 'વિદ્યાર્થી પ્રોફાઇલ',
    teacherTab: 'કોલેજ / શિક્ષક એનાલિટિક્સ',
    professionalTab: 'પ્રોફેશનલ અપસ્કિલિંગ',
    companyTab: 'કંપની તાલીમ',
  },
  mentor: {
    ...hi.mentor,
    welcomeMessage: 'નમસ્તે! હું AURA છું, તમારી 3D AI માર્ગદર્શક. આજે આપણે શું શીખીશું?',
  },
}

// ─── 5. TAMIL (தமிழ்) ───
const ta: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'பற்றி',
    features: 'அம்சங்கள்',
    technology: 'கட்டமைப்பு',
    adaptive: 'கற்றல் என்ஜின்',
    mentor: 'AI ஆசிரியர்',
    dashboard: 'டாஷ்போர்டு',
    settings: 'அமைப்புகள்',
    profile: 'சுயவிவரம்',
    contact: 'தொடர்பு கொள்ள',
    login: 'உள்நுழைக',
    signup: 'தொடங்கவும்',
  },
  hero: {
    ...en.hero,
    eyebrow: 'AI-இயங்கும் தகவமைப்பு கற்றல் மற்றும் திறன் இடைவெளி பகுப்பாய்வு',
    title: 'ஆரா வெறும் பதில்களை மட்டும் தருவதில்லை. அது உங்கள் முழு கற்றல் பயணத்தையும் நிர்வகிக்கிறது.',
    titleLine1: 'ஆரா வெறும் பதில்களை மட்டும் தருவதில்லை.',
    titleLine2: 'முழு கற்றல் பயணத்தையும் நிர்வகிக்கிறது.',
    subtitle: 'நீங்கள் அறிந்ததை புரிந்து, அறியாததை கண்டறிந்து, அதற்கேற்ப தனிப்பயனாக்கி கற்பிக்கும் நுண்ணறிவு தளம்.',
    startFree: '3D AI ஆசிரியரைத் தொடங்குங்கள்',
    exploreFeatures: 'கற்றல் சுயவிவரத்தைப் பார்க்கவும்',
    languagesLabel: '11 பிராந்திய மொழிகள் ஆதரிக்கப்படுகின்றன',
  },
  dashboard: {
    ...en.dashboard,
    title: 'ஒருங்கிணைந்த முன்னேற்ற டாஷ்போர்டு',
    subtitle: 'உங்கள் முன்னேற்றம், XP புள்ளிகள் மற்றும் பலவீனமான தலைப்புகளைக் கண்காணிக்கவும்.',
    studentTab: 'மாணவர் சுயவிவரம்',
    teacherTab: 'கல்லூரி / ஆசிரியர் பகுப்பாய்வு',
    professionalTab: 'தொழில்முறை திறன் மேம்பாடு',
    companyTab: 'நிறுவன பயிற்சி',
    learningRoadmap: 'உங்கள் AURA கற்றல் வரைபடம்',
  },
  mentor: {
    ...en.mentor,
    title: '3D AI கதாபாத்திர ஆசிரியர்',
    welcomeMessage: 'வணக்கம்! நான் AURA, உங்கள் தனிப்பட்ட 3D AI ஆசிரியர். இன்று நாம் என்ன கற்கலாம்?',
    listening: 'உங்கள் குரல் கேட்கப்படுகிறது...',
    thinking: 'பகுப்பாய்வு செய்து பதில் தயாராகிறது...',
    speaking: 'பதில் உரைக்கப்படுகிறது...',
  },
  quiz: {
    ...en.quiz,
    title: 'கற்றல் இடைவெளி மதிப்பீடு',
    question: 'கேள்வி',
    correct: 'சரியான பதில்',
    incorrect: 'தவறான பதில்',
    explanation: 'விளக்கம்',
    nextQuestion: 'அடுத்த கேள்வி',
    viewResults: 'முடிவுகளைக் காண்க',
  },
  settings: {
    ...en.settings,
    title: 'அமைப்புகள்',
    languageLabel: 'தள மொழி (11 மொழிகள்)',
    saveBtn: 'அமைப்புகளைச் சேமிக்கவும்',
  },
}

// ─── 6. TELUGU (తెలుగు) ───
const te: Translations = {
  ...ta,
  nav: {
    ...ta.nav,
    about: 'గురించి',
    features: 'ఫీచర్లు',
    technology: 'ఆర్కిటెక్చర్',
    adaptive: 'అడాప్టివ్ ఇంజిన్',
    mentor: 'AI మెంటార్',
    dashboard: 'డాష్‌బోర్డ్',
    settings: 'సెట్టింగ్‌లు',
    profile: 'ప్రొఫైల్',
    contact: 'సంప్రదించండి',
  },
  hero: {
    ...ta.hero,
    eyebrow: 'AI-ఆధారిత అడాప్టివ్ లెర్నింగ్ మరియు స్కిల్ గ్యాప్ విశ్లేషణ',
    title: 'Aura కేవలం సమాధానాలు ఇవ్వదు. ఇది మీ పూర్తి అభ్యాస ప్రయాణాన్ని నిర్వహిస్తుంది.',
    titleLine1: 'Aura కేవలం సమాధానాలు ఇవ్వదు.',
    titleLine2: 'ఇది అభ్యాస ప్రయాణాన్ని నిర్వహిస్తుంది.',
    subtitle: 'మీకు ఏమి తెలుసో అర్థం చేసుకుని, లోపాలను గుర్తించి, మీ వేగానికి అనుగుణంగా బోధించే AI వేదిక.',
    startFree: '3D AI మెంటార్‌ను ప్రారంభించండి',
    exploreFeatures: 'లెర్నింగ్ ప్రొఫైల్ చూడండి',
    languagesLabel: '11 ప్రాంతీయ భాషల మద్దతు',
  },
  dashboard: {
    ...ta.dashboard,
    title: 'పురోగతి డాష్‌బోర్డ్',
    studentTab: 'విద్యార్థి ప్రొఫైల్',
    teacherTab: 'కాలేజీ / ఫ్యాకల్టీ విశ్లేషణ',
    professionalTab: 'ప్రొఫెషనల్ అప్‌స్కిల్లింగ్',
    companyTab: 'కంపెనీ శిక్షణ',
  },
  mentor: {
    ...ta.mentor,
    welcomeMessage: 'నమస్కారం! నేను AURA, మీ వ్యక్తిగత 3D AI మెంటార్. ఈ రోజు ఏమి నేర్చుకుందాం?',
  },
}

// ─── 7. BENGALI (বাংলা) ───
const bn: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'সম্পর্কে',
    features: 'বৈশিষ্ট্য',
    technology: 'আর্কিটেকচার',
    adaptive: 'এডাপ্টিভ ইঞ্জিন',
    mentor: 'AI মেন্টর',
    dashboard: 'ড্যাশবোর্ড',
    settings: 'সেটিংস',
    profile: 'প্রোফাইল',
    contact: 'যোগাযোগ',
  },
  hero: {
    ...en.hero,
    eyebrow: 'AI-চালিত অভিযোজিত শিক্ষা এবং দক্ষতা ফাঁক বিশ্লেষণ প্ল্যাটফর্ম',
    title: 'Aura কেবল উত্তর দেয় না। এটি আপনার সম্পূর্ণ শেখার যাত্রা পরিচালনা করে।',
    titleLine1: 'Aura কেবল উত্তর দেয় না।',
    titleLine2: 'এটি শেখার যাত্রা পরিচালনা করে।',
    subtitle: 'আপনি কী জানেন তা বুঝে, দুর্বলতা শনাক্ত করে এবং আপনার প্রয়োজন অনুযায়ী ব্যক্তিগতভাবে শেখায়।',
    startFree: '3D AI মেন্টর চালু করুন',
    exploreFeatures: 'লার্নিং প্রোফাইল দেখুন',
    languagesLabel: '১১টি আঞ্চলিক ভাষার সমর্থন',
  },
  dashboard: {
    ...en.dashboard,
    title: 'অগ্রগতি ড্যাশবোর্ড',
    studentTab: 'ছাত্র প্রোফাইল',
    teacherTab: 'শিক্ষক বিশ্লেষণ',
    professionalTab: 'পেশাদার দক্ষতা বৃদ্ধি',
    companyTab: 'কর্পোরেট প্রশিক্ষণ',
    learningRoadmap: 'আপনার AURA লার্নিং রোডম্যাপ',
  },
  mentor: {
    ...en.mentor,
    welcomeMessage: 'নমস্কার! আমি AURA, আপনার ব্যক্তিগত 3D AI মেন্টর। আজ আপনি কী শিখতে চান?',
  },
}

// ─── 8. KANNADA (ಕನ್ನಡ) ───
const kn: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'ಕುರಿತು',
    features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    technology: 'ಆರ್ಕಿಟೆಕ್ಚರ್',
    adaptive: 'ಅಡಾಪ್ಟಿವ್ ಇಂಜಿನ್',
    mentor: 'AI ಮಾರ್ಗದರ್ಶಿ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
  },
  hero: {
    ...en.hero,
    eyebrow: 'AI-ಚಾಲಿತ ಹೊಂದಾಣಿಕೆಯ ಕಲಿಕೆ ಮತ್ತು ಕೌಶಲ್ಯ ಅಂತರ ವಿಶ್ಲೇಷಣೆ',
    title: 'ಆರಾ ಕೇವಲ ಉತ್ತರಿಸುವುದಿಲ್ಲ. ಇದು ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಕಲಿಕೆಯ ಪ್ರಯಾಣವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.',
    titleLine1: 'ಆರಾ ಕೇವಲ ಉತ್ತರಿಸುವುದಿಲ್ಲ.',
    titleLine2: 'ಇದು ಕಲಿಕೆಯ ಪ್ರಯಾಣವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.',
    subtitle: 'ನಿಮಗೆ ಏನು ತಿಳಿದಿದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು, ನಿಮ್ಮ ಕೌಶಲ್ಯ ಅಂತರವನ್ನು ಸರಿಪಡಿಸುವ AI ಪ್ಲಾಟ್‌ಫಾರ್ಮ್.',
    startFree: '3D AI ಮಾರ್ಗದರ್ಶಿ ಪ್ರಾರಂಭಿಸಿ',
    exploreFeatures: 'ಕಲಿಕೆಯ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ',
    languagesLabel: '೧೧ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳ ಬೆಂಬಲ',
  },
  dashboard: {
    ...en.dashboard,
    title: 'ಪ್ರಗತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    studentTab: 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್',
    teacherTab: 'ಶಿಕ್ಷಕರ ವಿಶ್ಲೇಷಣೆ',
    professionalTab: 'ವೃತ್ತಿಪರ ಕೌಶಲ್ಯ ವೃದ್ಧಿ',
    companyTab: 'ಸಂಸ್ಥೆಯ ತರಬೇತಿ',
  },
  mentor: {
    ...en.mentor,
    welcomeMessage: 'ನಮಸ್ಕಾರ! ನಾನು AURA, ನಿಮ್ಮ ವೈಯಕ್ತಿಕ 3D AI ಮಾರ್ಗದರ್ಶಿ. ಇಂದು ನಾವು ಏನು ಕಲಿಯೋಣ?',
  },
}

// ─── 9. MALAYALAM (മലയാളം) ───
const ml: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'കുറിച്ച്',
    features: 'സവിശേഷതകൾ',
    technology: 'ആർക്കിടെക്ചർ',
    adaptive: 'അഡാപ്റ്റീവ് എഞ്ചിൻ',
    mentor: 'AI ട്യൂട്ടർ',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    settings: 'സെറ്റിംഗ്സ്',
    profile: 'പ്രൊഫൈൽ',
  },
  hero: {
    ...en.hero,
    eyebrow: 'AI-അധിഷ്ഠിത അഡാപ്റ്റീവ് ലേണിംഗ് & സ്കിൽ ഗ്യാപ്പ് പ്ലാറ്റ്‌ഫോം',
    title: 'ഓറ വെറുമൊരു ഉത്തരം നൽകലല്ല. ഇത് നിങ്ങളുടെ മുഴുവൻ പഠന യാത്രയെയും നയിക്കുന്നു.',
    titleLine1: 'ഓറ വെറുമൊരു ഉത്തരം നൽകലല്ല.',
    titleLine2: 'പഠന യാത്രയെ നയിക്കുന്നു.',
    subtitle: 'നിങ്ങൾക്ക് എന്തറിയാം എന്ന് മനസ്സിലാക്കി, വിടവുകൾ കണ്ടെത്തി പഠിപ്പിക്കുന്ന നൂതന AI പ്ലാറ്റ്‌ഫോം.',
    startFree: '3D AI ട്യൂട്ടർ ആരംഭിക്കൂ',
    exploreFeatures: 'ലേണിംഗ് പ്രൊഫൈൽ കാണുക',
    languagesLabel: '11 പ്രാദേശിക ഭാഷകളുടെ പിന്തുണ',
  },
  dashboard: {
    ...en.dashboard,
    title: 'പുരോഗതി ഡാഷ്‌ബോർഡ്',
    studentTab: 'വിദ്യാർത്ഥി പ്രൊഫൈൽ',
    teacherTab: 'അധ്യാപക വിശകലനം',
    professionalTab: 'തൊഴിൽ നൈപുണ്യ വികസനം',
    companyTab: 'സ്ഥാപന പരിശീലനം',
  },
  mentor: {
    ...en.mentor,
    welcomeMessage: 'നമസ്കാരം! ഞാൻ AURA, നിങ്ങളുടെ സ്വകാര്യ 3D AI ട്യൂട്ടർ. ഇന്ന് നമുക്ക് എന്ത് പഠിക്കാം?',
  },
}

// ─── 10. PUNJABI (ਪੰਜਾਬੀ) ───
const pa: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'ਬਾਰੇ',
    features: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    technology: 'ਆਰਕੀਟੈਕਚਰ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    mentor: 'AI ਮੈਂਟਰ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'AI-ਸੰਚਾਲਿਤ ਅਨੁਕੂਲ ਸਿੱਖਿਆ ਅਤੇ ਹੁਨਰ ਵਿਸ਼ਲੇਸ਼ਣ',
    title: 'ਔਰਾ ਸਿਰਫ਼ ਜਵਾਬ ਨਹੀਂ ਦਿੰਦੀ। ਇਹ ਤੁਹਾਡੀ ਪੂਰੀ ਸਿੱਖਣ ਯਾਤਰਾ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦੀ ਹੈ।',
    titleLine1: 'ਔਰਾ ਸਿਰਫ਼ ਜਵਾਬ ਨਹੀਂ ਦਿੰਦੀ।',
    titleLine2: 'ਇਹ ਸਿੱਖਣ ਯਾਤਰਾ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦੀ ਹੈ।',
    subtitle: 'ਤੁਹਾਡੀ ਸਮਝ ਅਤੇ ਗਿਆਨ-ਅੰਤਰ ਨੂੰ ਪਛਾਣ ਕੇ ਨਿੱਜੀ ਤੌਰ ਤੇ ਸਿਖਾਉਣ ਵਾਲਾ AI ਪਲੇਟਫਾਰਮ।',
    startFree: '3D AI ਮੈਂਟਰ ਸ਼ੁਰੂ ਕਰੋ',
    exploreFeatures: 'ਸਿੱਖਣ ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ',
    languagesLabel: '11 ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ ਦਾ ਸਮਰਥਨ',
  },
  dashboard: {
    ...hi.dashboard,
    title: 'ਪ੍ਰਗਤੀ ਡੈਸ਼ਬੋਰਡ',
    studentTab: 'ਵਿਦਿਆਰਥੀ ਪ੍ਰੋਫਾਈਲ',
    teacherTab: 'ਅਧਿਆਪਕ ਵਿਸ਼ਲੇਸ਼ਣ',
    professionalTab: 'ਪੇਸ਼ੇਵਰ ਹੁਨਰ ਵਾਧਾ',
    companyTab: 'ਕੰਪਨੀ ਸਿਖਲਾਈ',
  },
  mentor: {
    ...hi.mentor,
    welcomeMessage: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ AURA ਹਾਂ, ਤੁਹਾਡਾ ਨਿੱਜੀ 3D AI ਮੈਂਟਰ। ਅੱਜ ਕੀ ਸਿੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  },
}

// ─── 11. URDU (اردو - RTL SUPPORTED) ───
const ur: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'متعلق',
    features: 'خصوصیات',
    technology: 'آرکیٹیکچر',
    adaptive: 'ایڈاپٹیو انجن',
    mentor: 'AI مینٹور',
    dashboard: 'ڈیش بورڈ',
    settings: 'سیٹنگز',
    profile: 'پروفائل',
    contact: 'رابطہ کریں',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'AI سے چلنے والا تعلیمی اور مہارت کے فرق کا تجزیاتی پلیٹ فارم',
    title: 'Aura صرف جواب نہیں دیتا۔ یہ آپ کے سیکھنے کے پورے سفر کا انتظام کرتا ہے۔',
    titleLine1: 'Aura صرف جواب نہیں دیتا۔',
    titleLine2: 'یہ سیکھنے کے سفر کا انتظام کرتا ہے۔',
    subtitle: 'Aura سمجھتا ہے کہ آپ کیا جانتے ہیں، کیا کمی ہے اور اس کے مطابق آپ کو سکھاتا ہے۔',
    startFree: '3D AI مینٹور شروع کریں',
    exploreFeatures: 'لرننگ پروفائل دیکھیں',
    languagesLabel: '11 علاقائی زبانوں کی سپورٹ',
  },
  dashboard: {
    ...hi.dashboard,
    title: 'پیش رفت کا ڈیش بورڈ',
    studentTab: 'طالب علم کا پروفائل',
    teacherTab: 'کالج / اساتذہ کا تجزیہ',
    professionalTab: 'پیشہ ورانہ مہارت کی ترقی',
    companyTab: 'ادارے کی تربیت',
    learningRoadmap: 'آپ کا AURA لرننگ روڈ میپ',
  },
  mentor: {
    ...hi.mentor,
    welcomeMessage: 'السلام علیکم! میں AURA ہوں، آپ کا ذاتی 3D AI مینٹور۔ آج ہم کیا سیکھیں گے؟',
  },
}

export const translations: Record<LangCode, Translations> = {
  en,
  hi,
  mr,
  gu,
  ta,
  te,
  bn,
  kn,
  ml,
  pa,
  ur,
}

export const featureKeys = [
  'ai-tutor',
  'document-explainer',
  'quiz-generator',
  'virtual-desktops',
  'gamification',
  'progress-dashboard',
] as const

export type FeatureSlug = (typeof featureKeys)[number]
export const featureSlugs = featureKeys

export const featureIcons: Record<FeatureSlug, string> = {
  'ai-tutor': '🤖',
  'document-explainer': '📄',
  'quiz-generator': '🎯',
  'virtual-desktops': '🖥️',
  gamification: '🏆',
  'progress-dashboard': '📊',
}
