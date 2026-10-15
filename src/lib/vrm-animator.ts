/**
 * AURA VRM Animation & Expression Controller
 * 
 * Provides:
 * - Natural idle breathing, body weight sway, and posture
 * - VRM 0.x & 1.0 cross-version expression manager
 * - Lifelike automatic blinking with smooth easing and variable intervals
 * - Speech-synchronized multi-vowel lip-sync engine
 * - AI state & emotion transitions (idle, listening, thinking, speaking, happy, serious, confused, surprised)
 * - Eye saccades & camera lookAt tracking
 * - SpringBone physics & humanoid skeleton updates
 */

import * as THREE from 'three'
import { VRM, VRMUtils } from '@pixiv/three-vrm'

export type AICharacterState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'happy'
  | 'serious'
  | 'confused'
  | 'surprised'
  | 'celebrating'
  | 'explaining'
  | 'concerned'

export interface CharacterStateConfig {
  label: string
  blendshapes: {
    happy?: number
    sad?: number
    surprised?: number
    relaxed?: number
    angry?: number
    neutral?: number
  }
  headRotation: [number, number, number] // [X (pitch), Y (yaw), Z (roll)] in radians
  armPosture: {
    rightArmZ: number
    leftArmZ: number
    rightArmX: number
    leftArmX: number
    elbowFlex: number
  }
  noddingSpeed?: number
  noddingAmp?: number
}

export const CHARACTER_STATES: Record<AICharacterState, CharacterStateConfig> = {
  idle: {
    label: 'Calm & Attentive',
    blendshapes: {
      relaxed: 0.25,
      happy: 0.12,
    },
    headRotation: [-0.035, 0, 0],
    armPosture: {
      rightArmZ: -1.22,
      leftArmZ: 1.22,
      rightArmX: 0.12,
      leftArmX: 0.12,
      elbowFlex: 0.22,
    },
  },
  listening: {
    label: 'Listening Attentively',
    blendshapes: {
      relaxed: 0.35,
      happy: 0.25,
      surprised: 0.1,
    },
    headRotation: [-0.02, 0.02, 0.05], // slight inquisitive side-tilt
    armPosture: {
      rightArmZ: -1.2,
      leftArmZ: 1.2,
      rightArmX: 0.18,
      leftArmX: 0.18,
      elbowFlex: 0.3,
    },
    noddingSpeed: 2.2,
    noddingAmp: 0.02,
  },
  thinking: {
    label: 'Deep Thinking & Analysis',
    blendshapes: {
      sad: 0.2, // subtle brow contemplation
      relaxed: 0.1,
      surprised: 0.12,
    },
    headRotation: [-0.09, -0.08, -0.04], // tilted upward and slightly aside
    armPosture: {
      rightArmZ: -1.05,
      leftArmZ: 1.22,
      rightArmX: 0.32, // right arm slightly engaged
      leftArmX: 0.12,
      elbowFlex: 0.45,
    },
  },
  speaking: {
    label: 'Speaking & Teaching',
    blendshapes: {
      happy: 0.35,
      relaxed: 0.3,
    },
    headRotation: [-0.04, 0, 0],
    armPosture: {
      rightArmZ: -1.25,
      leftArmZ: 1.25,
      rightArmX: 0.25,
      leftArmX: 0.22,
      elbowFlex: 0.38,
    },
    noddingSpeed: 3.8,
    noddingAmp: 0.03,
  },
  happy: {
    label: 'Pleased & Encouraging',
    blendshapes: {
      happy: 0.85,
      relaxed: 0.35,
    },
    headRotation: [-0.02, 0, 0.02],
    armPosture: {
      rightArmZ: -1.2,
      leftArmZ: 1.2,
      rightArmX: 0.16,
      leftArmX: 0.16,
      elbowFlex: 0.28,
    },
  },
  serious: {
    label: 'Focused & Grounded',
    blendshapes: {
      neutral: 0.7,
      angry: 0.1, // subtle firm brow
    },
    headRotation: [-0.05, 0, 0],
    armPosture: {
      rightArmZ: -1.22,
      leftArmZ: 1.22,
      rightArmX: 0.08,
      leftArmX: 0.08,
      elbowFlex: 0.2,
    },
  },
  confused: {
    label: 'Inquisitive & Puzzled',
    blendshapes: {
      sad: 0.35,
      surprised: 0.28,
      relaxed: 0.1,
    },
    headRotation: [-0.05, 0.04, 0.09], // distinct inquisitive cocked head
    armPosture: {
      rightArmZ: -1.15,
      leftArmZ: 1.22,
      rightArmX: 0.25,
      leftArmX: 0.12,
      elbowFlex: 0.35,
    },
  },
  surprised: {
    label: 'Intrigued & Curious',
    blendshapes: {
      surprised: 0.85,
      happy: 0.2,
    },
    headRotation: [0.03, 0, -0.02],
    armPosture: {
      rightArmZ: -1.3,
      leftArmZ: 1.3,
      rightArmX: 0.22,
      leftArmX: 0.22,
      elbowFlex: 0.35,
    },
  },
  celebrating: {
    label: 'Celebrating Win!',
    blendshapes: {
      happy: 0.95,
      surprised: 0.25,
    },
    headRotation: [0.03, 0, 0],
    armPosture: {
      rightArmZ: -1.55,
      leftArmZ: 1.55,
      rightArmX: 0.35,
      leftArmX: 0.35,
      elbowFlex: 0.5,
    },
  },
  explaining: {
    label: 'Explaining Concepts',
    blendshapes: {
      happy: 0.35,
      relaxed: 0.35,
    },
    headRotation: [-0.04, 0, 0],
    armPosture: {
      rightArmZ: -1.25,
      leftArmZ: 1.25,
      rightArmX: 0.28,
      leftArmX: 0.22,
      elbowFlex: 0.35,
    },
    noddingSpeed: 3.4,
    noddingAmp: 0.025,
  },
  concerned: {
    label: 'Empathetic & Supportive',
    blendshapes: {
      sad: 0.6,
      relaxed: 0.2,
    },
    headRotation: [-0.03, 0, 0.05],
    armPosture: {
      rightArmZ: -1.18,
      leftArmZ: 1.18,
      rightArmX: 0.15,
      leftArmX: 0.15,
      elbowFlex: 0.25,
    },
  },
}

