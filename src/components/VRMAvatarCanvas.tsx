'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm'
import { Cpu, Volume2, Sparkles, Mic, Brain, Heart, Eye, Smile } from 'lucide-react'
import {
  VRMCharacterController,
  type AICharacterState,
  CHARACTER_STATES,
} from '@/lib/vrm-animator'
import { EMOTION_PROFILES, type EmotionType } from '@/lib/emotion-engine'

export type VRMState =
  | 'idle'
  | 'neutral'
  | 'smile'
  | 'happy'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'encouraging'
  | 'concerned'
  | 'excited'
  | 'serious'
  | 'confused'
  | 'surprised'
  | 'confident'
  | 'explaining'
  | 'celebrating'

export interface VRMAvatarCanvasProps {
  mentorState?: VRMState
  emotion?: EmotionType | AICharacterState
  isSpeaking?: boolean
  isListening?: boolean
  currentPitch?: number
  onCharacterClick?: () => void
  className?: string
  showHud?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Head-and-Shoulders Camera Framing
// Head bone world Y is +0.82. Eyes are at +0.87. Mouth is at +0.76. Chin is at +0.72.
// Target centered at mouth/nose (Y = 0.77).
// Camera at eye-level (Y = 0.80), distance 1.15m, FOV 28.
// Generous 7.5cm headroom ensures forehead, hair crown, eyes, nose, mouth and chin
// are 100% visible on all devices without cropping.
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0.80, 1.15)
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0.77, 0)

function SpatialHologramPedestal() {
  const ringRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={ringRef} position={[0, -1.048, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.35, 48]} />
        <meshBasicMaterial color="#35C88A" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.64, 64]} />
        <meshBasicMaterial color="#257874" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.88, 0.89, 48]} />
        <meshBasicMaterial color="#4FA6A0" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshBasicMaterial color="#0F766E" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function SpatialFloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 35

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.2
      pos[i * 3 + 1] = (Math.random() - 0.4) * 2.0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.6
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#4FA6A0" transparent opacity={0.4} />
    </points>
  )
}

function VRMModel({
  url,
  activeState,
  isSpeaking,
  isListening,
  onCharacterClick,
}: {
  url: string
  activeState: AICharacterState
  isSpeaking: boolean
  isListening: boolean
  onCharacterClick?: () => void
}) {
  const [vrm, setVrm] = useState<VRM | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const controllerRef = useRef<VRMCharacterController | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    let isMounted = true
    const loader = new GLTFLoader()
    loader.register((parser) => new VRMLoaderPlugin(parser))

    loader.load(
      url,
      (gltf) => {
        if (!isMounted) return
        const vrmInstance: VRM = gltf.userData.vrm
        if (vrmInstance) {
          const controller = new VRMCharacterController(vrmInstance)
          controllerRef.current = controller
          setVrm(vrmInstance)
        }
      },
      (progress) => {
        if (isMounted && progress.total > 0) {
          setLoadingProgress(Math.round((progress.loaded / progress.total) * 100))
        }
      },
      (error) => {
        console.error('Error loading public/vrm/Aura.vrm:', error)
      }
    )

    return () => {
      isMounted = false
      if (controllerRef.current) {
        controllerRef.current.dispose()
        controllerRef.current = null
      }
    }
  }, [url])

  useFrame((state, delta) => {
    if (!controllerRef.current || !vrm) return

    controllerRef.current.update(
      delta,
      state.clock.elapsedTime,
      activeState,
      camera.position,
      isSpeaking,
      isListening
    )
  })

  if (!vrm) {
    return (
      <Html center>
        <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#00171F]/90 border border-[#257874]/40 text-white shadow-xl min-w-48 text-center backdrop-blur-md">
          <div className="w-7 h-7 rounded-full border-2 border-[#35C88A] border-t-transparent animate-spin" />
          <div className="text-xs font-bold tracking-wider text-[#35C88A]">
            Loading AURA 3D Model...
          </div>
          <div className="text-[10px] text-gray-400 font-mono">
            {loadingProgress ? `${loadingProgress}%` : 'Calibrating character...'}
          </div>
        </div>
      </Html>
    )
  }

  return (
    <primitive
      object={vrm.scene}
      scale={[1.35, 1.35, 1.35]}
      onClick={onCharacterClick}
    />
  )
}

