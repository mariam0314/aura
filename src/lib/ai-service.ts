import type { EnglishMode, LanguageCode } from './onboarding-data'
import type { VRMState } from '@/components/VRMAvatarCanvas'
import { EMOTION_PROFILES, analyzeQuestionSentiment, type EmotionType } from './emotion-engine'

export interface AIMessageRequest {
  prompt: string
  role: 'student' | 'college' | 'professional' | 'company' | 'school'
  englishMode: EnglishMode | null
  language: LanguageCode
  pedagogyMode?: 'story' | 'visual' | 'deep' | 'exam' | 'practical'
  context?: {
    activeTopic?: string
    identifiedGap?: string
    recentAccuracy?: number
    difficulty?: string
  }
  customApiKey?: string
  customProvider?: 'gemini' | 'openai'
}

export interface AIMessageResponse {
  text: string
  suggestedState: VRMState
  emotion: EmotionType
  pitch: number
  rate: number
  detectedGapAlert?: string
  learningPathRecommendation?: string
  providerUsed: 'aura-adaptive-engine' | 'gemini-cloud' | 'openai-cloud'
}

// In-memory cache to conserve bandwidth and eliminate duplicate queries
const responseCache = new Map<string, AIMessageResponse>()

export function buildSystemPrompt(req: AIMessageRequest): string {
  // If englishMode is explicitly set, strictly follow it ('genz' vs 'professional'/normal).
  const isGenZ = req.englishMode !== null ? req.englishMode === 'genz' : req.role === 'student'

  let toneInstruction = ''
  if (isGenZ && req.language === 'en') {
    toneInstruction = `
TONE & PERSONALITY (GEN-Z STUDY MENTOR):
- You are AURA: a smart, senior student / mentor who actually knows their stuff.
- Communicate in natural, casual, Gen-Z friendly language (e.g. "Okayyy, let's break this down", "SQL JOINs are kinda tricky at first", "You cooked on this one ngl", "Let's lock in and fix this real quick").
- Use light, tasteful slang naturally (W, solid, cooked, fr, lowkey, nailed it, run it back, locked in).
- DO NOT overdo slang or make it cringe. Avoid putting slang in every single line.
- When the student succeeds: celebrate with them ("Okayyy, that's a W 🔥").
- When they make mistakes: be supportive and diagnose why ("Close 😭 You had the right intuition, but this part went sideways").
- When they struggle repeatedly: slow it down ("Yeah, this concept is being annoying 💀 Let's look at a simpler analogy").
- Academic clarity, mathematical correctness, and real code examples MUST ALWAYS remain top-tier.
`
  } else if (req.language === 'en' && !isGenZ) {
    toneInstruction = `
TONE & PERSONALITY (NORMAL ENGLISH - CLEAR & PROFESSIONAL):
- Clear, natural, friendly, easy to understand, and academically appropriate.
- Explain concepts with simple, lucid, elegant phrasing.
- Example tone: "You scored 72%. Your SQL fundamentals are strong, but JOIN operations need more practice. Let's work on that."
- Strictly avoid internet slang, emojis, or casual expressions. Maintain clean, professional clarity.
`
  } else if (req.role === 'professional') {
    toneInstruction = `
TONE & PERSONALITY (WORKING PROFESSIONAL UPSKILLING COACH):
- Clear, pragmatic, structured, and modern engineering focus.
- Focus ONLY on upskilling, real-world production job responsibilities, tools, architecture patterns, and career development.
- DO NOT treat the professional as an academic student.
- STRICTLY DO NOT mention exams, viva questions, academic grades, or test prep.
- Frame all assessments as real-world production competency scenarios, debugging drills, and architectural trade-off evaluations.
`
  } else {
    toneInstruction = `
TONE & PERSONALITY (PROFESSIONAL COACH):
- Clear, concise, structured, and modern.
- Focus on practical trade-offs, architecture patterns, and career progression.
`
  }

  const pedagogyGuidelines = {
    story: 'PEDAGOGY: Storytelling mode. Use vivid real-world metaphors, character analogies, and narrative intuition before giving technical syntax.',
    visual: 'PEDAGOGY: Visual diagram mode. Describe ASCII flowcharts, memory block maps, and structural schemas clearly.',
    deep: 'PEDAGOGY: Deep learning mode. First-principles analytical proofs, mathematical formulas, and rigorous step-by-step logic.',
    exam: 'PEDAGOGY: Exam prep mode. High-yield viva questions, concise memory keys, and critical bullet points for exams.',
    practical: 'PEDAGOGY: Practical hands-on mode. Immediate clean code snippets, edge-case breakdowns, and terminal commands.',
  }

  const activePedagogy = req.pedagogyMode ? pedagogyGuidelines[req.pedagogyMode] : pedagogyGuidelines.story

  return `You are AURA, an AI-Powered Adaptive Learning and Skill-Gap Analysis Engine.
Target Learner Role: ${req.role}
Active Language: ${req.language}
Target Topic: ${req.context?.activeTopic || 'General Computer Science'}
Known Knowledge Gap: ${req.context?.identifiedGap || 'None detected yet'}
${activePedagogy}
${toneInstruction}
Deliver a focused, high-value, adaptive response that directly guides the learner to understand the core concept, bridge any knowledge gaps, and take the next step.`
}