/**
 * Universal cross-version VRM Expression Setter.
 * Handles both VRM 0.x and VRM 1.0 naming conventions and case variations.
 */
export function setVRMExpressionSafely(vrm: VRM, rawName: string, weight: number): void {
  if (!vrm || !vrm.expressionManager) return

  const clamped = Math.max(0, Math.min(1, weight))
  const expManager = vrm.expressionManager

  // 1. Direct match
  if (expManager.getExpression(rawName)) {
    expManager.setValue(rawName, clamped)
    return
  }

  // 2. Expression Name Aliasing Map
  const ALIASES: Record<string, string[]> = {
    happy: ['happy', 'joy', 'Joy', 'Happy'],
    joy: ['happy', 'joy', 'Joy', 'Happy'],
    sad: ['sad', 'sorrow', 'Sorrow', 'Sad'],
    sorrow: ['sad', 'sorrow', 'Sorrow', 'Sad'],
    relaxed: ['relaxed', 'fun', 'Fun', 'Relaxed'],
    fun: ['relaxed', 'fun', 'Fun', 'Relaxed'],
    angry: ['angry', 'Angry'],
    surprised: ['surprised', 'Surprised'],
    neutral: ['neutral', 'Neutral'],
    blink: ['blink', 'Blink'],
    blinkleft: ['blinkLeft', 'blink_l', 'Blink_L', 'blinkLeft'],
    blinkright: ['blinkRight', 'blink_r', 'Blink_R', 'blinkRight'],
    aa: ['aa', 'a', 'A', 'Aa'],
    ih: ['ih', 'i', 'I', 'Ih'],
    ou: ['ou', 'u', 'U', 'Ou'],
    ee: ['ee', 'e', 'E', 'Ee'],
    oh: ['oh', 'o', 'O', 'Oh'],
  }

  const lookupKey = rawName.toLowerCase()
  const candidates = ALIASES[lookupKey] || [rawName]

  for (const candidate of candidates) {
    if (expManager.getExpression(candidate)) {
      expManager.setValue(candidate, clamped)
      return
    }
  }

  // 3. Fallback: Search all registered expressions in expressionMap (case-insensitive)
  const allNames = Object.keys(expManager.expressionMap || {})
  const found = allNames.find((n) => n.toLowerCase() === lookupKey)
  if (found) {
    expManager.setValue(found, clamped)
  }
}