function ResponsiveSceneControls() {
  const { camera, size } = useThree()
  const controlsRef = useRef<any>(null)
  const lastInteractionTimeRef = useRef<number>(Date.now())

  const handleStart = () => {
    lastInteractionTimeRef.current = Date.now()
  }

  const handleChange = () => {
    lastInteractionTimeRef.current = Date.now()
  }

  useFrame(() => {
    if (!controlsRef.current) return
    const now = Date.now()

    // Responsive aspect ratio compensation:
    // When width < height (mobile portrait), pull camera back smoothly
    // so character's head and shoulders are never cropped horizontally
    const aspect = size.width / Math.max(1, size.height)
    const distFactor = aspect < 1.0 ? Math.min(1.4, 0.95 / aspect) : 1.0
    const dynamicZ = DEFAULT_CAMERA_POS.z * distFactor

    const targetPos = new THREE.Vector3(DEFAULT_CAMERA_POS.x, DEFAULT_CAMERA_POS.y, dynamicZ)

    if (now - lastInteractionTimeRef.current > 1800) {
      camera.position.lerp(targetPos, 0.05)
      controlsRef.current.target.lerp(DEFAULT_CAMERA_TARGET, 0.05)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      onStart={handleStart}
      onChange={handleChange}
      enableZoom={true}
      minDistance={0.7}
      maxDistance={2.2}
      target={[DEFAULT_CAMERA_TARGET.x, DEFAULT_CAMERA_TARGET.y, DEFAULT_CAMERA_TARGET.z]}
      maxPolarAngle={Math.PI / 1.7}
      minPolarAngle={Math.PI / 2.8}
    />
  )
}

export default function VRMAvatarCanvas({
  mentorState = 'idle',
  emotion,
  isSpeaking: explicitSpeaking,
  isListening: explicitListening,
  currentPitch,
  onCharacterClick,
  className,
  showHud = true,
}: VRMAvatarCanvasProps) {
  const isSpeaking = explicitSpeaking ?? mentorState === 'speaking'
  const isListening = explicitListening ?? mentorState === 'listening'

  // Map mentorState & emotion to canonical AICharacterState
  const activeState: AICharacterState = useMemo(() => {
    if (isSpeaking) return 'speaking'
    if (isListening) return 'listening'

    if (emotion) {
      const eStr = emotion as string
      if (eStr in CHARACTER_STATES) {
        return eStr as AICharacterState
      }
    }

    if (mentorState) {
      const mStr = mentorState as string
      if (mStr in CHARACTER_STATES) {
        return mStr as AICharacterState
      }
      if (mStr === 'confident') return 'happy'
    }

    return 'neutral'
  }, [mentorState, emotion, isSpeaking, isListening])

  const stateConfig = CHARACTER_STATES[activeState] || CHARACTER_STATES.neutral
  const profile = EMOTION_PROFILES[activeState as EmotionType] || EMOTION_PROFILES.idle
  const effectivePitch = currentPitch || profile.pitch || 1.16

  return (
    <div
      className={`relative w-full h-full min-h-[300px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#002228] via-[#001820] to-[#001217] border border-[#257874]/40 shadow-[0_25px_70px_rgba(0,18,23,0.6)] spatial-surface-3d ${
        className || ''
      }`}
    >
      {/* Hologram Grid Floor Background */}
      <div className="absolute inset-0 spatial-grid opacity-25 pointer-events-none" />

      {/* Subtle Top HUD Badges (compact and positioned to never obscure the face) */}
      {showHud && (
        <>
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00171F]/80 backdrop-blur-md border border-[#257874]/30 text-[10px] font-bold uppercase tracking-wider text-[#35C88A]">
            <Cpu className="w-3 h-3 text-[#257874]" />
            <span>AURA • 3D Female Mentor</span>
          </div>

          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00171F]/80 backdrop-blur-md border border-[#257874]/40 text-[11px] font-extrabold tracking-wider text-white shadow-md">
            {isSpeaking ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Speaking ({effectivePitch.toFixed(2)}x)</span>
                </span>
              </>
            ) : isListening ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Mic className="w-3 h-3" />
                  <span>Listening...</span>
                </span>
              </>
            ) : activeState === 'thinking' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  <span>Thinking...</span>
                </span>
              </>
            ) : activeState === 'encouraging' ? (
              <>
                <span>🌟</span>
                <span className="text-emerald-300 font-bold">Encouraging</span>
              </>
            ) : activeState === 'happy' || activeState === 'smile' ? (
              <>
                <span>😊</span>
                <span className="text-yellow-300 font-bold">Smiling</span>
              </>
            ) : activeState === 'confused' ? (
              <>
                <span>🤔</span>
                <span className="text-violet-300 font-bold">Clarifying</span>
              </>
            ) : activeState === 'concerned' ? (
              <>
                <span>💙</span>
                <span className="text-blue-300 font-bold">Supportive</span>
              </>
            ) : activeState === 'excited' ? (
              <>
                <span>🎉</span>
                <span className="text-emerald-300 font-bold">Excited</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#35C88A]" />
                <span className="text-emerald-300 capitalize">{stateConfig.label}</span>
              </>
            )}
          </div>
        </>
      )}

      {/* 3D WebGL Canvas with Head-and-Shoulders Camera Framing */}
      <Canvas
        camera={{
          position: [DEFAULT_CAMERA_POS.x, DEFAULT_CAMERA_POS.y, DEFAULT_CAMERA_POS.z],
          fov: 28,
        }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[2, 3, 2]} intensity={1.8} />
        <directionalLight position={[-2, 1, -1]} intensity={0.8} color="#35C88A" />
        <directionalLight position={[0, -0.5, -2]} intensity={1.1} color="#0F766E" />
        <directionalLight position={[2, 1, -1.5]} intensity={0.5} color="#4FA6A0" />
        <pointLight position={[0, 1.2, 1.2]} intensity={0.9} color="#ffffff" />

        <SpatialHologramPedestal />
        <SpatialFloatingParticles />

        <VRMModel
          url="/vrm/Aura.vrm"
          activeState={activeState}
          isSpeaking={isSpeaking}
          isListening={isListening}
          onCharacterClick={onCharacterClick}
        />

        <ResponsiveSceneControls />
      </Canvas>
    </div>
  )
}