/**
 * High-performance deterministic adaptive response generator.
 * Provides instant responses across Computer Science, Cloud, and Engineering.
 */
export function generateLocalAdaptiveResponse(req: AIMessageRequest): AIMessageResponse {
  const sentiment = analyzeQuestionSentiment(req.prompt)
  const query = req.prompt.toLowerCase()
  const isGenZ = req.englishMode !== null ? req.englishMode === 'genz' : (req.role === 'student')
  const lang = req.language

  let replyText = ''
  let state: VRMState = sentiment.predictedAnswerEmotion in EMOTION_PROFILES ? (sentiment.predictedAnswerEmotion as VRMState) : 'explaining'

  // 1. SQL JOINs Knowledge Gap
  if (query.includes('join') || query.includes('sql') || query.includes('database')) {
    state = 'explaining'
    if (lang === 'hi') {
      replyText = `SQL JOINs को समझना बहुत सरल है! 💡\n\n1. **INNER JOIN**: केवल वही रिकॉर्ड्स लाता है जो दोनों टेबल्स में मैच करते हैं।\n2. **LEFT JOIN**: बाईं (Left) टेबल के सारे रिकॉर्ड्स रखता है, चाहे दाईं टेबल में मैच हो या न हो (खाली जगह NULL हो जाएगी)।\n3. **FULL OUTER JOIN**: दोनों टेबल्स के सभी रिकॉर्ड्स लाता है।\n\nआइए एक टेबल का उदाहरण देखकर अभ्यास करें:`
    } else if (lang === 'mr') {
      replyText = `SQL JOINs सोप्या भाषेत समजून घेऊया! 💡\n\n1. **INNER JOIN**: फक्त दोन्ही टेबल्समध्ये मॅच होणारे रेकॉर्ड्स दाखवतो.\n2. **LEFT JOIN**: डाव्या टेबलचे सर्व रेकॉर्ड्स कायम ठेवतो आणि मॅच नसल्यास NULL दाखवतो.\n3. **FULL OUTER JOIN**: दोन्ही टेबल्समधील सर्व डेटा एकत्र करतो.\n\nचला एक सराव प्रश्न सोडवून हे पक्के करूया:`
    } else if (lang === 'gu') {
      replyText = `SQL JOINs ને સમજવું ખૂબ જ સરળ છે! 💡\n\n1. **INNER JOIN**: ફક્ત બંને કોષ્ટકોમાં મેચ થતા રેકોર્ડ્સ લાવે છે.\n2. **LEFT JOIN**: ડાબી ટેબલના બધા રેકોર્ડ્સ રાખે છે (મેચ ન હોય તો NULL).\n3. **FULL OUTER JOIN**: બંને કોષ્ટકોના તમામ રેકોર્ડ્સ લાવે છે.\n\nચાલો એક સરળ ઉદાહરણ સાથે અભ્યાસ કરીએ:`
    } else if (lang === 'ta') {
      replyText = `SQL JOINs எளிதாக புரிந்துகொள்ளலாம்! 💡\n\n1. **INNER JOIN**: இரண்டு அட்டவணைகளிலும் பொருந்தும் பதிவுகளை மட்டுமே தரும்.\n2. **LEFT JOIN**: இடது அட்டவணையின் அனைத்து பதிவுகளையும் தக்கவைத்துக்கொள்ளும் (பொருந்தாதவை NULL ஆகும்).\n3. **FULL OUTER JOIN**: இரு அட்டவணைகளின் அனைத்து தரவுகளையும் இணைக்கும்.\n\nஇப்போது ஒரு எளிய உதாரணத்தைக் கொண்டு பயிற்சி செய்வோம்:`
    } else if (lang === 'te') {
      replyText = `SQL JOINs చాలా సులభంగా నేర్చుకోవచ్చు! 💡\n\n1. **INNER JOIN**: రెండు పట్టికలలో సరిపోలే రికార్డులను మాత్రమే చూపుతుంది.\n2. **LEFT JOIN**: ఎడమ పట్టికలోని అన్ని రికార్డులను ఉంచుతుంది (సరిపోలకపోతే NULL).\n3. **FULL OUTER JOIN**: అన్ని రికార్డులను కలిపి చూపుతుంది.\n\nఇప్పుడు ఒక చిన్న ప్రశ్నతో ప్రాక్టీస్ చేద్దాం:`
    } else if (lang === 'bn') {
      replyText = `SQL JOINs খুব সহজেই বোঝা যায়! 💡\n\n1. **INNER JOIN**: শুধুমাত্র উভয় টেবিলের মিল থাকা রেকর্ডগুলো আনে।\n2. **LEFT JOIN**: বাম টেবিলের সমস্ত রেকর্ড অক্ষত রাখে (অমিল হলে NULL)।\n3. **FULL OUTER JOIN**: উভয় টেবিলের সব রেকর্ড দেখায়।\n\nআসুন একটি উদাহরণের মাধ্যমে এটি যাচাই করি:`
    } else if (lang === 'kn') {
      replyText = `SQL JOINs ಅನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ! 💡\n\n1. **INNER JOIN**: ಎರಡೂ ಕೋಷ್ಟಕಗಳಲ್ಲಿ ಹೊಂದಾಣಿಕೆಯಾಗುವ ದಾಖಲೆಗಳನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ.\n2. **LEFT JOIN**: ಎಡ ಕೋಷ್ಟಕದ ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ (ಹೊಂದಾಣಿಕೆಯಿಲ್ಲದಿದ್ದರೆ NULL).\n\nಬನ್ನಿ ಒಂದು ಸಣ್ಣ ಪ್ರಶ್ನೆಯೊಂದಿಗೆ ಅಭ್ಯಾಸ ಮಾಡೋಣ:`
    } else if (lang === 'ml') {
      replyText = `SQL JOINs വളരെ ലളിതമായി മനസ്സിലാക്കാം! 💡\n\n1. **INNER JOIN**: രണ്ട് ടേബിളുകളിലും യോജിക്കുന്ന റെക്കോർഡുകൾ മാത്രം നൽകുന്നു.\n2. **LEFT JOIN**: ഇടത് ടേബിളിലെ എല്ലാ റെക്കോർഡുകളും നിലനിർത്തുന്നു (മാച്ച് ഇല്ലെങ്കിൽ NULL).\n\nവരൂ, ഒരു ചെറിയ പരിശീലനത്തിലൂടെ ഇത് ഉറപ്പിക്കാം:`
    } else if (lang === 'pa') {
      replyText = `SQL JOINs ਬਹੁਤ ਆਸਾਨੀ ਨਾਲ ਸਮਝੇ ਜਾ ਸਕਦੇ ਹਨ! 💡\n\n1. **INNER JOIN**: ਸਿਰਫ਼ ਉਹੀ ਰਿਕਾਰਡ ਲਿਆਉਂਦਾ ਹੈ ਜੋ ਦੋਵਾਂ ਟੇਬਲਾਂ ਵਿੱਚ ਮੈਚ ਹੁੰਦੇ ਹਨ।\n2. **LEFT JOIN**: ਖੱਬੇ ਟੇਬਲ ਦੇ ਸਾਰੇ ਰਿਕਾਰਡ ਰੱਖਦਾ ਹੈ (ਮੈਚ ਨਾ ਹੋਣ 'ਤੇ NULL)।\n\nਆਓ ਇੱਕ ਅਭਿਆਸ ਸਵਾਲ ਹੱਲ ਕਰੀਏ:`
    } else if (lang === 'ur') {
      replyText = `SQL JOINs کو سمجھنا بہت آسان ہے! 💡\n\n1. **INNER JOIN**: صرف وہی ریکارڈز لاتا ہے جو دونوں ٹیبلز میں میچ ہوں۔\n2. **LEFT JOIN**: بائیں ٹیبل کے تمام ریکارڈز کو برقرار رکھتا ہے (میچ نہ ہونے پر NULL)۔\n3. **FULL OUTER JOIN**: دونوں ٹیبلز کا مکمل ڈیٹا لاتا ہے۔\n\nآئیے ایک سادہ مثال کے ساتھ پریکٹس کرتے ہیں:`
    } else {
      if (isGenZ) {
        replyText = `Yeah, SQL JOINs look way more intimidating than they actually are 😭 Let's break it down so it clicks fr:\n\n• **INNER JOIN**: Strict matcher. If Table A and Table B don't agree, the row gets kicked out (0 match = 0 rows).\n• **LEFT JOIN**: Loyal to the left table. It keeps EVERY row from Table A no matter what. If Table B ghosted it, Table B's columns just show up as \`NULL\`.\n• **FULL OUTER JOIN**: The group chat — everyone gets invited, and missing data fills with \`NULL\`.\n\nQuick visual check:\n\`\`\`sql\nSELECT students.name, courses.title\nFROM students\nLEFT JOIN courses ON students.course_id = courses.id;\n\`\`\`\n\nLet's run a quick 1-question check to make sure JOINs move from 'nah 💀' to 'I got this' territory!`
      } else {
        replyText = `Regarding SQL Relational JOIN Operations:\n\n1. **INNER JOIN**: Evaluates condition predicates strictly. Returns rows where matching keys exist in both sets.\n2. **LEFT OUTER JOIN**: Preserves all tuples from the left relation, substituting NULL values for non-matching attributes from the right relation.\n3. **RIGHT OUTER JOIN**: Symmetric to LEFT JOIN; preserves all tuples from the right relation.\n\nReview this query pattern:\n\`\`\`sql\nSELECT u.username, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\`\`\`\nTargeted assessment ready to verify relational understanding.`
      }
    }
  }
  // 2. Normalization & DBMS
  else if (query.includes('normalization') || query.includes('dbms') || query.includes('1nf') || query.includes('2nf') || query.includes('3nf')) {
    state = 'explaining'
    if (lang === 'hi') {
      replyText = `डेटाबेस नॉर्मलाइज़ेशन (Normalization) का मुख्य उद्देश्य डेटा के दोहराव (Redundancy) को समाप्त करना है:\n\n• **1NF**: कॉलम में केवल एकल (Atomic) मान होने चाहिए।\n• **2NF**: 1NF + कोई आंशिक निर्भरता (Partial Dependency) नहीं होनी चाहिए।\n• **3NF**: 2NF + कोई सकर्मक निर्भरता (Transitive Dependency) नहीं होनी चाहिए।`
    } else if (lang === 'mr') {
      replyText = `डेटाबेस नॉर्मलायझेशनचा उद्देश डेटाची पुनरावृत्ती टाळणे हा आहे:\n\n• **1NF**: प्रत्येक कॉलममध्ये फक्त एकल (Atomic) व्हॅल्यू असावी.\n• **2NF**: 1NF पूर्ण असणे आणि कोणतीही Partial Dependency नसणे.\n• **3NF**: 2NF पूर्ण असणे आणि Transitive Dependency नसणे.`
    } else if (lang === 'ta') {
      replyText = `டேட்டாபேஸ் Normalization என்பது தேவையற்ற தரவு நகல்களை நீக்குவதாகும்:\n\n• **1NF**: அனைத்து நெடுவரிசைகளிலும் ஒற்றை (Atomic) மதிப்புகள் மட்டுமே இருக்க வேண்டும்.\n• **2NF**: 1NF + பகுதி சார்பு (Partial Dependency) இருக்கக்கூடாது.\n• **3NF**: 2NF + கடப்பு சார்பு (Transitive Dependency) இருக்கக்கூடாது.`
    } else if (lang === 'ur') {
      replyText = `ڈیٹا بیس نارملائزیشن کا مقصد ڈیٹا کے غیر ضروری دہراؤ کو ختم کرنا ہے:\n\n• **1NF**: ہر کالم میں صرف ایک (Atomic) ویلیو ہونی چاہئے۔\n• **2NF**: کوئی جزوی انحصار (Partial Dependency) نہیں ہونا چاہئے۔\n• **3NF**: کوئی متعدی انحصار (Transitive Dependency) نہیں ہونا چاہئے۔`
    } else if (isGenZ && lang === 'en') {
      replyText = `Normalization is literally just spring-cleaning your database so you don't store redundant duplicate mess 🧹\n\n• **1NF**: Atomic values only (no lists or multiple phones in one single column cell).\n• **2NF**: Already in 1NF + no partial dependencies (every column must depend on the FULL primary key, not half of a composite key).\n• **3NF**: Already in 2NF + no transitive dependencies (no A → B → C domino chains).\n\nIf you remember: *"The key, the whole key, and nothing but the key, so help me Codd"* — you won't miss this in exams 🔥`
    } else {
      replyText = `Database Normalization systematically decomposes tables to eliminate data anomalies:\n\n• **1NF**: Enforces attribute atomicity (scalar values per column).\n• **2NF**: Eliminates partial functional dependencies on composite candidate keys.\n• **3NF**: Eliminates transitive dependencies (X → Y where Y is non-prime and not functionally determined solely by candidate keys).\n• **BCNF**: Strict condition where for every functional dependency X → Y, X must be a superkey.`
    }
  }
  // 3. Networking / Subnetting
  else if (query.includes('network') || query.includes('subnet') || query.includes('tcp') || query.includes('osi')) {
    state = 'thinking'
    if (lang === 'hi') {
      replyText = `कंप्यूटर नेटवर्किंग और सबनेटिंग (Subnetting):\n\n• एक IPv4 एड्रेस में कुल **32 बिट्स** होते हैं।\n• यदि सबनेट \`/28\` है, तो होस्ट के लिए \`32 - 28 = 4\` बिट्स बचते हैं।\n• कुल IP संख्या = \`2^4 = 16\` (उपयोग योग्य = 14).\n• TCP 3-Way Handshake: SYN → SYN-ACK → ACK.`
    } else if (lang === 'mr') {
      replyText = `संगणक नेटवर्किंग आणि सबनेटिंग:\n\n• IPv4 पत्त्यामध्ये एकूण **३२ बिट्स** असतात.\n• सबनेट \`/28\` असल्यास होस्टसाठी \`32 - 28 = 4\` बिट्स उरतात.\n• एकूण IP = \`2^4 = 16\` (वापरण्यायोग्य = १४).\n• TCP हँडशेक: SYN → SYN-ACK → ACK.`
    } else if (lang === 'ta') {
      replyText = `கணினி நெட்வொர்க்கிங் மற்றும் Subnetting:\n\n• IPv4 முகவரியில் மொத்தம் **32 பிட்கள்** உள்ளன.\n• \`/28\` சப்நெட்டிற்கு ஹோஸ்ட் பிட்கள் = \`32 - 28 = 4\`.\n• மொத்த IP = \`16\` (பயன்படுத்தக்கூடியவை = 14).\n• TCP 3-வழி ஹேண்ட்ஷேக்: SYN → SYN-ACK → ACK.`
    } else if (lang === 'ur') {
      replyText = `کمپیوٹر نیٹ ورکنگ اور سب نیٹنگ:\n\n• ایک IPv4 ایڈریس میں کل **32 بٹس** ہوتے ہیں۔\n• سب نیٹ \`/28\` کے لیے ہوسٹ بٹس = \`32 - 28 = 4\`۔\n• کل IP = 16 (قابل استعمال = 14)۔\n• TCP ہینڈ شیک: SYN → SYN-ACK → ACK۔`
    } else if (isGenZ && lang === 'en') {
      replyText = `Networking has a lot of numbers, but CIDR math is actually clean once you see the pattern:\n\n• An IPv4 address has **32 bits** total.\n• If a subnet mask is \`/28\`, you have \`32 - 28 = 4\` host bits left.\n• Total IP count = \`2^4 = 16\`.\n• Usable hosts = \`16 - 2 = 14\` (subtract 1 for the Network ID and 1 for the Broadcast address).\n\nTCP 3-Way Handshake mnemonic:\n1. Client: **SYN** ("You there?")\n2. Server: **SYN-ACK** ("Yeah I'm here, you there?")\n3. Client: **ACK** ("Got it, let's talk!")\n\nSolid W right there 🔥`
    } else {
      replyText = `Computer Networks Architecture Overview:\n\n• **Subnetting & CIDR**: For a /N prefix, available host bits = 32 - N. Total addresses = 2^(32-N). Usable addresses = 2^(32-N) - 2 (excluding Network and Broadcast addresses).\n• **TCP 3-Way Handshake**: Reliable transport session established via SYN → SYN-ACK → ACK segment exchange sequence.`
    }
  }
  // 4. Git / DevOps / Cloud
  else if (query.includes('git') || query.includes('aws') || query.includes('docker') || query.includes('cloud')) {
    state = 'confident'
    if (lang === 'hi') {
      replyText = `क्लाउड और DevOps आर्किटेक्चर:\n\n• **Docker**: कोड और सभी निर्भरताओं को एक हल्के कंटेनर में पैक करता है।\n• **Git Rebase**: कमिट इतिहास को साफ और सीधा रखता है।\n• **AWS Least Privilege**: केवल आवश्यक IAM अनुमतियाँ प्रदान करें।`
    } else if (lang === 'mr') {
      replyText = `क्लाउड आणि DevOps आर्किटेक्चर:\n\n• **Docker**: कोड आणि सर्व लायब्ररी एका सुटसुटीत कंटेनरमध्ये पॅक करतो.\n• **Git Rebase**: कमिट हिस्ट्री स्वच्छ आणि सरळ ठेवतो.\n• **AWS**: सुरक्षिततेसाठी फक्त आवश्यक परवानग्या द्या.`
    } else if (lang === 'ta') {
      replyText = `கிளவுட் மற்றும் DevOps அடிப்படைகள்:\n\n• **Docker**: குறியீடு மற்றும் சார்புகளை இலகுவான கொள்கலனில் அடைக்கிறது.\n• **Git Rebase**: கமிட் வரலாற்றை சுத்தமாக வைக்கிறது.\n• **AWS**: தேவையான குறைந்தபட்ச அனுமதிகளை மட்டுமே வழங்கவும்.`
    } else if (lang === 'ur') {
      replyText = `کلاؤڈ اور ڈیواپس کا جائزہ:\n\n• **Docker**: کوڈ اور تمام انحصارات کو ایک ہلکے کنٹینر میں پیک کرتا ہے۔\n• **Git Rebase**: کمٹ ہسٹری کو صاف اور سیدھا رکھتا ہے۔\n• **AWS**: صرف ضروری اجازتیں فراہم کریں۔`
    } else if (isGenZ && lang === 'en') {
      replyText = `Let's talk DevOps workflow:\n\n• **Git Merge vs Rebase**: Merge creates a new commit joining two branches (looks like a train junction). Rebase picks up your commits and replays them cleanly on top of main so your git history looks like a straight highway 🛣️\n• **Docker**: Packages your code + OS dependencies into a lightweight container so "it worked on my machine" is never an excuse again.\n• **AWS Least Privilege**: Never give full Admin keys. Give only the exact IAM permissions needed for that single task.`
    } else {
      replyText = `Cloud & DevOps Architectural Patterns:\n\n• **Git Rebase**: Linearizes branch commit history by replaying topic commits on the upstream baseline.\n• **Docker Containers**: Standardized runtime artifacts isolating process namespaces and filesystem layers.\n• **AWS IAM Least Privilege**: Enforces granular resource-level policies and role assumption.`
    }
  }
  // 5. General / Adaptive Query
  else {
    state = 'happy'
    if (lang === 'hi') {
      replyText = `"${req.prompt}" के बारे में:\n\nआपका लर्निंग प्रोफाइल सक्रिय रूप से ट्रैक किया जा रहा है। मैं आपकी सीखने की गति और ज्ञान के अनुसार व्यक्तिगत रूप से सिखाने के लिए तैयार हूँ।\n\nक्या आप एक सरल उदाहरण देखना चाहेंगे या 2-मिनट का त्वरित अभ्यास करना चाहेंगे?`
    } else if (lang === 'mr') {
      replyText = `"${req.prompt}" बद्दल:\n\nतुमची शिकण्याची प्रोफाइल सक्रिय आहे. आपण सोप्या उदाहरणासह किंवा थेट सराव प्रश्नासह सुरुवात करू शकतो. तुम्हाला काय आवडेल?`
    } else if (lang === 'ta') {
      replyText = `"${req.prompt}" பற்றிய வழிகாட்டல்:\n\nஉங்கள் கற்றல் சுயவிவரம் கண்காணிக்கப்படுகிறது. எளிய கதைகள் அல்லது நேரடி குறியீடு பயிற்சிகள் மூலம் இதை எளிதாக கற்கலாம்.`
    } else if (lang === 'ur') {
      replyText = `"${req.prompt}" کے بارے میں:\n\nآپ کا لرننگ پروفائل فعال ہے۔ کیا آپ ایک سادہ مثال دیکھنا چاہیں گے یا فوری پریکٹس شروع کرنا چاہیں گے؟`
    } else if (isGenZ && lang === 'en') {
      replyText = `I got you! For "${req.prompt}" — let's break this down step-by-step.\n\nInstead of just dumping a huge paragraph, I'm tracking your learning profile so we target your exact weak spots and make sure you retain it.\n\nWould you like to:\n1. 📖 Break it down with a simple visual story?\n2. ⚡ Take a fast 2-minute diagnostic quiz to check your baseline?\n3. 🛠️ Jump into clean code examples?`
    } else {
      replyText = `Analysis of "${req.prompt}" within AURA Adaptive Pedagogy Framework:\n\nYour learning profile is actively tracked. This module dynamically shifts explanations between First-Principles derivation, visual diagrams, and targeted practice.\n\nDiagnostic assessment available to benchmark current conceptual understanding.`
    }
  }

  const emotion: EmotionType = (state in EMOTION_PROFILES ? state : 'explaining') as EmotionType
  const profile = EMOTION_PROFILES[emotion] || EMOTION_PROFILES.explaining

  return {
    text: replyText,
    suggestedState: state,
    emotion,
    pitch: profile.pitch,
    rate: profile.rate,
    providerUsed: 'aura-adaptive-engine',
  }
}