/**
 * Reads an expression's current weight with alias fallback.
 */
export function getVRMExpressionSafely(vrm: VRM, rawName: string): number {
  if (!vrm || !vrm.expressionManager) return 0
  const expManager = vrm.expressionManager

  const direct = expManager.getValue(rawName)
  if (direct !== null && direct !== undefined) return direct

  const allNames = Object.keys(expManager.expressionMap || {})
  const found = allNames.find((n) => n.toLowerCase() === rawName.toLowerCase())
  if (found) {
    const val = expManager.getValue(found)
    return val !== null && val !== undefined ? val : 0
  }

  return 0
}

/**
 * Full VRM Character Lifecycle Controller
 */
export class VRMCharacterController {
  public vrm: VRM

  // Blinking state
  private blinkTimer = 0
  private nextBlinkInterval = 3.2
  private blinkDuration = 0.18
  private isBlinking = false
  private blinkWeight = 0
  private isDoubleBlink = false
  private doubleBlinkStage = 0

  // LookAt Saccades
  private saccadeTimer = 0
  private nextSaccadeInterval = 2.0
  private gazeOffset = new THREE.Vector3(0, 0, 0)
  private lookAtTargetObj = new THREE.Object3D()

  // Lip-sync / Vowel animation state
  private mouthAA = 0
  private mouthIH = 0
  private mouthOU = 0
  private mouthEE = 0
  private mouthOH = 0

  // Expression transition weights
  private exprWeights: Record<string, number> = {
    happy: 0,
    sad: 0,
    surprised: 0,
    relaxed: 0,
    angry: 0,
    neutral: 0,
  }

  constructor(vrm: VRM) {
    this.vrm = vrm
    this.initVRM()
  }

  private initVRM(): void {
    // Check if VRM 0.x and apply standard orientation fix
    try {
      VRMUtils.rotateVRM0(this.vrm)
    } catch {
      // ignore
    }

    // Attach lookAt target
    if (this.vrm.lookAt) {
      this.vrm.lookAt.target = this.lookAtTargetObj
    }
  }

