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
  // 5. Recursion & Functions
  else if (query.includes('recursion') || query.includes('recursive')) {
    state = 'explaining'
    if (lang === 'hi') {
      replyText = `रिकर्शन (Recursion) को आसानी से समझें:\n\nजब कोई फ़ंक्शन स्वयं को ही बार-बार कॉल करता है, तो उसे रिकर्शन कहते हैं।\n\nइसके दो मुख्य अंग होते हैं:\n1. **Base Case**: वह शर्त जहाँ रुकना होता है, वर्ना प्रोग्राम इनफिनिट लूप में फँस जाएगा।\n2. **Recursive Step**: जहाँ समस्या को छोटे टुकड़ों में बाँटकर फ़ंक्शन खुद को दोबारा कॉल करता है।\n\nउदाहरण: \`factorial(n) = n * factorial(n - 1)\` जहाँ Base Case है \`n <= 1\`।`
    } else if (lang === 'mr') {
      replyText = `रिकर्शन (Recursion) सोप्या भाषेत समजून घेऊया:\n\nजेव्हा एखादा फंक्शन स्वतःलाच पुन्हा पुन्हा कॉल करतो, तेव्हा त्याला रिकर्शन म्हणतात.\n\nयाचे दोन महत्त्वाचे भाग आहेत:\n१. **Base Case**: फंक्शन थांबण्याची मुख्य अट (ज्यामुळे इनफिनिट लूप टाळता येतो).\n२. **Recursive Step**: मूळ समस्या छोट्या भागात रूपांतरित करून पुन्हा कॉल करणे.\n\nउदा: फॅक्टोरियल \`factorial(n) = n * factorial(n - 1)\`.`
    } else if (isGenZ && lang === 'en') {
      replyText = `Recursion is basically Russian nesting dolls in code 🪆\n\nA function keeps calling itself until it hits the **Base Case** (the exit door). If you forget the base case, congrats, you just caused a Stack Overflow 💀\n\n\`\`\`javascript\nfunction countdown(n) {\n  if (n <= 0) return console.log("Blast off! 🔥"); // Base Case\n  console.log(n);\n  countdown(n - 1); // Recursive call\n}\n\`\`\`\nAlways remember: Base Case first, or your call stack is cooked fr!`
    } else {
      replyText = `Recursion in Computer Science:\n\nA computational technique where a function solves a problem by invoking smaller instances of itself on the call stack.\n\nCritical components:\n1. **Base Case**: Terminal condition that halts recursion and prevents stack overflow.\n2. **Recursive Case**: Sub-problem reduction that progresses monotonically toward the base case.\n\nComplexity: Often O(N) auxiliary space on the call stack unless optimized via Tail-Call Optimization (TCO).`
    }
  }
  // 6. Algorithms & Time Complexity
  else if (query.includes('algorithm') || query.includes('complexity') || query.includes('big o') || query.includes('sorting')) {
    state = 'explaining'
    if (lang === 'hi') {
      replyText = `एल्गोरिदम (Algorithm) और टाइम कॉम्प्लेक्सिटी:\n\nएल्गोरिदम किसी समस्या को हल करने के लिए चरण-दर-चरण (step-by-step) निर्देशों का समूह है।\n\n**Big-O Notation** बताता है कि इनपुट बढ़ने पर एल्गोरिदम का समय कैसे बढ़ता है:\n• **O(1)**: सबसे तेज़ (Constant Time)\n• **O(log N)**: बहुत तेज़, जैसे बाइनरी सर्च (Binary Search)\n• **O(N)**: लीनियर टाइम (Linear Time)\n• **O(N log N)**: सर्वश्रेष्ठ सॉर्टिंग जैसे Merge Sort / Quick Sort\n• **O(N^2)**: धीमा, जैसे Bubble Sort`
    } else if (lang === 'mr') {
      replyText = `अल्गोरिदम आणि वेळ जटिलता (Time Complexity):\n\nअल्गोरिदम म्हणजे कोणतीही संगणकीय समस्या टप्प्याटप्प्याने सोडवण्याची पद्धत.\n\n**Big-O Notation** द्वारे आपण गती मोजतो:\n• **O(1)**: स्थिर वेळ (सर्वात जलद)\n• **O(log N)**: बायनरी सर्चसारखा अत्यंत कार्यक्षम मार्ग\n• **O(N)**: रेषीय वेळ\n• **O(N log N)**: मर्च सॉर्ट आणि क्विक सॉर्ट\n• **O(N^2)**: बबल सॉर्ट (हळूवार)`
    } else if (isGenZ && lang === 'en') {
      replyText = `Algorithms are literally just the recipe steps your code follows 📜\n\nAnd **Big-O** tells you if your code runs like a supercar or crashes your CPU:\n\n• **O(1)**: Instant (accessing array by index \`arr[0]\`). Absolute W.\n• **O(log N)**: S-tier scaling (Binary Search cutting the list in half each time).\n• **O(N)**: Standard loop over N items. Solid.\n• **O(N log N)**: The gold standard for sorting (Merge Sort).\n• **O(N²)**: Nested loops inside nested loops. Avoid this on big data or your server will be crying 😭`
    } else {
      replyText = `Algorithm Design & Asymptotic Complexity Analysis:\n\nAn algorithm is an unambiguous sequence of computational specifications that transforms inputs into outputs in finite time.\n\nAsymptotic bounds (Big-O, Omega, Theta) characterize computational growth rates:\n• O(1): Constant time operations.\n• O(log N): Divide-and-conquer search algorithms.\n• O(N log N): Information-theoretic optimal comparison sorts (Merge/Heap Sort).\n• O(N²): Quadratic nested iterations requiring optimization.`
    }
  }
  // 7. General / Adaptive Query
  else {
    state = 'explaining'
    if (lang === 'hi') {
      replyText = `"${req.prompt}" के बारे में:\n\nयह एक अत्यंत महत्वपूर्ण विषय है। आइए इसे व्यावहारिक दृष्टिकोण से समझें:\n\n1. **मूल अवधारणा**: इस विषय का मुख्य उद्देश्य वास्तविक जीवन की समस्याओं को तार्किक और व्यवस्थित ढंग से हल करना है।\n2. **मुख्य लाभ**: यह प्रदर्शन में सुधार करता है, त्रुटियों को कम करता है और कोड या सिस्टम को अधिक मजबूत बनाता है।\n3. **सीखने का अगला कदम**: आइए इसके व्यावहारिक उपयोग और वास्तविक उदाहरणों पर चर्चा करें।\n\nआप इस विषय में क्या अधिक विस्तार से जानना चाहते हैं?`
    } else if (lang === 'mr') {
      replyText = `"${req.prompt}" बद्दल सविस्तर माहिती:\n\nहा विषय समजून घेण्यासाठी खालील महत्त्वाचे मुद्दे लक्षात ठेवा:\n\n१. **मूळ संकल्पना**: कार्यक्षम आणि विश्वासार्ह निकाल मिळवणे हे याचे मुख्य ध्येय आहे.\n२. **व्यावहारिक उपयोग**: वास्तविक प्रकल्पांमध्ये त्रुटी कमी करणे आणि गती वाढवणे.\n३. **सराव**: या संकल्पनेवर आधारित प्रत्यक्ष उदाहरणे समजून घेतल्यास हा विषय सहज आत्मसात होतो.\n\nयातील कोणत्या भागावर अधिक भर द्यायचा आहे?`
    } else if (lang === 'ta') {
      replyText = `"${req.prompt}" பற்றிய தெளிவான விளக்கம்:\n\n1. **முக்கிய கருத்து**: சிக்கல்களை எளிமையாகவும் முறையாகவும் தீர்க்க இது பயன்படுகிறது.\n2. **பயன்பாடு**: கணினி செயல்திறனை அதிகரிக்கவும் பிழைகளைக் குறைக்கவும் உதவுகிறது.\n3. **அடுத்த படி**: நடைமுறை உதாரணங்கள் மூலம் இதை மேலும் ஆழமாக பயிலலாம்.`
    } else if (lang === 'ur') {
      replyText = `"${req.prompt}" کے بارے میں تفصیلی وضاحت:\n\n1. **بنیادی تصور**: یہ کسی بھی پیچیدہ مسئلے کو باقاعدہ اور منطقی طریقے سے حل کرنے میں مدد کرتا ہے۔\n2. **اہم فوائد**: یہ نظام کی کارکردگی کو بہتر بناتا ہے اور غلطیوں کو کم کرتا ہے۔\n3. **اگلا مرحلہ**: آئیے اس کی عملی مثالوں کے ذریعے مشق شروع کرتے ہیں۔`
    } else if (isGenZ && lang === 'en') {
      replyText = `Okayyy, let's break down "${req.prompt}" real quick so it actually makes sense 🔥\n\n1. **The Core Concept**: At its core, this is all about solving a specific bottleneck in the cleanest, most scalable way possible.\n2. **Why It Matters**: Without this, systems break down under real-world load, and debugging becomes a total headache.\n3. **How To Master It**: Connect the theory to actual code patterns, test the edge cases, and lock in the fundamentals.\n\nWhat specific part of this do you want to dive into first? I'm ready when you are!`
    } else {
      replyText = `Pedagogical Analysis of "${req.prompt}":\n\n1. **Fundamental Principle**: This domain establishes architectural foundations and operational methodologies designed to maintain system reliability, determinism, and scalability.\n2. **Production Application**: Implements standard industry patterns to minimize latency, prevent state drift, and handle edge cases gracefully.\n3. **Next Steps**: Recommended progression involves verifying theoretical bounds followed by targeted hands-on implementation.\n\nWhich aspect would you like to explore first?`
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