/**
 * Unified AI dispatch function: checks cache, attempts API call if configured,
 * or falls back to the deterministic local adaptive engine.
 */
export async function sendAIMessage(req: AIMessageRequest): Promise<AIMessageResponse> {
  const cacheKey = `${req.customApiKey || ''}_${req.language}_${req.englishMode}_${req.role}_${req.pedagogyMode}_${req.prompt.trim()}`
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!
  }

  try {
    // Attempt internal Next.js API route if available
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })

    if (res.ok) {
      const data: Partial<AIMessageResponse> = await res.json()
      const resolvedEmotion: EmotionType =
        data.emotion ||
        ((data.suggestedState as EmotionType) in EMOTION_PROFILES
          ? (data.suggestedState as EmotionType)
          : 'explaining')
      const profile = EMOTION_PROFILES[resolvedEmotion] || EMOTION_PROFILES.explaining
      const completeData: AIMessageResponse = {
        text: data.text || '',
        suggestedState: data.suggestedState || 'explaining',
        emotion: resolvedEmotion,
        pitch: typeof data.pitch === 'number' ? data.pitch : profile.pitch,
        rate: typeof data.rate === 'number' ? data.rate : profile.rate,
        detectedGapAlert: data.detectedGapAlert,
        learningPathRecommendation: data.learningPathRecommendation,
        providerUsed: data.providerUsed || 'aura-adaptive-engine',
      }
      responseCache.set(cacheKey, completeData)
      return completeData
    }
  } catch {
    // Fallback to local adaptive engine gracefully
  }

  const localResponse = generateLocalAdaptiveResponse(req)
  responseCache.set(cacheKey, localResponse)
  return localResponse
}
