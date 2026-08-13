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
    topics: { name: string; mastery: string; status: string }[]
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
    eyebrow: 'Universal AI Learning Companion & Adaptive Education',
    title: 'Learn Smarter with Character AI Mentor',
    titleLine1: 'Learn Smarter with',
    titleLine2: 'Character AI Mentor',
    subtitle:
      'An enterprise AI adaptive education platform that shifts learning from static content to an interactive, persona-driven mentor — tailored to your exact cognitive style, language, and goals.',
    startFree: 'Start Learning Free',
    exploreFeatures: 'Explore Platform',
    statLanguages: 'Supported Languages',
    statTutor: 'Adaptive AI Persona',
    statCost: 'Operational Entry Cost',
    languagesLabel: '11 Regional Languages Supported',
    aiStatus: 'AI Mentor Active • Voice Engine Online',
  },
  about: {
    tag: 'Commercial AI SaaS Platform',
    title: 'AURA — Universal AI Learning Companion',
    subtitle:
      'Production-ready AI adaptive education system engineered to democratize personalized learning using continuous cognitive tracking, multi-file document intelligence, and real-time voice tutoring.',
    platformVisionTitle: 'Product Vision & Commercial Architecture',
    platformVisionDesc:
      'Traditional e-learning platforms deliver static, one-size-fits-all content resulting in high drop-off rates. AURA introduces an adaptive character framework that modifies its pedagogy dynamically — explaining complex subjects with custom analogies, visual breakdowns, or mathematical rigor.',
    problemTitle: 'Core Friction in Education',
    solutionTitle: 'The AURA Solution Engine',
    problem: 'Core Friction in Education',
    solution: 'The AURA Solution Engine',
    problems: [
      'Passive video tutorials lead to rapid student drop-off rates',
      'Generic LLM chatbots suffer context amnesia across learning sessions',
      'Language barriers isolate non-English native speakers globally',
      'Static courseware fails to adapt to learner cognitive maturity',
    ],
    solutions: [
      'Persistent persona framework with historical cognitive memory tracking',
      'Dynamic pedagogy modes (Story, Visual, Deep Proof, Exam, Practical)',
      'Native voice tutoring & localized speech synthesis in 11 languages',
      'Document-aware ingestion pipeline with automated quiz generation',
    ],
    architectureTitle: 'Enterprise System Architecture',
    architectureSubtitle:
      'Multi-layer decoupled cloud architecture connecting Next.js clients to Express APIs, MongoDB Atlas, Cloudinary CDN, and Gemini/Groq LLMs.',
    timelineTitle: 'Commercial Product Milestones',
    phases: [
      { phase: 'Phase 1', title: 'UI System & SaaS Foundation', desc: 'Enterprise React/Next.js foundation with JWT authentication & multi-tenant profile state.' },
      { phase: 'Phase 2', title: 'Cognitive AI Core Integration', desc: 'Unified Gemini & Groq LLM inferencing engine with persistent persona memory.' },
      { phase: 'Phase 3', title: 'Document Intelligence & Voice', desc: 'PDF/PPTX/DOCX parser pipeline, Cloudinary CDN, and Web Speech API hooks.' },
      { phase: 'Phase 4', title: 'Gamification & Analytics', desc: 'Automated quiz generator, XP progress engine, streak shields, and real-time dashboard.' },
      { phase: 'Phase 5', title: 'Global SaaS Cloud Deployment', desc: 'End-to-end performance tuning, 60 FPS optimizations, and cloud scaling.' },
    ],
    futureScopeTitle: 'Enterprise Expansion & AI Roadmap',
    futurePoints: [
      'Bidirectional Voice Dialogue: Continuous speech recognition across regional dialects.',
      'Advanced Multimodal OCR: Microservice pipeline parsing handwritten equations & diagrams.',
      'Virtual 3D/AR Laboratories: Three.js interactive physics and chemistry simulation labs.',
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
        approach: 'Interview preparation, career roadmaps, AI fundamentals, and compact bite-sized modules.',
        badge: 'Career & Upskilling',
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
        title: 'Smart Quiz Generator',
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
    askPlaceholder: 'Ask AURA anything (e.g. Explain Quantum Physics using a story)...',
    send: 'Ask Mentor',
    personaActive: 'Persona Active • 100% Adaptive Memory Engine',
    welcomeMessage: 'Hello! I am AURA, your personal adaptive AI mentor. How can I help you master a concept today?',
    sampleQuestion: 'Explain Quantum Superposition in simple terms',
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
    topics: [
      { name: 'Data Structures & Algorithms', mastery: '68%', status: 'Needs Review' },
      { name: 'Quantum Mechanics Basics', mastery: '45%', status: 'Focus Area' },
      { name: 'Organic Reaction Mechanisms', mastery: '82%', status: 'Proficient' },
      { name: 'Linear Algebra & Matrices', mastery: '94%', status: 'Mastered' },
    ],
  },
  footer: {
    copy: 'AURA — Universal AI Learning Companion & Adaptive Education Platform.',
    platform: 'Enterprise Commercial AI Platform • Web & Mobile',
    rights: 'All rights reserved. Commercial Startup Product Architecture.',
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
    gallery: 'डेस्कटॉप गैलरी',
    testimonials: 'समीक्षाएं',
    faq: 'प्रश्न-उत्तर',
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
    eyebrow: 'सार्वभौमिक एआई शिक्षण साथी और अनुकूलनीय शिक्षा',
    title: 'एआई कैरेक्टर मेंटर के साथ स्मार्ट तरीके से सीखें',
    titleLine1: 'स्मार्ट तरीके से सीखें',
    titleLine2: 'एआई कैरेक्टर मेंटर के साथ',
    subtitle:
      'एक व्यावसायिक अनुकूलनशील एआई शिक्षा प्लेटफॉर्म जो आपकी सीखने की शैली, भाषा और लक्ष्यों के अनुसार व्यक्तिगत मेंटर प्रदान करता है।',
    startFree: 'मुफ्त में शुरू करें',
    exploreFeatures: 'विशेषताएं देखें',
    statLanguages: 'समर्थित भाषाएं',
    statTutor: 'अनुकूलनीय एआई मेंटर',
    statCost: 'प्रारंभिक लागत',
    languagesLabel: '11 क्षेत्रीय भाषाओं का समर्थन',
    aiStatus: 'एआई मेंटर सक्रिय • वॉयस इंजन ऑनलाइन',
  },
  about: {
    ...en.about,
    tag: 'व्यावसायिक एआई प्लेटफॉर्म',
    title: 'AURA — सार्वभौमिक एआई शिक्षण साथी',
    subtitle: 'निरंतर शिक्षण ट्रैकिंग, बहु-दस्तावेज़ बुद्धिमत्ता और वास्तविक समय वॉयस ट्यूटरिंग के साथ तैयार किया गया व्यावसायिक एआई शिक्षा प्लेटफॉर्म।',
    platformVisionTitle: 'उत्पाद दृष्टिकोण और आर्किटेक्चर',
    platformVisionDesc: 'पारंपरिक ई-लर्निंग प्लेटफॉर्म सभी के लिए एक जैसी सामग्री देते हैं। ऑरा (AURA) एक अनुकूलनशील कैरेक्टर फ्रेमवर्क पेश करता है जो किसी भी अवधारणा को आपकी भाषा और शैली में समझाता है।',
    problemTitle: 'शिक्षा में मुख्य चुनौतियाँ',
    solutionTitle: 'AURA का समाधान इंजन',
    problem: 'शिक्षा में मुख्य चुनौतियाँ',
    solution: 'AURA का समाधान इंजन',
  },
  mentor: {
    ...en.mentor,
    title: 'इंटरैक्टिव एआई कैरेक्टर मेंटर',
    subtitle: 'वास्तविक समय में वॉयस सिंथेसिस और कस्टम शिक्षण मोड का अनुभव करें।',
    listening: 'आपकी आवाज सुनी जा रही है...',
    thinking: 'संदर्भ का विश्लेषण और उत्तर तैयार किया जा रहा है...',
    speaking: 'आपकी चुनी हुई भाषा में उत्तर दिया जा रहा है...',
    ready: 'आपके प्रश्न के लिए तैयार',
    selectPedagogy: 'शिक्षण मोड चुनें',
    askPlaceholder: 'ऑरा से कुछ भी पूछें (उदा. कहानी के माध्यम से क्वांटम भौतिकी समझाएं)...',
    send: 'पूछें',
    personaActive: 'मेंटर सक्रिय • 100% अनुकूलनीय मेमोरी',
    welcomeMessage: 'नमस्ते! मैं AURA हूँ, आपका व्यक्तिगत एआई मेंटर। आज आप क्या सीखना चाहते हैं?',
    sampleQuestion: 'सरल शब्दों में क्वांटम सुपरपोज़िशन समझाएं',
  },
}

