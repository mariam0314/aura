'use client'

import { Layers, Code, Paintbrush, Monitor } from 'lucide-react'

export default function GalleryPage() {
  const desktops = [
    { title: 'Code Sandbox Workspace', icon: Code, desc: 'Interactive JavaScript/Python execution sandbox with immediate console feedback.' },
    { title: 'Vector Drawing Canvas', icon: Paintbrush, desc: 'Digital whiteboard canvas for sketching architecture diagrams and math proofs.' },
    { title: 'Data Visualization Sandbox', icon: Monitor, desc: '3D graph and chart rendering for algorithm time complexity visualizers.' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Virtual Desktops Showcase</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Desktops & Whiteboard Canvas
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Dedicated interactive environments for coding practice, vector drawing, and visual math explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {desktops.map((d, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#257874]/10 text-[#257874] flex items-center justify-center mb-6">
                  <d.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--aura-text)] mb-3">{d.title}</h3>
                <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
