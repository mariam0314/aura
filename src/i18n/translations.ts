export type LangCode = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'te' | 'bn' | 'kn' | 'ml'

export const languageOptions: { code: LangCode; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिन्दी' },
  { code: 'mr', native: 'मराठी' },
  { code: 'gu', native: 'ગુજરાતી' },
  { code: 'ta', native: 'தமிழ்' },
  { code: 'te', native: 'తెలుగు' },
  { code: 'bn', native: 'বাংলা' },
  { code: 'kn', native: 'ಕನ್ನಡ' },
  { code: 'ml', native: 'മലയാളം' },
]

export interface FeatureTranslation {
  title: string
  desc: string
  detail: string
  points: string[]
}

export interface Translations {
  nav: { about: string; features: string; audience: string; getStarted: string }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    startFree: string
    exploreFeatures: string
    languagesLabel: string
    statLanguages: string
    statTutor: string
    statCost: string
  }
  about: {
    tag: string
    title: string
    subtitle: string
    problem: string
    solution: string
    problems: string[]
    solutions: string[]
  }
  features: {
    tag: string
    title: string
    subtitle: string
    explore: string
    items: Record<string, FeatureTranslation>
  }
  audience: {
    tag: string
    title: string
    subtitle: string
    segments: { segment: string; approach: string }[]
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
  footer: {
    copy: string
    authors: string
  }
  featurePage: {
    back: string
    highlights: string
    tryIt: string
  }
}

const featureKeys = [
  'ai-tutor',
  'document-explainer',
  'quiz-generator',
  'virtual-desktops',
  'gamification',
  'progress-dashboard',
] as const

export type FeatureSlug = (typeof featureKeys)[number]

export const featureSlugs = featureKeys