const mr: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'मंचाबद्दल',
    features: 'वैशिष्ट्ये',
    technology: 'आर्किटेक्चर',
    research: 'संशोधन',
    roadmap: 'रोडमॅप',
    adaptive: 'ॲडॉप्टिव्ह इंजिन',
    mentor: 'एआय मेंटर',
    dashboard: 'डॅशबोर्ड',
    support: 'मदत',
    settings: 'सेटिंग्ज',
    profile: 'प्रोफाइल',
    contact: 'संपर्क करा',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'सर्वसमावेशक एआय शिक्षण साथी',
    title: 'एआय कॅरेक्टर मेंटरसह स्मार्टपणे शिका',
    titleLine1: 'स्मार्टपणे शिका',
    titleLine2: 'एआय कॅरेक्टर मेंटरसह',
    subtitle: 'एक व्यावसायिक ॲडॉप्टिव्ह शिक्षण मंच जो तुमच्या गरजेनुसार वैयक्तिक मार्गदर्शन देतो.',
    startFree: 'मोफत शिकणे सुरू करा',
    exploreFeatures: 'वैशिष्ट्ये पहा',
    languagesLabel: '११ प्रादेशिक भाषा समर्थित',
  },
}

const gu: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'પ્લેટફોર્મ વિશે',
    features: 'વિશેષતાઓ',
    technology: 'આર્કિટેક્ચર',
    dashboard: 'ડેશબોર્ડ',
    mentor: 'AI મેન્ટર',
    support: 'સહાય',
    settings: 'સેટિંગ્સ',
    profile: 'પ્રોફાઇલ',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'સાર્વત્રિક AI શિક્ષણ સાથી',
    title: 'AI કેરેક્ટર મેન્ટર સાથે સ્માર્ટ રીતે શીખો',
    titleLine1: 'સ્માર્ટ રીતે શીખો',
    titleLine2: 'AI કેરેક્ટર મેન્ટર સાથે',
    subtitle: 'એક પ્રોફેશનલ અનુકૂળ શિક્ષણ મંચ જે વ્યક્તિગત માર્ગદર્શન આપે છે.',
    startFree: 'મફત શરૂ કરો',
    exploreFeatures: 'વિશેષતાઓ જુઓ',
    languagesLabel: '૧૧ પ્રાદેશિક ભાષાઓ સમર્થિત',
  },
}

