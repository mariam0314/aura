'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRM } from '@pixiv/three-vrm'
import { Cpu } from 'lucide-react'

export type VRMState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'happy'
  | 'confident'
  | 'explaining'
  | 'surprised'
  | 'concerned'
  | 'celebrating'

interface VRMAvatarCanvasProps {
  mentorState: VRMState
}

// Default front-facing camera position & orbit target (framed centered on face & upper body)
const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0.38, 1.35)
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0.32, 0)

function VRMModel({
  url,
  mentorState,
}: {
  url: string
  mentorState: VRMState
}) {
  const [vrm, setVrm] = useState<VRM | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const blinkTimerRef = useRef(0)
  const isBlinkingRef = useRef(false)
  const lookAtTargetRef = useRef(new THREE.Object3D())
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
          // Set model rotation Y to Math.PI (180 deg) so full front face faces camera directly
          vrmInstance.scene.rotation.y = Math.PI
          vrmInstance.scene.rotation.x = 0
          vrmInstance.scene.rotation.z = 0
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
    }
  }, [url])

  // Setup lookAt target object attached to camera
  useEffect(() => {
    if (!vrm) return
    camera.add(lookAtTargetRef.current)
    if (vrm.lookAt) {
      vrm.lookAt.target = lookAtTargetRef.current
    }
    return () => {
      camera.remove(lookAtTargetRef.current)
    }
  }, [vrm, camera])

  useFrame((state, delta) => {
    if (!vrm) return

    // Update VRM spring bone physics & secondary animations
    vrm.update(delta)

    const t = state.clock.elapsedTime

    // Lock body base orientation strictly facing front (Math.PI / 180 degrees Y)
    vrm.scene.rotation.y = Math.PI
    vrm.scene.rotation.x = 0
    vrm.scene.rotation.z = 0

    // Harmonic subtle idle breathing (body remains centered and grounded)
    vrm.scene.position.y = -1.05 + Math.sin(t * 1.5) * 0.008
    vrm.scene.position.x = 0
    vrm.scene.position.z = 0

    // Smooth natural eye blinking logic (blink every 4 seconds for 0.14s)
    blinkTimerRef.current += delta
    if (blinkTimerRef.current > 4.0) {
      isBlinkingRef.current = true
      if (blinkTimerRef.current > 4.14) {
        blinkTimerRef.current = 0
        isBlinkingRef.current = false
      }
    }

    // Professional Calm AI Mentor Expression Management (Zero Grin/Smile, Neutral Straight Lips)
    if (vrm.expressionManager) {
      // Natural blink
      vrm.expressionManager.setValue('blink', isBlinkingRef.current ? 1 : 0)

      // Mouth Morph Targets for Speech vs Closed Neutral Baseline
      let targetAA = 0
      let targetIH = 0
      let targetOH = 0

      if (mentorState === 'speaking' || mentorState === 'explaining') {
        targetAA = (Math.sin(t * 12) + 1) * 0.22
        targetIH = (Math.cos(t * 10) + 1) * 0.12
        targetOH = (Math.sin(t * 8) + 1) * 0.08
      }

      // Enforce zero smile (happy = 0.0) for a serious, calm, intelligent appearance
      const targetHappy = 0.0
      const targetSurprised = mentorState === 'surprised' ? 0.3 : 0.0
      const targetSad = 0.0

      // Apply morph values smoothly
      vrm.expressionManager.setValue('aa', THREE.MathUtils.lerp(vrm.expressionManager.getValue('aa') || 0, targetAA, 0.25))
      vrm.expressionManager.setValue('ih', THREE.MathUtils.lerp(vrm.expressionManager.getValue('ih') || 0, targetIH, 0.25))
      vrm.expressionManager.setValue('oh', THREE.MathUtils.lerp(vrm.expressionManager.getValue('oh') || 0, targetOH, 0.25))
      vrm.expressionManager.setValue('happy', THREE.MathUtils.lerp(vrm.expressionManager.getValue('happy') || 0, targetHappy, 0.1))
      vrm.expressionManager.setValue('surprised', THREE.MathUtils.lerp(vrm.expressionManager.getValue('surprised') || 0, targetSurprised, 0.1))
      vrm.expressionManager.setValue('sad', THREE.MathUtils.lerp(vrm.expressionManager.getValue('sad') || 0, targetSad, 0.1))
    }

    // Head & Eye Posture: 2-3° Downward Tilt (-0.045 rad) looking directly at Camera
    if (vrm.humanoid) {
      const head = vrm.humanoid.getNormalizedBoneNode('head')
      const neck = vrm.humanoid.getNormalizedBoneNode('neck')
      const chest = vrm.humanoid.getNormalizedBoneNode('chest')
      const rightUpperArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
      const leftUpperArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm')

      if (head) {
        // Base 2-3° downward tilt looking straight into user's eyes
        const camX = camera.position.x * 0.12
        const camY = (camera.position.y - 0.38) * 0.12

        let targetRotX = -0.045 - camY
        let targetRotY = -camX
        let targetRotZ = 0

        if (mentorState === 'thinking') {
          targetRotZ = -0.06
          targetRotX = -0.07
        } else if (mentorState === 'listening') {
          targetRotZ = 0.03
          targetRotX = -0.03
        } else if (mentorState === 'speaking' || mentorState === 'explaining') {
          targetRotX += Math.sin(t * 3) * 0.02
          targetRotY += Math.cos(t * 2) * 0.02
        }

        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetRotX, 0.1)
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetRotY, 0.1)
        head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, targetRotZ, 0.1)
      }

      if (neck) {
        neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, -camera.position.x * 0.06, 0.05)
      }

      if (chest) {
        chest.rotation.z = THREE.MathUtils.lerp(chest.rotation.z, 0, 0.05)
      }

      // Rested Professional Arm Posture
      if (rightUpperArm && leftUpperArm) {
        let rArmZ = -1.15
        let lArmZ = 1.15
        let rArmX = 0
        let lArmX = 0

        if (mentorState === 'celebrating') {
          rArmZ = -1.8 + Math.sin(t * 6) * 0.08
          lArmZ = 1.8 + Math.cos(t * 6) * 0.08
        } else if (mentorState === 'explaining') {
          rArmZ = -1.3 + Math.sin(t * 2.5) * 0.08
          rArmX = 0.25 + Math.cos(t * 2) * 0.05
        }

        rightUpperArm.rotation.z = THREE.MathUtils.lerp(rightUpperArm.rotation.z, rArmZ, 0.08)
        leftUpperArm.rotation.z = THREE.MathUtils.lerp(leftUpperArm.rotation.z, lArmZ, 0.08)
        rightUpperArm.rotation.x = THREE.MathUtils.lerp(rightUpperArm.rotation.x, rArmX, 0.08)
        leftUpperArm.rotation.x = THREE.MathUtils.lerp(leftUpperArm.rotation.x, lArmX, 0.08)
      }
    }
  })

  if (!vrm) {
    return (
      <Html center>
        <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#00171F]/90 border border-[#257874]/40 text-white shadow-xl min-w-48 text-center backdrop-blur-md">
          <div className="w-7 h-7 rounded-full border-2 border-[#35C88A] border-t-transparent animate-spin" />
          <div className="text-xs font-bold tracking-wider text-[#35C88A]">
            Loading Aura 3D VRM...
          </div>
          <div className="text-[10px] text-gray-400 font-mono">
            public/vrm/Aura.vrm {loadingProgress ? `(${loadingProgress}%)` : ''}
          </div>
        </div>
      </Html>
    )
  }

  return (
    <primitive
      object={vrm.scene}
      position={[0, -1.05, 0]}
      rotation={[0, Math.PI, 0]}
      scale={[1.35, 1.35, 1.35]}
    />
  )
}