export const translations: Record<LangCode, Translations> = {
  en: {
    nav: { about: 'About', features: 'Features', audience: 'Audience', getStarted: 'Get Started' },
    hero: {
      eyebrow: 'Universal AI Learning Companion',
      title: 'Learn Smarter with',
      subtitle:
        'An AI-powered adaptive education platform that shifts learning from generic chatbots to an interactive, character-driven personal mentor — tailored to your style, language, and level.',
      startFree: 'Start Learning Free',
      exploreFeatures: 'Explore Features',
      languagesLabel: 'Choose your language',
      statLanguages: 'Languages',
      statTutor: 'Adaptive Tutor',
      statCost: 'Entry Cost',
    },
    about: {
      tag: 'About AURA',
      title: 'Your Personal AI Mentor',
      subtitle:
        'Traditional e-learning delivers static, one-size-fits-all content. AURA integrates advanced LLMs to provide personalized instruction tailored to individual learning styles, histories, language needs, and academic levels.',
      problem: 'The Problem',
      solution: 'Our Solution',
      problems: [
        'Passive, text-heavy content leads to low engagement',
        'Generic AI forgets your history and weak areas',
        'Language barriers isolate non-English speakers',
        'Static explanations fail to adapt to learner maturity',
      ],
      solutions: [
        'Character-driven AI with persistent memory',
        'Dynamic pedagogy — Story, Visual, Exam, or Practical modes',
        'Multilingual voice tutoring in 9+ languages',
        'Document-aware learning from your own materials',
      ],
    },
    features: {
      tag: 'Core Features',
      title: 'Everything You Need to Learn',
      subtitle:
        'A complete learning operating system designed to enhance retention, maintain engagement, and democratize personalized education.',
      explore: 'Explore',
      items: {
        'ai-tutor': {
          title: 'AI Character Tutor',
          desc: 'Interactive persona with dynamic expressions, multilingual voice, and text-to-speech.',
          detail: 'Meet your personal AI mentor that adapts its teaching style, remembers your progress, and speaks in your preferred language with natural voice synthesis.',
          points: ['Dynamic character expressions', 'Multilingual text-to-speech', 'Persistent learning memory', 'Adaptive teaching modes'],
        },
        'document-explainer': {
          title: 'Document Explainer',
          desc: 'Upload PDF, PPTX, or DOCX files for summaries and contextual explanations.',
          detail: 'Transform your textbooks and notes into interactive lessons. AURA parses your documents and explains concepts at your level.',
          points: ['PDF, PPTX & DOCX support', 'Auto summaries & flashcards', 'Concept extraction', 'Context-aware Q&A'],
        },
        'quiz-generator': {
          title: 'Smart Quiz Generator',
          desc: 'Automated quizzes and flashcards targeting your weak areas.',
          detail: 'AI-generated assessments from your uploaded materials that focus on topics you struggle with most.',
          points: ['Dynamic question generation', 'Weak-area targeting', 'Instant feedback', 'Mock viva mode'],
        },
        'virtual-desktops': {
          title: 'Virtual Desktops',
          desc: 'Workspaces with code sandboxes, drawing canvas, and visualization.',
          detail: 'Dedicated learning environments for coding practice, visual diagrams, and interactive whiteboard sessions.',
          points: ['Code sandbox integration', 'Drawing canvas', 'Visualization modules', 'Multi-tab workspaces'],
        },
        'gamification': {
          title: 'Gamification Engine',
          desc: 'Earn XP, maintain streaks, unlock badges, and climb leaderboards.',
          detail: 'Stay motivated with a full gamification system that rewards consistent learning and celebrates milestones.',
          points: ['XP & level system', 'Daily streak tracking', 'Achievement badges', 'Global leaderboards'],
        },
        'progress-dashboard': {
          title: 'Progress Dashboard',
          desc: 'Track levels, streaks, weak topics, and active roadmaps in one place.',
          detail: 'A centralized hub showing your entire learning journey, identified gaps, and personalized study paths.',
          points: ['Learning level tracking', 'Weak topic analysis', 'Active roadmaps', 'Streak & XP overview'],
        },
      },
    },
    audience: {
      tag: "Who It's For",
      title: 'Built for Every Learner',
      subtitle: 'AURA scales its complexity seamlessly across different user demographics.',
      segments: [
        { segment: 'Primary & Middle School', approach: 'Story-driven, visual explanations with intense gamification.' },
        { segment: 'High School & College', approach: 'Deep learning, exam prep, programming, and document analysis.' },
        { segment: 'Working Professionals', approach: 'Interview prep, career roadmaps, and compact AI modules.' },
        { segment: 'Lifelong Learners', approach: 'Flexible topic exploration and conversational audio tutoring.' },
      ],
    },
    cta: {
      title: 'Ready to Transform Your Learning?',
      subtitle: 'Join AURA and experience AI-driven personalized education — from Grade 3 science to engineering and beyond.',
      button: 'Launch AURA',
    },
    footer: {
      copy: 'AI-Driven Personalized Learning · Reena Mehta College · 2026–2027',
      authors: 'Mariam Mohammed Shakeel & Aksabano Khan',
    },
    featurePage: { back: 'Back to Features', highlights: 'Key Highlights', tryIt: 'Try This Feature' },
  },

  hi: {
    nav: { about: 'परिचय', features: 'विशेषताएँ', audience: 'दर्शक', getStarted: 'शुरू करें' },
    hero: {
      eyebrow: 'सार्वभौमिक AI शिक्षण साथी',
      title: 'के साथ smarter सीखें',
      subtitle:
        'एक AI-संचालित अनुकूली शिक्षा मंच जो सामान्य चैटबॉट से इंटरैक्टिव, चरित्र-संचालित व्यक्तिगत मेंटर में सीखने को बदलता है — आपकी शैली, भाषा और स्तर के अनुसार।',
      startFree: 'मुफ़्त में सीखना शुरू करें',
      exploreFeatures: 'विशेषताएँ देखें',
      languagesLabel: 'अपनी भाषा चुनें',
      statLanguages: 'भाषाएँ',
      statTutor: 'अनुकूली ट्यूटर',
      statCost: 'प्रवेश लागत',
    },
    about: {
      tag: 'AURA के बारे में',
      title: 'आपका व्यक्तिगत AI मेंटर',
      subtitle:
        'पारंपरिक ई-लर्निंग स्थिर, एक-सा-सबके-लिए सामग्री देती है। AURA उन्नत LLM का उपयोग करके व्यक्तिगत शिक्षण प्रदान करता है।',
      problem: 'समस्या',
      solution: 'हमारा समाधान',
      problems: [
        'निष्क्रिय, टेक्स्ट-भारी सामग्री से कम engagement',
        'सामान्य AI आपका इतिहास और कमज़ोर क्षेत्र भूल जाता है',
        'भाषा की बाधाएँ गैर-अंग्रेज़ी बोलने वालों को अलग करती हैं',
        'स्थिर व्याख्याएँ शिक्षार्थी की परिपक्वता के अनुसार नहीं बदलती',
      ],
      solutions: [
        'स्थायी मेमोरी वाला चरित्र-संचालित AI',
        'गतिशील शिक्षाशास्त्र — कहानी, दृश्य, परीक्षा, या व्यावहारिक',
        '9+ भाषाओं में बहुभाषी आवाज़ ट्यूटरिंग',
        'आपकी सामग्री से दस्तावेज़-जागरूक सीखना',
      ],
    },
    features: {
      tag: 'मुख्य विशेषताएँ',
      title: 'सीखने के लिए सब कुछ',
      subtitle: 'प्रतिधारण बढ़ाने और engagement बनाए रखने के लिए एक संपूर्ण शिक्षण OS।',
      explore: 'देखें',
      items: {
        'ai-tutor': {
          title: 'AI चरित्र ट्यूटर',
          desc: 'गतिशील अभिव्यक्तियों, बहुभाषी आवाज़ और TTS वाला इंटरैक्टिव persona।',
          detail: 'अपने व्यक्तिगत AI मेंटर से मिलें जो आपकी प्रगति याद रखता है और आपकी भाषा में बोलता है।',
          points: ['गतिशील चरित्र अभिव्यक्ति', 'बहुभाषी TTS', 'स्थायी सीखने की मेमोरी', 'अनुकूली शिक्षण मोड'],
        },
        'document-explainer': {
          title: 'दस्तावेज़ व्याख्याकार',
          desc: 'PDF, PPTX, DOCX अपलोड करें — सारांश और व्याख्या पाएं।',
          detail: 'अपनी किताबों और नोट्स को इंटरैक्टिव पाठ में बदलें।',
          points: ['PDF, PPTX & DOCX', 'स्वतः सारांश', 'अवधारणा निष्कर्षण', 'संदर्भ-जागरूक Q&A'],
        },
        'quiz-generator': {
          title: 'स्मार्ट क्विज़ जनरेटर',
          desc: 'आपके कमज़ोर क्षेत्रों को लक्षित करने वाले क्विज़ और flashcards।',
          detail: 'आपकी सामग्री से AI-जनित मूल्यांकन।',
          points: ['गतिशील प्रश्न', 'कमज़ोर क्षेत्र लक्ष्य', 'तुरंत feedback', 'मॉक viva'],
        },
        'virtual-desktops': {
          title: 'वर्चुअल डेस्कटॉप',
          desc: 'कोड sandbox, ड्रॉइंग कैनवास और visualization।',
          detail: 'कोडिंग, आरेख और whiteboard के लिए समर्पित वातावरण।',
          points: ['कोड sandbox', 'ड्रॉइング कैनवास', 'Visualization', 'मल्टी-टैब workspace'],
        },
        'gamification': {
          title: 'गेमिफिकेशन इंजन',
          desc: 'XP कमाएं, streaks बनाए रखें, badges अनलॉक करें।',
          detail: 'लगातार सीखने को पुरस्कृत करने वाली पूर्ण gamification प्रणाली।',
          points: ['XP & level', 'Daily streak', 'Badges', 'Leaderboards'],
        },
        'progress-dashboard': {
          title: 'प्रगति डैशबोर्ड',
          desc: 'स्तर, streaks, कमज़ोर विषय और roadmaps एक जगह।',
          detail: 'आपकी पूरी सीखने की यात्रा दिखाने वाला केंद्रीय hub।',
          points: ['Level tracking', 'कमज़ोर विषय विश्लेषण', 'Roadmaps', 'XP overview'],
        },
      },
    },
    audience: {
      tag: 'किसके लिए',
      title: 'हर शिक्षार्थी के लिए',
      subtitle: 'AURA विभिन्न उपयोगकर्ताओं के लिए अपनी जटिलता seamlessly बढ़ाता है।',
      segments: [
        { segment: 'प्राथमिक & मध्य विद्यालय', approach: 'कहानी-आधारित, दृश्य व्याख्याएँ और gamification।' },
        { segment: 'हाई स्कूल & कॉलेज', approach: 'गहन सीख, परीक्षा तैयारी, प्रोग्रामिंग।' },
        { segment: 'कामकाजी पेशेवर', approach: 'इंटरव्यू prep, career roadmaps।' },
        { segment: 'आजीवन शिक्षार्थी', approach: 'लचीला topic exploration और audio tutoring।' },
      ],
    },
    cta: {
      title: 'अपनी सीख बदलने के लिए तैयार?',
      subtitle: 'AURA से जुड़ें — कक्षा 3 विज्ञान से engineering तक।',
      button: 'AURA लॉन्च करें',
    },
    footer: {
      copy: 'AI-संचालित व्यक्तिगत शिक्षण · Reena Mehta College · 2026–2027',
      authors: 'Mariam Mohammed Shakeel & Aksabano Khan',
    },
    featurePage: { back: 'विशेषताओं पर वापस', highlights: 'मुख्य बिंदु', tryIt: 'यह विशेषता आज़माएँ' },
  },

  mr: {
    nav: { about: 'माहिती', features: 'वैशिष्ट्ये', audience: 'प्रेक्षक', getStarted: 'सुरू करा' },
    hero: {
      eyebrow: 'सार्वत्रिक AI शिक्षण साथी',
      title: 'सोबत smarter शिका',
      subtitle: 'AI-चालित अनुकूल शिक्षण व्यासपीठ जे सामान्य chatbot पासून interactive, character-चालित mentor कडे शिक्षण बदलते.',
      startFree: 'विनामूल्य शिका सुरू करा',
      exploreFeatures: 'वैशिष्ट्ये पहा',
      languagesLabel: 'तुमची भाषा निवडा',
      statLanguages: 'भाषा',
      statTutor: 'अनुकूल शिक्षक',
      statCost: 'प्रवेश खर्च',
    },
    about: {
      tag: 'AURA बद्दल',
      title: 'तुमचा वैयक्तिक AI mentor',
      subtitle: 'पारंपरिक e-learning स्थिर सामग्री देते. AURA प्रगत LLM वापरून वैयक्तिक शिक्षण देते.',
      problem: 'समस्या',
      solution: 'आमचे उपाय',
      problems: ['निष्क्रिय सामग्री', 'AI इतिहास विसरते', 'भाषा अडथळे', 'स्थिर स्पष्टीकरण'],
      solutions: ['character-चालित AI', 'गतिशील pedagogy', '9+ भाषा', 'document-aware शिक्षण'],
    },
    features: {
      tag: 'मुख्य वैशिष्ट्ये',
      title: 'शिकण्यासाठी सर्व काही',
      subtitle: 'retention वाढवणारी संपूर्ण शिक्षण OS.',
      explore: 'पहा',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive persona with voice.', detail: 'Your personal AI mentor.', points: ['Expressions', 'Multilingual TTS', 'Memory', 'Adaptive modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'Upload PDF, PPTX, DOCX.', detail: 'Transform notes into lessons.', points: ['File support', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes for weak areas.', detail: 'AI assessments from your materials.', points: ['Dynamic questions', 'Weak areas', 'Feedback', 'Mock viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Code sandbox & canvas.', detail: 'Dedicated learning workspaces.', points: ['Code sandbox', 'Canvas', 'Visuals', 'Multi-tab'] },
        'gamification': { title: 'Gamification', desc: 'XP, streaks, badges.', detail: 'Stay motivated with rewards.', points: ['XP', 'Streaks', 'Badges', 'Leaderboards'] },
        'progress-dashboard': { title: 'Progress Dashboard', desc: 'Track your journey.', detail: 'Central learning hub.', points: ['Levels', 'Weak topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'कोणासाठी',
      title: 'प्रत्येक शिकणाऱ्यासाठी',
      subtitle: 'AURA सर्व demographics साठी scale होते.',
      segments: [
        { segment: 'प्राथमिक & मधymik', approach: 'Story-driven, visual.' },
        { segment: 'हाय स्कूल & कॉलेज', approach: 'Exam prep, programming.' },
        { segment: 'Professionals', approach: 'Interview prep, roadmaps.' },
        { segment: 'Lifelong learners', approach: 'Flexible exploration.' },
      ],
    },
    cta: { title: 'शिकणे बदलण्यास तयार?', subtitle: 'AURA सोबत AI शिक्षण अनुभवा.', button: 'AURA सुरू करा' },
    footer: { copy: 'AI शिक्षण · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'वैशिष्ट्यांकडे', highlights: 'मुख्य मुद्दे', tryIt: 'हे वैशिष्ट्य वापरा' },
  },

  gu: {
    nav: { about: 'વિશે', features: 'વિશેષતાઓ', audience: 'પ્રેક્ષક', getStarted: 'શરૂ કરો' },
    hero: {
      eyebrow: 'સાર્વત્રિક AI શિક્ષણ સાથી',
      title: 'સાથે smarter શીખો',
      subtitle: 'AI-સંચાલિત અનુકૂલ શિક્ષણ પ્લેટફોર્મ — તમારી શૈલી, ભાષા અને સ્તર અનુસાર.',
      startFree: 'મફત શીખવાનું શરૂ કરો',
      exploreFeatures: 'વિશેષતાઓ જુઓ',
      languagesLabel: 'તમારી ભાષા પસંદ કરો',
      statLanguages: 'ભાષાઓ',
      statTutor: 'અનુકૂલ ટ્યુટર',
      statCost: 'પ્રવેશ ખર્ચ',
    },
    about: {
      tag: 'AURA વિશે',
      title: 'તમારો વ્યક્તિગત AI mentor',
      subtitle: 'AURA LLM દ્વારા વ્યક્તિગત શિક્ષણ પ્રદાન કરે છે.',
      problem: 'સમસ્યા',
      solution: 'અમારો ઉકેલ',
      problems: ['નિષ્ક્રિય સામગ્રી', 'AI ઇતિહાસ ભૂલે', 'ભાષા અવરોધ', 'સ્થિર સ્પષ્ટીકરણ'],
      solutions: ['character AI', 'ગતિશીલ pedagogy', '9+ ભાષા', 'document learning'],
    },
    features: {
      tag: 'મુખ્ય વિશેષતાઓ',
      title: 'શીખવા માટે બધું',
      subtitle: 'સંપૂર્ણ શિક્ષણ OS.',
      explore: 'જુઓ',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Learning workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Reward system.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'કોના માટે',
      title: 'દરેક શિક્ષાર્થી માટે',
      subtitle: 'AURA બધા માટે scale થાય.',
      segments: [
        { segment: 'પ્રાથમિક', approach: 'Story-driven visual.' },
        { segment: 'હાઈ સ્કૂલ', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview prep.' },
        { segment: 'Lifelong', approach: 'Flexible learning.' },
      ],
    },
    cta: { title: 'શીખવાનું બદલવા તૈયાર?', subtitle: 'AURA જોડાઓ.', button: 'AURA લોન્ચ' },
    footer: { copy: 'AI શિક્ષણ · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'પાછા', highlights: 'મુખ્ય બિંદુઓ', tryIt: 'આ વિશેષતા વાપરો' },
  },

  ta: {
    nav: { about: 'பற்றி', features: 'அம்சங்கள்', audience: 'பார்வையாளர்', getStarted: 'தொடங்கு' },
    hero: {
      eyebrow: 'உலகளாவிய AI கற்றல் துணை',
      title: 'உடன் smarter கற்றுக்கொள்ளுங்கள்',
      subtitle: 'AI-இயங்கும் தனிப்பயன் கல்வி தளம் — உங்கள் மொழி, பாணி மற்றும் நிலைக்கு ஏற்ப.',
      startFree: 'இலவசமாக கற்க தொடங்குங்கள்',
      exploreFeatures: 'அம்சங்களைப் பார்க்க',
      languagesLabel: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      statLanguages: 'மொழிகள்',
      statTutor: 'தனிப்பயன் ஆசிரியர்',
      statCost: 'நுழைவு செலவு',
    },
    about: {
      tag: 'AURA பற்றி',
      title: 'உங்கள் தனிப்பட்ட AI mentor',
      subtitle: 'AURA LLM மூலம் தனிப்பயன் கற்பிப்பை வழங்குகிறது.',
      problem: 'பிரச்சனை',
      solution: 'எங்கள் தீர்வு',
      problems: ['செயலற்ற உள்ளடக்கம்', 'AI வரலாறு மறக்கிறது', 'மொழி தடை', 'நிலையான விளக்கம்'],
      solutions: ['character AI', 'மாறும் pedagogy', '9+ மொழிகள்', 'document கற்றல்'],
    },
    features: {
      tag: 'முக்கிய அம்சங்கள்',
      title: 'கற்க தேவையான அனைத்தும்',
      subtitle: 'முழுமையான கற்றல் OS.',
      explore: 'பார்',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Rewards.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'யாருக்காக',
      title: 'எல்லா கற்பவர்களுக்கும்',
      subtitle: 'AURA அனைத்து demographics-க்கும்.',
      segments: [
        { segment: 'பள்ளி', approach: 'Story-driven.' },
        { segment: 'கல்லூரி', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview.' },
        { segment: 'Lifelong', approach: 'Flexible.' },
      ],
    },
    cta: { title: 'கற்றலை மாற்ற தயாரா?', subtitle: 'AURA-வில் சேருங்கள்.', button: 'AURA தொடங்கு' },
    footer: { copy: 'AI கற்றல் · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'திரும்ப', highlights: 'முக்கிய புள்ளிகள்', tryIt: 'இந்த அம்சம்' },
  },

  te: {
    nav: { about: 'గురించి', features: 'ఫీచర్లు', audience: 'ప్రేక్షకులు', getStarted: 'ప్రారంభించు' },
    hero: {
      eyebrow: 'సార్వత్రిక AI అభ్యాస సహచరుడు',
      title: 'తో smarter నేర్చుకోండి',
      subtitle: 'AI-ఆధారిత అనుకూల విద్యా వేదిక — మీ భాష, శైలి మరియు స్థాయికి అనుగుణంగా.',
      startFree: 'ఉచితంగా నేర్చుకోండి',
      exploreFeatures: 'ఫీచర్లు చూడండి',
      languagesLabel: 'మీ భాష ఎంచుకోండి',
      statLanguages: 'భాషలు',
      statTutor: 'అనుకూల ట్యూటర్',
      statCost: 'ప్రవేశ ఖర్చు',
    },
    about: {
      tag: 'AURA గురించి',
      title: 'మీ వ్యక్తిగత AI mentor',
      subtitle: 'AURA LLM ద్వారా వ్యక్తిగత బోధన.',
      problem: 'సమస్య',
      solution: 'మా పరిష్కారం',
      problems: ['నిష్క్రియ కంటెంట్', 'AI చరిత్ర మరచిపోతుంది', 'భాష అడ్డంకి', 'స్థిర వివరణ'],
      solutions: ['character AI', 'dynamic pedagogy', '9+ భాషలు', 'document learning'],
    },
    features: {
      tag: 'ప్రధాన ఫీచర్లు',
      title: 'నేర్చుకోవడానికి అన్నీ',
      subtitle: 'పూర్తి learning OS.',
      explore: 'చూడండి',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Rewards.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'ఎవరికి',
      title: 'ప్రతి learner కోసం',
      subtitle: 'AURA అన్ని demographics కోసం.',
      segments: [
        { segment: 'పాఠశాల', approach: 'Story-driven.' },
        { segment: 'కళాశాల', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview.' },
        { segment: 'Lifelong', approach: 'Flexible.' },
      ],
    },
    cta: { title: 'నేర్చుకోవడం మార్చడానికి సిద్ధంగా?', subtitle: 'AURA చేరండి.', button: 'AURA ప్రారంభించు' },
    footer: { copy: 'AI అభ్యాస · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'తిరిగి', highlights: 'ముఖ్య అంశాలు', tryIt: 'ఈ ఫీచర్' },
  },

  bn: {
    nav: { about: 'সম্পর্কে', features: 'বৈশিষ্ট্য', audience: 'দর্শক', getStarted: 'শুরু করুন' },
    hero: {
      eyebrow: 'স universal AI শিক্ষা সঙ্গী',
      title: 'এর সাথে smarter শিখুন',
      subtitle: 'AI-চালিত ব্যক্তিগতকৃত শিক্ষা প্ল্যাটফর্ম — আপনার ভাষা, শৈলী ও স্তর অনুযায়ী।',
      startFree: 'বিনামূল্যে শিখুন',
      exploreFeatures: 'বৈশিষ্ট্য দেখুন',
      languagesLabel: 'আপনার ভাষা বেছে নিন',
      statLanguages: 'ভাষা',
      statTutor: 'অ্যাডাপ্টিভ টিউটর',
      statCost: 'প্রবেশ খরচ',
    },
    about: {
      tag: 'AURA সম্পর্কে',
      title: 'আপনার ব্যক্তিগত AI mentor',
      subtitle: 'AURA LLM দিয়ে ব্যক্তিগত শিক্ষা দেয়।',
      problem: 'সমস্যা',
      solution: 'আমাদের সমাধান',
      problems: ['নিষ্ক্রিয় কন্টেন্ট', 'AI ইতিহাস ভুলে', 'ভাষা বাধা', 'স্থির ব্যাখ্যা'],
      solutions: ['character AI', 'dynamic pedagogy', '9+ ভাষা', 'document learning'],
    },
    features: {
      tag: 'মূল বৈশিষ্ট্য',
      title: 'শেখার জন্য সবকিছু',
      subtitle: 'সম্পূর্ণ learning OS.',
      explore: 'দেখুন',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Rewards.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'কার জন্য',
      title: 'প্রতিটি learner এর জন্য',
      subtitle: 'AURA সব demographics এর জন্য।',
      segments: [
        { segment: 'স্কুল', approach: 'Story-driven.' },
        { segment: 'কলেজ', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview.' },
        { segment: 'Lifelong', approach: 'Flexible.' },
      ],
    },
    cta: { title: 'শেখা বদলাতে প্রস্তুত?', subtitle: 'AURA যোগ দিন।', button: 'AURA চালু করুন' },
    footer: { copy: 'AI শিক্ষা · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'ফিরে', highlights: 'মূল বিষয়', tryIt: 'এই বৈশিষ্ট্য' },
  },

  kn: {
    nav: { about: 'ಬಗ್ಗೆ', features: 'ವೈಶಿಷ್ಟ್ಯಗಳು', audience: 'ಪ್ರೇಕ್ಷಕ', getStarted: 'ಪ್ರಾರಂಭಿಸಿ' },
    hero: {
      eyebrow: 'ಸಾರ್ವತ್ರಿಕ AI ಕಲಿಕೆ ಸಂಗಾತಿ',
      title: 'ಜೊತೆ smarter ಕಲಿಯಿರಿ',
      subtitle: 'AI-ಚಾಲಿತ ಅನುಕೂಲ ಶಿಕ್ಷಣ ವೇದಿಕೆ — ನಿಮ್ಮ ಭಾಷೆ, ಶೈಲಿ ಮತ್ತು ಮಟ್ಟಕ್ಕೆ ಅನುಗುಣವಾಗಿ.',
      startFree: 'ಉಚಿತವಾಗಿ ಕಲಿಯ ಆರಂಭಿಸಿ',
      exploreFeatures: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ',
      languagesLabel: 'ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      statLanguages: 'ಭಾಷೆಗಳು',
      statTutor: 'ಅನುಕೂಲ ಟ್ಯೂಟರ್',
      statCost: 'ಪ್ರವೇಶ ವೆಚ್ಚ',
    },
    about: {
      tag: 'AURA ಬಗ್ಗೆ',
      title: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ AI mentor',
      subtitle: 'AURA LLM ಮೂಲಕ ವೈಯಕ್ತಿಕ ಬೋಧನೆ.',
      problem: 'ಸಮಸ್ಯೆ',
      solution: 'ನಮ್ಮ ಪರಿಹಾರ',
      problems: ['ನಿಷ್ಕ್ರಿಯ ವಿಷಯ', 'AI ಇತಿಹಾಸ ಮರೆಯುತ್ತದೆ', 'ಭಾಷಾ ಅಡೆತಡೆ', 'ಸ್ಥಿರ ವಿವರಣೆ'],
      solutions: ['character AI', 'dynamic pedagogy', '9+ ಭಾಷೆಗಳು', 'document learning'],
    },
    features: {
      tag: 'ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು',
      title: 'ಕಲಿಯಲು ಎಲ್ಲವೂ',
      subtitle: 'ಸಂಪೂರ್ಣ learning OS.',
      explore: 'ನೋಡಿ',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Rewards.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'ಯಾರಿಗಾಗಿ',
      title: 'ಪ್ರತಿ learner ಗೆ',
      subtitle: 'AURA ಎಲ್ಲ demographics ಗೆ.',
      segments: [
        { segment: 'ಶಾಲೆ', approach: 'Story-driven.' },
        { segment: 'ಕಾಲೇಜು', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview.' },
        { segment: 'Lifelong', approach: 'Flexible.' },
      ],
    },
    cta: { title: 'ಕಲಿಕೆ ಬದಲಾಯಿಸಲು ಸಿದ್ಧ?', subtitle: 'AURA ಸೇರಿ.', button: 'AURA ಪ್ರಾರಂಭಿಸಿ' },
    footer: { copy: 'AI ಕಲಿಕೆ · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'ಹಿಂದೆ', highlights: 'ಮುಖ್ಯ ಅಂಶಗಳು', tryIt: 'ಈ ವೈಶಿಷ್ಟ್ಯ' },
  },

  ml: {
    nav: { about: 'കുറിച്ച്', features: 'ഫീച്ചറുകൾ', audience: 'പ്രേക്ഷകർ', getStarted: 'തുടങ്ങു' },
    hero: {
      eyebrow: 'സാർവത്രിക AI പഠന Companion',
      title: 'ഉപയോഗിച്ച് smarter പഠിക്കു',
      subtitle: 'AI-നയിച്ച അനുയോജ്യമായ വിദ്യാഭ്യാസ പ്ലാറ്റ്ഫോം — നിങ്ങളുടെ ഭാഷ, ശൈലി, നില.',
      startFree: 'സൗജന്യമായി പഠിക്കു',
      exploreFeatures: 'ഫീച്ചറുകൾ കാണു',
      languagesLabel: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കു',
      statLanguages: 'ഭാഷകൾ',
      statTutor: 'അനുയോജ്യ ട്യൂട്ടർ',
      statCost: 'പ്രവേശന ചെലവ്',
    },
    about: {
      tag: 'AURA കുറിച്ച്',
      title: 'നിങ്ങളുടെ വ്യക്തിഗത AI mentor',
      subtitle: 'AURA LLM വഴി വ്യക്തിഗത പഠനം.',
      problem: 'പ്രശ്നം',
      solution: 'ഞങ്ങളുടെ പരിഹാരം',
      problems: ['നിഷ്ക്രിയ ഉള്ളടക്കം', 'AI ചരിത്രം മറക്കുന്നു', 'ഭാഷാ തടസ്സം', 'സ്ഥിര വിവരണം'],
      solutions: ['character AI', 'dynamic pedagogy', '9+ ഭാഷകൾ', 'document learning'],
    },
    features: {
      tag: 'പ്രധാന ഫീച്ചറുകൾ',
      title: 'പഠിക്കാൻ എല്ലാം',
      subtitle: 'പൂർണ്ണ learning OS.',
      explore: 'കാണു',
      items: {
        'ai-tutor': { title: 'AI Character Tutor', desc: 'Interactive voice tutor.', detail: 'Your AI mentor.', points: ['Expressions', 'TTS', 'Memory', 'Modes'] },
        'document-explainer': { title: 'Document Explainer', desc: 'PDF, PPTX, DOCX.', detail: 'Notes to lessons.', points: ['Files', 'Summaries', 'Concepts', 'Q&A'] },
        'quiz-generator': { title: 'Smart Quiz', desc: 'Auto quizzes.', detail: 'AI assessments.', points: ['Questions', 'Weak areas', 'Feedback', 'Viva'] },
        'virtual-desktops': { title: 'Virtual Desktops', desc: 'Sandbox & canvas.', detail: 'Workspaces.', points: ['Code', 'Canvas', 'Visuals', 'Tabs'] },
        'gamification': { title: 'Gamification', desc: 'XP & badges.', detail: 'Rewards.', points: ['XP', 'Streaks', 'Badges', 'Boards'] },
        'progress-dashboard': { title: 'Dashboard', desc: 'Track progress.', detail: 'Learning hub.', points: ['Levels', 'Topics', 'Roadmaps', 'XP'] },
      },
    },
    audience: {
      tag: 'ആർക്ക്',
      title: 'എല്ലാ learner-ക്കും',
      subtitle: 'AURA എല്ലാ demographics-നും.',
      segments: [
        { segment: 'സ്കൂൾ', approach: 'Story-driven.' },
        { segment: 'കോളേജ്', approach: 'Exam prep.' },
        { segment: 'Professionals', approach: 'Interview.' },
        { segment: 'Lifelong', approach: 'Flexible.' },
      ],
    },
    cta: { title: 'പഠനം മാറ്റാൻ തയ്യാറ?', subtitle: 'AURA-യിൽ ചേരൂ.', button: 'AURA ആരംഭിക്കു' },
    footer: { copy: 'AI പഠനം · Reena Mehta College · 2026–2027', authors: 'Mariam Mohammed Shakeel & Aksabano Khan' },
    featurePage: { back: 'തിരികെ', highlights: 'പ്രധാന പോയിന്റുകൾ', tryIt: 'ഈ ഫീച്ചർ' },
  },
}

export const featureIcons: Record<FeatureSlug, string> = {
  'ai-tutor': '🤖',
  'document-explainer': '📄',
  'quiz-generator': '🎯',
  'virtual-desktops': '🖥️',
  gamification: '🏆',
  'progress-dashboard': '📊',
}