const ta: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'பற்றி',
    features: 'அம்சங்கள்',
    technology: 'கட்டமைப்பு',
    research: 'ஆராய்ச்சி',
    roadmap: 'வரைபடம்',
    adaptive: 'கற்றல் என்ஜின்',
    mentor: 'AI ஆசிரியர்',
    dashboard: 'டாஷ்போர்டு',
    gallery: 'காட்சியகம்',
    testimonials: 'மதிப்புரைகள்',
    faq: 'கேள்விகள்',
    support: 'உதவி',
    docs: 'ஆவணங்கள்',
    settings: 'அமைப்புகள்',
    profile: 'சுயவிவரம்',
    contact: 'தொடர்பு கொள்ள',
    login: 'உள்நுழைக',
    signup: 'தொடங்கவும்',
  },
  hero: {
    ...en.hero,
    eyebrow: 'அனைவருக்குமான AI கற்றல் துணைவன்',
    title: 'AI ஆசிரியருடன் புத்திசாலித்தனமாக கற்கவும்',
    titleLine1: 'புத்திசாலித்தனமாக',
    titleLine2: 'AI ஆசிரியருடன் கற்கவும்',
    subtitle: 'உங்களுக்கு ஏற்றவாறு கற்பிக்கும் நவீன AI கற்றல் தளம்.',
    startFree: 'இலவசமாக தொடங்கவும்',
    exploreFeatures: 'அம்சங்களை பார்க்க',
    statLanguages: 'ஆதரிக்கப்படும் மொழிகள்',
    statTutor: 'AI ஆசிரியர்',
    statCost: 'செயல்பாட்டு செலவு',
    languagesLabel: '11 பிராந்திய மொழிகள் ஆதரிக்கப்படுகின்றன',
    aiStatus: 'AI ஆசிரியர் தயார் • குரல் ஆன்லைன்',
  },
}

