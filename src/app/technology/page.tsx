'use client'

import { Cpu, Database, Layers, Globe, Code, Shield } from 'lucide-react'

export default function TechnologyPage() {
  const stack = [
    { name: 'React.js & Next.js 16', desc: 'High-performance UI framework composition with SSR & Turbopack routing.', category: 'Frontend' },
    { name: 'TypeScript', desc: 'Provides static typing, improved code quality, and strict compile safety.', category: 'Languages' },
    { name: 'Tailwind CSS v4', desc: 'Utility-first styling framework with customizable design tokens.', category: 'Styling' },
    { name: 'Framer Motion & GSAP', desc: 'Interface animation triggers, fluid micro-interactions, and 60 FPS transitions.', category: 'Animations' },
    { name: 'Node.js & Express.js', desc: 'Scalable runtime server engine handling incoming API queries & LLM payloads.', category: 'Backend' },
    { name: 'MongoDB Atlas & Mongoose', desc: 'Cloud document database storing user profiles, historical mistakes, and progress schemas.', category: 'Database' },
    { name: 'Google Gemini & Groq APIs', desc: 'High-efficiency inferencing engines driving persona-based dialogues & quiz generation.', category: 'AI Layer' },
    { name: 'Cloudinary CDN', desc: 'Cloud asset management for PDF, PPTX, and DOCX uploaded textbook streams.', category: 'Storage' },
    { name: 'Capacitor CLI', desc: 'Hybrid compilation pipeline packaging web platform into native Android APK app.', category: 'Mobile' },
    { name: 'Web Speech & Android TTS', desc: 'Multilingual speech synthesis for 11 regional languages.', category: 'Speech' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Infrastructure</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Technology Stack & Architecture
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Full specification of the decoupled tech stack powering AURA's adaptive learning engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stack.map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#257874]/10 text-[#257874] font-bold text-[10px] uppercase mb-3">
                {item.category}
              </span>
              <h3 className="text-lg font-bold text-[var(--aura-text)] mb-2">{item.name}</h3>
              <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