function SceneControls() {
  const { camera } = useThree()
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

    // After 2.0 seconds of inactivity, smoothly reset camera back to front view
    if (now - lastInteractionTimeRef.current > 2000) {
      camera.position.lerp(DEFAULT_CAMERA_POS, 0.05)
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
      minDistance={0.9}
      maxDistance={2.5}
      target={[DEFAULT_CAMERA_TARGET.x, DEFAULT_CAMERA_TARGET.y, DEFAULT_CAMERA_TARGET.z]}
      maxPolarAngle={Math.PI / 1.85}
      minPolarAngle={Math.PI / 3.2}
    />
  )
}

export default function VRMAvatarCanvas({ mentorState }: VRMAvatarCanvasProps) {
  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#002830] via-[#001D26] to-[#00171F] border border-[#257874]/30 shadow-[0_20px_60px_rgba(0,23,31,0.4)]">
      {/* HUD Header Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00171F]/80 backdrop-blur-md border border-[#257874]/30 text-xs font-bold uppercase tracking-wider text-[#35C88A]">
        <Cpu className="w-3.5 h-3.5 text-[#257874]" />
        <span>Aura.vrm • AI Mentor Stage</span>
      </div>

      {/* State Active HUD Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#257874]/20 backdrop-blur-md border border-[#257874]/40 text-xs font-extrabold uppercase tracking-wider text-white">
        <span className="w-2 h-2 rounded-full bg-[#35C88A] animate-pulse" />
        <span>{mentorState}</span>
      </div>

      <Canvas
        camera={{ position: [DEFAULT_CAMERA_POS.x, DEFAULT_CAMERA_POS.y, DEFAULT_CAMERA_POS.z], fov: 32 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[2, 3, 2]} intensity={2.0} castShadow />
        <directionalLight position={[-2, 1, -1]} intensity={0.7} color="#35C88A" />
        <pointLight position={[0, 1, 1]} intensity={0.9} color="#ffffff" />

        <VRMModel
          url="/vrm/Aura.vrm"
          mentorState={mentorState}
        />

        <SceneControls />
      </Canvas>
    </div>
  )
}