const te: Translations = {
  ...ta,
  nav: {
    ...ta.nav,
    about: 'గురించి',
    features: 'ఫీచర్లు',
    technology: 'ఆర్కిటెక్చర్',
    dashboard: 'డాష్‌బోర్డ్',
    mentor: 'AI మెంటార్',
    support: 'మద్దతు',
    settings: 'సెట్టింగ్‌లు',
    profile: 'ప్రొఫైల్',
    contact: 'సంప్రదించండి',
  },
  hero: {
    ...ta.hero,
    eyebrow: 'సార్వత్రిక AI అభ్యాస సహాయకుడు',
    title: 'AI క్యారెక్టర్ మెంటార్‌తో తెలివిగా నేర్చుకోండి',
    titleLine1: 'తెలివిగా నేర్చుకోండి',
    titleLine2: 'AI క్యారెక్టర్ మెంటార్‌తో',
    subtitle: 'మీకు అనుగుణంగా బోధించే AI అభ్యాస ప్లాట్‌ఫారమ్.',
    startFree: 'ఉచితంగా ప్రారంభించండి',
    exploreFeatures: 'ఫీచర్లు చూడండి',
    languagesLabel: '11 ప్రాంతీయ భాషల మద్దతు',
  },
}

const bn: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'সম্পর্কে',
    features: 'বৈশিষ্ট্য',
    technology: 'আর্কিটেকচার',
    research: 'গবেষণা',
    roadmap: 'রোডম্যাপ',
    adaptive: 'এডাপ্টিভ ইঞ্জিন',
    mentor: 'AI টিউটর',
    dashboard: 'ড্যাশবোর্ড',
    gallery: 'গ্যালারি',
    testimonials: 'মতামত',
    faq: 'প্রশ্নোত্তর',
    support: 'সহায়তা',
    docs: 'নথি',
    settings: 'সেটিংস',
    profile: 'প্রোফাইল',
    contact: 'যোগাযোগ',
    login: 'লগ ইন',
    signup: 'শুরু করুন',
  },
  hero: {
    ...en.hero,
    eyebrow: 'সার্বজনীন AI শিক্ষা সঙ্গী',
    title: 'AI ক্যারেক্টার টিউটরের সাথে স্মার্টভাবে শিখুন',
    titleLine1: 'স্মার্টভাবে শিখুন',
    titleLine2: 'AI ক্যারেক্টার টিউটরের সাথে',
    subtitle: 'একটি অভিযোজিত শিক্ষা প্ল্যাটফর্ম যা ব্যক্তিগত শিক্ষক প্রদান করে।',
    startFree: 'বিনামূল্যে শুরু করুন',
    exploreFeatures: 'বৈশিষ্ট্য দেখুন',
    statLanguages: 'সমর্থিত ভাষা',
    statTutor: 'AI টিউটর',
    statCost: 'ব্যয়',
    languagesLabel: '১১টি আঞ্চলিক ভাষার সমর্থন',
    aiStatus: 'AI টিউটর সক্রিয় • ভয়েস অনলাইন',
  },
}

const kn: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'ಕುರಿತು',
    features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    technology: 'ಆರ್ಕಿಟೆಕ್ಚರ್',
    research: 'ಸಂಶೋಧನೆ',
    roadmap: 'ರೋಡ್‌ಮ್ಯಾಪ್',
    adaptive: 'ಅಡಾಪ್ಟಿವ್ ಇಂಜಿನ್',
    mentor: 'AI ಮಾರ್ಗದರ್ಶಿ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    support: 'ಸಹಾಯ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    login: 'ಲಾಗಿನ್',
    signup: 'ಪ್ರಾರಂಭಿಸಿ',
  },
  hero: {
    ...en.hero,
    eyebrow: 'ಸಾರ್ವತ್ರಿಕ AI ಕಲಿಕಾ ಸಂಗಾತಿ',
    title: 'AI ಕ್ಯಾರಕ್ಟರ್ ಮಾರ್ಗದರ್ಶಿಯೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್ ಆಗಿ ಕಲಿಯಿರಿ',
    titleLine1: 'ಸ್ಮಾರ್ಟ್ ಆಗಿ ಕಲಿಯಿರಿ',
    titleLine2: 'AI ಕ್ಯಾರಕ್ಟರ್ ಮಾರ್ಗದರ್ಶಿಯೊಂದಿಗೆ',
    subtitle: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ಶೈಲಿಗೆ ತಕ್ಕಂತೆ ಕಲಿಸುವ ಸುಧಾರಿತ AI ವೇದಿಕೆ.',
    startFree: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
    exploreFeatures: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    languagesLabel: '೧೧ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳ ಬೆಂಬಲ',
  },
}