  /**
   * Main per-frame update loop.
   * Computes idle movement, breathing, blinking, lip-sync, and updates humanoid skeleton.
   */
  public update(
    delta: number,
    time: number,
    state: AICharacterState,
    cameraPos: THREE.Vector3,
    isSpeaking: boolean,
    isListening: boolean
  ): void {
    if (!this.vrm) return

    // Cap delta for smooth frame jumps
    const dt = Math.min(delta, 0.1)
    const t = time

    const config = CHARACTER_STATES[state] || CHARACTER_STATES.idle

    // ──────────────────────────────────────────────
    // 1. Natural Breathing & Subtle Body Movement
    // ──────────────────────────────────────────────
    // Breathing cycle: ~14 breaths per min (~4.3 second period)
    const breathFreq = 1.45
    const breathCycle = Math.sin(t * breathFreq)
    const breathPhaseCos = Math.cos(t * breathFreq)

    // Base scene position with gentle breathing bob
    this.vrm.scene.position.y = -1.05 + breathCycle * 0.003
    this.vrm.scene.position.x = 0
    this.vrm.scene.position.z = 0

    // Body weight shift sway (slow period ~7 seconds)
    const swayFreq = 0.42
    const bodySwayZ = Math.sin(t * swayFreq) * 0.012
    const bodySwayY = Math.cos(t * (swayFreq * 0.8)) * 0.008

    // ──────────────────────────────────────────────
    // 2. Humanoid Skeletal Animation
    // ──────────────────────────────────────────────
    if (this.vrm.humanoid) {
      const hips = this.vrm.humanoid.getNormalizedBoneNode('hips')
      const spine = this.vrm.humanoid.getNormalizedBoneNode('spine')
      const chest = this.vrm.humanoid.getNormalizedBoneNode('chest')
      const upperChest = this.vrm.humanoid.getNormalizedBoneNode('upperChest')
      const neck = this.vrm.humanoid.getNormalizedBoneNode('neck')
      const head = this.vrm.humanoid.getNormalizedBoneNode('head')
      const rightUpperArm = this.vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
      const leftUpperArm = this.vrm.humanoid.getNormalizedBoneNode('leftUpperArm')
      const rightLowerArm = this.vrm.humanoid.getNormalizedBoneNode('rightLowerArm')
      const leftLowerArm = this.vrm.humanoid.getNormalizedBoneNode('leftLowerArm')

      // Hips sway
      if (hips) {
        hips.rotation.z = THREE.MathUtils.lerp(hips.rotation.z, bodySwayZ, 0.08)
        hips.rotation.y = THREE.MathUtils.lerp(hips.rotation.y, bodySwayY * 0.6, 0.08)
      }

      // Spine & Chest breathing expansion
      if (spine) {
        const spineTargetX = breathCycle * 0.008
        const spineTargetZ = -bodySwayZ * 0.5 // counter-balance hips
        spine.rotation.x = THREE.MathUtils.lerp(spine.rotation.x, spineTargetX, 0.1)
        spine.rotation.z = THREE.MathUtils.lerp(spine.rotation.z, spineTargetZ, 0.08)
      }

      if (chest) {
        const chestTargetX = breathCycle * 0.018 // chest expands on inhale
        chest.rotation.x = THREE.MathUtils.lerp(chest.rotation.x, chestTargetX, 0.1)
        chest.rotation.y = THREE.MathUtils.lerp(chest.rotation.y, -bodySwayY * 0.4, 0.08)
      }

      if (upperChest) {
        const upperChestX = breathCycle * 0.012
        upperChest.rotation.x = THREE.MathUtils.lerp(upperChest.rotation.x, upperChestX, 0.1)
      }

      // Neck gentle counter-rotation
      if (neck) {
        const neckCamFollowY = THREE.MathUtils.clamp(-cameraPos.x * 0.04, -0.1, 0.1)
        neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, neckCamFollowY, 0.08)
        neck.rotation.x = THREE.MathUtils.lerp(neck.rotation.x, -breathCycle * 0.006, 0.08)
      }

      // Head Posture & Expressive AI Micro-gestures
      if (head) {
        const [baseTiltX, baseTiltY, baseTiltZ] = config.headRotation

        // Camera tracking subtle parallax
        const camYaw = THREE.MathUtils.clamp(-cameraPos.x * 0.1, -0.15, 0.15)
        const camPitch = THREE.MathUtils.clamp((cameraPos.y - 0.38) * 0.08, -0.1, 0.1)

        // Subtle lifelike idle drift
        const idleDriftX = Math.sin(t * 0.7) * 0.01
        const idleDriftY = Math.cos(t * 0.5) * 0.015
        const idleDriftZ = Math.sin(t * 0.6) * 0.008

        let targetHeadX = baseTiltX - camPitch + idleDriftX
        let targetHeadY = baseTiltY + camYaw + idleDriftY
        let targetHeadZ = baseTiltZ + idleDriftZ

        // State-specific dynamic gestures
        if (isSpeaking) {
          // Conversational cadence nods & emphasis
          targetHeadX += Math.sin(t * 3.8) * 0.022 + Math.cos(t * 7.2) * 0.008
          targetHeadY += Math.sin(t * 2.1) * 0.012
        } else if (isListening) {
          // Receptive attentive listening nod
          targetHeadX += Math.sin(t * 2.2) * 0.018
          targetHeadZ += 0.04 // attentive head tilt
        } else if (state === 'thinking') {
          // Analytical contemplative drift
          targetHeadX += Math.sin(t * 1.5) * 0.012
          targetHeadY += Math.cos(t * 1.2) * 0.01
        }

        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetHeadX, 0.1)
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetHeadY, 0.1)
        head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, targetHeadZ, 0.1)
      }

      // Natural Arm & Hand Postures
      if (rightUpperArm && leftUpperArm) {
        const { rightArmZ, leftArmZ, rightArmX, leftArmX, elbowFlex } = config.armPosture

        // Breathing movement on arms
        const armBreath = breathCycle * 0.01

        let rArmZ = rightArmZ + armBreath
        let lArmZ = leftArmZ - armBreath
        let rArmX = rightArmX
        let lArmX = leftArmX

        // Conversational gesture wave when speaking
        if (isSpeaking) {
          rArmZ += Math.sin(t * 2.4) * 0.06
          rArmX += Math.cos(t * 2.0) * 0.05
          lArmZ += Math.sin(t * 2.2) * 0.03
          lArmX += Math.cos(t * 1.8) * 0.03
        }

        rightUpperArm.rotation.z = THREE.MathUtils.lerp(rightUpperArm.rotation.z, rArmZ, 0.08)
        leftUpperArm.rotation.z = THREE.MathUtils.lerp(leftUpperArm.rotation.z, lArmZ, 0.08)
        rightUpperArm.rotation.x = THREE.MathUtils.lerp(rightUpperArm.rotation.x, rArmX, 0.08)
        leftUpperArm.rotation.x = THREE.MathUtils.lerp(leftUpperArm.rotation.x, lArmX, 0.08)

        if (rightLowerArm && leftLowerArm) {
          rightLowerArm.rotation.y = THREE.MathUtils.lerp(rightLowerArm.rotation.y, -elbowFlex, 0.08)
          leftLowerArm.rotation.y = THREE.MathUtils.lerp(leftLowerArm.rotation.y, elbowFlex, 0.08)
        }
      }
    }

    // ──────────────────────────────────────────────
    // 3. Eye Saccades & LookAt Tracking
    // ──────────────────────────────────────────────
    this.saccadeTimer += dt
    if (this.saccadeTimer > this.nextSaccadeInterval) {
      this.saccadeTimer = 0
      this.nextSaccadeInterval = 1.6 + Math.random() * 2.2
      // Micro-saccades around camera target
      this.gazeOffset.set(
        (Math.random() - 0.5) * 0.06,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.02
      )
    }

    this.lookAtTargetObj.position.lerp(
      new THREE.Vector3().copy(cameraPos).add(this.gazeOffset),
      0.08
    )

    // ──────────────────────────────────────────────
    // 4. Natural Blinking Engine
    // ──────────────────────────────────────────────
    this.blinkTimer += dt

    if (!this.isBlinking && this.blinkTimer > this.nextBlinkInterval) {
      this.isBlinking = true
      this.blinkTimer = 0
      this.isDoubleBlink = Math.random() < 0.18 // 18% chance of double blink
      this.doubleBlinkStage = 0
    }

    if (this.isBlinking) {
      const bDuration = this.blinkDuration
      const half = bDuration * 0.45

      if (this.blinkTimer < half) {
        // Easing eyes closed
        this.blinkWeight = Math.sin((this.blinkTimer / half) * (Math.PI / 2))
      } else if (this.blinkTimer < bDuration) {
        // Easing eyes open
        const openProgress = (this.blinkTimer - half) / (bDuration - half)
        this.blinkWeight = Math.cos(openProgress * (Math.PI / 2))
      } else {
        if (this.isDoubleBlink && this.doubleBlinkStage === 0) {
          // Trigger second blink immediately
          this.doubleBlinkStage = 1
          this.blinkTimer = 0
        } else {
          this.isBlinking = false
          this.blinkWeight = 0
          this.blinkTimer = 0
          this.nextBlinkInterval = 2.6 + Math.random() * 3.4
        }
      }
    } else {
      this.blinkWeight = 0
    }

    // ──────────────────────────────────────────────
    // 5. Speech-Synchronized Lip-Sync Engine
    // ──────────────────────────────────────────────
    let targetAA = 0
    let targetIH = 0
    let targetOU = 0
    let targetEE = 0
    let targetOH = 0

    if (isSpeaking) {
      // Natural speech cadence carrier: ~4.1 Hz syllables
      const syllable = Math.sin(t * 12.8) * 0.5 + 0.5
      // Secondary articulation harmonic: ~7.6 Hz
      const articulation = Math.cos(t * 18.5) * 0.5 + 0.5
      // Consonant closure pulses
      const modulation = syllable * (0.6 + articulation * 0.4)

      // Natural speech phrase breathing pause (every ~2.2 seconds mouth briefly pauses)
      const phrasePause = Math.sin(t * 2.8) > 0.85 ? 0.2 : 1.0

      // Dynamic vowel variety
      targetAA = THREE.MathUtils.clamp(Math.sin(t * 11.2) * 0.5 + 0.5, 0, 1) * 0.45 * modulation * phrasePause
      targetOH = THREE.MathUtils.clamp(Math.cos(t * 8.6) * 0.5 + 0.5, 0, 1) * 0.25 * modulation * phrasePause
      targetEE = THREE.MathUtils.clamp(Math.sin(t * 14.5) * 0.5 + 0.5, 0, 1) * 0.22 * modulation * phrasePause
      targetIH = THREE.MathUtils.clamp(Math.cos(t * 13.0) * 0.5 + 0.5, 0, 1) * 0.18 * modulation * phrasePause
      targetOU = THREE.MathUtils.clamp(Math.sin(t * 7.4) * 0.5 + 0.5, 0, 1) * 0.12 * modulation * phrasePause
    }

    // Smooth mouth transitions (fast open ~0.35, smooth close ~0.25)
    const mouthLerp = isSpeaking ? 0.35 : 0.22
    this.mouthAA = THREE.MathUtils.lerp(this.mouthAA, targetAA, mouthLerp)
    this.mouthIH = THREE.MathUtils.lerp(this.mouthIH, targetIH, mouthLerp)
    this.mouthOU = THREE.MathUtils.lerp(this.mouthOU, targetOU, mouthLerp)
    this.mouthEE = THREE.MathUtils.lerp(this.mouthEE, targetEE, mouthLerp)
    this.mouthOH = THREE.MathUtils.lerp(this.mouthOH, targetOH, mouthLerp)

    // ──────────────────────────────────────────────
    // 6. Facial Expressions Smooth Interpolation
    // ──────────────────────────────────────────────
    const targetHappy = config.blendshapes.happy ?? 0
    const targetSad = config.blendshapes.sad ?? 0
    const targetSurprised = config.blendshapes.surprised ?? 0
    const targetRelaxed = config.blendshapes.relaxed ?? 0
    const targetAngry = config.blendshapes.angry ?? 0
    const targetNeutral = config.blendshapes.neutral ?? 0

    const exprLerp = 0.1
    this.exprWeights.happy = THREE.MathUtils.lerp(this.exprWeights.happy, targetHappy, exprLerp)
    this.exprWeights.sad = THREE.MathUtils.lerp(this.exprWeights.sad, targetSad, exprLerp)
    this.exprWeights.surprised = THREE.MathUtils.lerp(this.exprWeights.surprised, targetSurprised, exprLerp)
    this.exprWeights.relaxed = THREE.MathUtils.lerp(this.exprWeights.relaxed, targetRelaxed, exprLerp)
    this.exprWeights.angry = THREE.MathUtils.lerp(this.exprWeights.angry, targetAngry, exprLerp)
    this.exprWeights.neutral = THREE.MathUtils.lerp(this.exprWeights.neutral, targetNeutral, exprLerp)

    // Apply expressions to VRM
    if (this.vrm.expressionManager) {
      // Blinking
      setVRMExpressionSafely(this.vrm, 'blink', this.blinkWeight)

      // Mouth vowels
      setVRMExpressionSafely(this.vrm, 'aa', this.mouthAA)
      setVRMExpressionSafely(this.vrm, 'ih', this.mouthIH)
      setVRMExpressionSafely(this.vrm, 'ou', this.mouthOU)
      setVRMExpressionSafely(this.vrm, 'ee', this.mouthEE)
      setVRMExpressionSafely(this.vrm, 'oh', this.mouthOH)

      // Emotions
      setVRMExpressionSafely(this.vrm, 'happy', this.exprWeights.happy)
      setVRMExpressionSafely(this.vrm, 'sad', this.exprWeights.sad)
      setVRMExpressionSafely(this.vrm, 'surprised', this.exprWeights.surprised)
      setVRMExpressionSafely(this.vrm, 'relaxed', this.exprWeights.relaxed)
      setVRMExpressionSafely(this.vrm, 'angry', this.exprWeights.angry)
      setVRMExpressionSafely(this.vrm, 'neutral', this.exprWeights.neutral)
    }

    // ──────────────────────────────────────────────
    // 7. Update VRM Runtime (Humanoid + Physics + Expressions + LookAt)
    // ──────────────────────────────────────────────
    this.vrm.update(dt)
  }

  public dispose(): void {
    if (this.vrm && this.vrm.scene) {
      VRMUtils.deepDispose(this.vrm.scene)
    }
  }
}