const ml: Translations = {
  ...en,
  nav: {
    ...en.nav,
    about: 'കുറിച്ച്',
    features: 'സവിശേഷതകൾ',
    technology: 'ആർക്കിടെക്ചർ',
    research: 'ഗവേഷണം',
    roadmap: 'റോഡ്‌മാപ്പ്',
    adaptive: 'അഡാപ്റ്റീവ് എഞ്ചിൻ',
    mentor: 'AI ട്യൂട്ടർ',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    support: 'സഹായം',
    settings: 'സെറ്റിംഗ്സ്',
    profile: 'പ്രൊഫൈൽ',
    contact: 'ബന്ധപ്പെടുക',
    login: 'ലോഗിൻ',
    signup: 'തുടങ്ങൂ',
  },
  hero: {
    ...en.hero,
    eyebrow: 'സാർവത്രിക AI പഠന സഹായി',
    title: 'AI ക്യാരക്ടർ ട്യൂട്ടറുമൊത്ത് സ്മാർട്ടായി പഠിക്കൂ',
    titleLine1: 'സ്മാർട്ടായി പഠിക്കൂ',
    titleLine2: 'AI ക്യാരക്ടർ ട്യൂട്ടറുമൊത്ത്',
    subtitle: 'നിങ്ങളുടെ വ്യക്തിഗത പഠനരീതിക്ക് അനുയോജ്യമായ AI പ്ലാറ്റ്‌ഫോം.',
    startFree: 'സൗജന്യമായി തുടങ്ങൂ',
    exploreFeatures: 'സവിശേഷതകൾ കാണുക',
    languagesLabel: '11 പ്രാദേശിക ഭാഷകളുടെ പിന്തുണ',
  },
}

const pa: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'ਬਾਰੇ',
    features: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    technology: 'ਆਰਕੀਟੈਕਚਰ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    mentor: 'AI ਮੈਂਟਰ',
    support: 'ਮਦਦ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'ਸਾਰਵਜਨਿਕ AI ਸਿੱਖਿਆ ਸਾਥੀ',
    title: 'AI ਕੈਰੇਕਟਰ ਮੈਂਟਰ ਨਾਲ ਸਮਾਰਟ ਤਰੀਕੇ ਨਾਲ ਸਿੱਖੋ',
    titleLine1: 'ਸਮਾਰਟ ਤਰੀਕੇ ਨਾਲ ਸਿੱਖੋ',
    titleLine2: 'AI ਕੈਰੇਕਟਰ ਮੈਂਟਰ ਨਾਲ',
    subtitle: 'ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਅਤੇ ਲੋੜਾਂ ਅਨੁਸਾਰ ਸਿਖਾਉਣ ਵਾਲਾ ਐਡਵਾਂਸਡ AI ਪਲੇਟਫਾਰਮ।',
    startFree: 'ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ',
    exploreFeatures: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖੋ',
    languagesLabel: '11 ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ ਦਾ ਸਮਰਥਨ',
  },
}

const ur: Translations = {
  ...hi,
  nav: {
    ...hi.nav,
    about: 'متعلق',
    features: 'خصوصیات',
    technology: 'آرکیٹیکچر',
    research: 'تحقیق',
    roadmap: 'روڈ میپ',
    adaptive: 'ایڈاپٹیو انجن',
    mentor: 'AI مینٹور',
    dashboard: 'ڈیش بورڈ',
    support: 'مدد',
    settings: 'سیٹنگز',
    profile: 'پروفائل',
    contact: 'رابطہ کریں',
    login: 'لاگ ان',
    signup: 'شروع کریں',
  },
  hero: {
    ...hi.hero,
    eyebrow: 'عالمگیر AI تعلیمی ساتھی',
    title: 'AI کیریکٹر مینٹور کے ساتھ ہوشیاری سے سیکھیں',
    titleLine1: 'ہوشیاری سے سیکھیں',
    titleLine2: 'AI کیریکٹر مینٹور کے ساتھ',
    subtitle: 'ایک پیشہ ورانہ AI تعلیمی پلیٹ فارم جو آپ کے انداز اور زبان کے مطابق رہنمائی کرتا ہے۔',
    startFree: 'مفت شروع کریں',
    exploreFeatures: 'خصوصیات دیکھیں',
    languagesLabel: '11 علاقائی زبانوں کی سپورٹ',
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
