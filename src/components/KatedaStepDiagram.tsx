import React from 'react';
import { 
  Wind, 
  Lock, 
  Zap, 
  Flame, 
  Heart, 
  BookOpen, 
  Activity,
  Compass,
  Torus
} from 'lucide-react';

interface KatedaStepDiagramProps {
  stepType?: 'instruction' | 'inhale' | 'hold' | 'exhale' | 'rest' | 'static_hold' | 'action';
  stepText: string;
  stepHint?: string;
  isPlaying?: boolean;
  secondsLeft?: number;
  totalDuration?: number;
  activeLoop?: number;
  maxLoops?: number;
}

export const KatedaStepDiagram: React.FC<KatedaStepDiagramProps> = ({
  stepType = 'instruction',
  stepText,
  stepHint = '',
  isPlaying = false,
  secondsLeft = 0,
  totalDuration = 0,
  activeLoop = 1,
  maxLoops = 5
}) => {
  // Determine gradient, colors, and animations based on step type
  const theme = (() => {
    switch (stepType) {
      case 'inhale':
        return {
          bg: 'from-cyan-950/40 to-blue-950/40 border-cyan-500/20',
          accentText: 'text-cyan-400',
          ringColor: 'border-cyan-400/30',
          glowingDot: 'bg-cyan-400 shadow-cyan-500/50',
          label: 'INHALATION • RETRIEVE PRANA',
          phrase: 'Draw breath deep into your lower belly',
          icon: Wind,
          iconStyle: 'text-cyan-400 animate-pulse'
        };
      case 'hold':
        return {
          bg: 'from-amber-950/40 to-orange-950/40 border-orange-500/20',
          accentText: 'text-amber-400',
          ringColor: 'border-amber-400/30',
          glowingDot: 'bg-amber-400 shadow-amber-500/50',
          label: 'BREATH LOCK • COORDS ACTIVATED',
          phrase: 'Tense lower abs. Lock energy in Pusat',
          icon: Lock,
          iconStyle: 'text-amber-400 scale-105 duration-300'
        };
      case 'exhale':
        return {
          bg: 'from-rose-950/40 to-red-950/40 border-red-500/20',
          accentText: 'text-rose-400',
          ringColor: 'border-rose-400/30',
          glowingDot: 'bg-rose-400 shadow-rose-500/50',
          label: 'EXHALATION • EMIT VIBRATION',
          phrase: 'Push breath out. Project low vocal hum.',
          icon: Wind,
          iconStyle: 'text-rose-400 rotate-180 duration-500'
        };
      case 'static_hold':
        return {
          bg: 'from-emerald-950/40 to-teal-950/40 border-emerald-500/20',
          accentText: 'text-emerald-400',
          ringColor: 'border-emerald-400/30',
          glowingDot: 'bg-emerald-400 shadow-emerald-500/50',
          label: 'POSTURE HOLD • SOLID STANCE',
          phrase: 'Keep central axis straight. Hold coordinates.',
          icon: Flame,
          iconStyle: 'text-emerald-400 animate-bounce'
        };
      case 'action':
        return {
          bg: 'from-violet-950/50 to-indigo-950/50 border-violet-500/25 shadow-violet-950/60',
          accentText: 'text-violet-400 font-extrabold',
          ringColor: 'border-violet-500/30',
          glowingDot: 'bg-violet-400 shadow-violet-500/50',
          label: 'STRIKE / EMISSION • DYNAMIC EXPLOSION',
          phrase: 'Unleash central power on forward coordinate!',
          icon: Zap,
          iconStyle: 'text-violet-400 animate-ping'
        };
      case 'rest':
        return {
          bg: 'from-neutral-900 to-neutral-950/90 border-neutral-800/40',
          accentText: 'text-neutral-400',
          ringColor: 'border-neutral-700/20',
          glowingDot: 'bg-neutral-500 shadow-neutral-500/10',
          label: 'RECOVERY • MUSCLE RELEASE',
          phrase: 'Relax body, restore heart rate & balance',
          icon: Heart,
          iconStyle: 'text-rose-400/80 animate-pulse'
        };
      case 'instruction':
      default:
        return {
          bg: 'from-zinc-900/60 to-zinc-950/80 border-zinc-800/60',
          accentText: 'text-sky-400',
          ringColor: 'border-sky-500/20',
          glowingDot: 'bg-sky-400 shadow-sky-500/25',
          label: 'TECHNICAL SCHEMATIC • COORDINATE GUIDANCE',
          phrase: 'Review execution patterns before launch',
          icon: Compass,
          iconStyle: 'text-sky-400'
        };
    }
  })();

  const IconComponent = theme.icon;

  // Let's create different beautiful animated SVG visual bodies
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-between p-7 bg-gradient-to-b ${theme.bg} border rounded-2xl overflow-hidden font-sans select-none shadow-inner`}>
      {/* Blueprint background grid lines representing tactical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      {/* Decorative radar scanner circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-dashed border-zinc-500/5 pointer-events-none animate-[spin_50s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-[#27272a]/10 pointer-events-none" />

      {/* Header Tag Bar */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${theme.glowingDot} animate-ping`} />
          <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] font-medium uppercase">
            {theme.label}
          </span>
        </div>
        {totalDuration > 0 && secondsLeft > 0 && (
          <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 border border-[#27272a] text-[10px] font-mono text-emerald-400 font-bold">
            TIME: {secondsLeft}s
          </div>
        )}
      </div>

      {/* Central Illustration Section */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[140px] z-10 my-3">
        {/* Breathing expanding circle visual */}
        {stepType === 'inhale' && (
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Pulsing expansion wave */}
            <div className={`absolute inset-0 rounded-full border ${theme.ringColor} animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60`} />
            <div className={`absolute -inset-4 rounded-full border ${theme.ringColor} animate-[pulse_2.2s_ease-in-out_infinite] opacity-35`} />
            <div className="absolute -inset-8 rounded-full border border-cyan-400/10 pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-cyan-950/70 border-2 border-cyan-400/80 flex items-center justify-center relative shadow-lg shadow-cyan-900/30">
              <IconComponent className="w-7 h-7 text-cyan-400" />
            </div>
            {/* Arrows pointing in */}
            <div className="absolute -top-7 text-cyan-400/60 animate-bounce">↓</div>
            <div className="absolute -bottom-7 text-cyan-400/60 animate-bounce rotate-180">↓</div>
          </div>
        )}

        {/* Breath hold abdominal power / Pusat lock visual */}
        {stepType === 'hold' && (
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Rotating magnetic energy grid */}
            <div className="absolute inset-0 rounded-full border border-dashed border-orange-500/25 animate-[spin_8s_linear_infinite]" />
            <div className="absolute -inset-6 rounded-full border border-dashed border-amber-500/10 animate-[spin_12s_linear_infinite]" />
            {/* Golden Core energy ball with inner glowing core */}
            <div className="absolute w-20 h-20 rounded-full bg-amber-500/5 border border-amber-400/40 animate-pulse" />
            <div className="w-14 h-14 rounded-full bg-[#1b1008] border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-900/50 z-10 animate-[pulse_1.5s_ease-in-out_infinite]">
              <IconComponent className="w-5.5 h-5.5 text-amber-400 animate-pulse" />
            </div>
            {/* Core indicators */}
            <div className="absolute text-[8px] font-mono text-amber-500/70 font-bold bottom-1 translate-y-full tracking-tighter bg-amber-950/60 border border-amber-500/20 rounded py-0.5 px-2">
              PUSAT LOCKED
            </div>
          </div>
        )}

        {/* Breath Exhalation expansion and release */}
        {stepType === 'exhale' && (
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outward exploding waves */}
            <div className="absolute inset-0 rounded-full border border-rose-500/10 animate-[ping_2.5s_ease-out_infinite]" />
            <div className="absolute -inset-8 rounded-full border border-rose-500/5 animate-[ping_4.2s_ease-out_infinite]" />
            {/* Center */}
            <div className="w-16 h-16 rounded-full bg-rose-950/70 border-2 border-rose-400 flex items-center justify-center shadow-lg shadow-rose-900/30">
              <IconComponent className="w-7 h-7 text-rose-400 animate-[bounce_1.5s_infinite]" />
            </div>
            {/* Arrows pointing out */}
            <div className="absolute -left-7 text-rose-400/70 animate-[pulse_1s_infinite] rotate-90">↓</div>
            <div className="absolute -right-7 text-rose-400/70 animate-[pulse_1s_infinite] -rotate-90">↓</div>
          </div>
        )}

        {/* Grounded Stance outline / Isometric holds */}
        {stepType === 'static_hold' && (
          <div className="relative w-full max-w-[200px] h-28 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Force indicators on the sides */}
              <div className="absolute left-[-20px] w-1.5 h-12 bg-emerald-500/30 rounded" />
              <div className="absolute right-[-20px] w-1.5 h-12 bg-emerald-500/30 rounded" />
              <div className="absolute left-[-20px] w-1.5 h-6 bg-emerald-400 rounded top-3 animate-pulse" />
              <div className="absolute right-[-20px] w-1.5 h-6 bg-emerald-400 rounded bottom-3 animate-pulse" />
              
              <div className="w-14 h-14 rounded-full bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center relative shadow-lg shadow-emerald-950/50">
                <IconComponent className="w-6 h-6 text-emerald-300" />
              </div>
            </div>
            <div className="mt-2 text-[8px] font-mono text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-500/15 rounded px-2.5 py-0.5 tracking-wider">
              ALIGNMENT LOAD • 100%
            </div>
          </div>
        )}

        {/* Dynamic action projection strike vector */}
        {stepType === 'action' && (
          <div className="relative w-f h-28 flex items-center justify-center">
            {/* Shockwave flash ring */}
            <div className="absolute w-24 h-24 rounded-full border-2 border-violet-400/60 bg-violet-950/20 scale-110 animate-ping opacity-80" />
            <div className="absolute -inset-10 rounded-full border border-violet-500/10 pointer-events-none" />
            
            <div className="w-16 h-16 rounded-full bg-violet-950 border-3 border-violet-400 flex items-center justify-center relative shadow-xl shadow-violet-950 z-10 animate-pulse">
              <IconComponent className="w-7 h-7 text-violet-300 animate-[bounce_0.5s_infinite]" />
            </div>

            {/* Impact Lines details */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-violet-400 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-violet-400 animate-pulse" />
          </div>
        )}

        {/* Slow relaxation recovery state */}
        {stepType === 'rest' && (
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Smooth slow rotating circle */}
            <div className="absolute inset-0 rounded-full border border-zinc-800/80 animate-[spin_15s_linear_infinite]" />
            <div className="absolute w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center">
              <IconComponent className="w-5.5 h-5.5 text-rose-500/60" />
            </div>
            {/* Sinusoidal floating waves in background done in simple HTML/SVG elements */}
            <svg className="absolute w-full h-10 bottom-0 text-zinc-700/20 animate-pulse overflow-visible" viewBox="0 0 100 20">
              <path d="M 0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* General coordinate guidance or instruction step */}
        {stepType === 'instruction' && (
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-x-[-15px] inset-y-1 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_70%)]" />
            <div className="absolute inset-0 rounded border border-sky-500/15 animate-pulse" />
            <div className="w-14 h-14 rounded-xl bg-zinc-950 border-2 border-sky-500/50 flex items-center justify-center shadow-lg shadow-sky-950/20">
              <IconComponent className="w-6 h-6 text-sky-400" />
            </div>
          </div>
        )}
      </div>

      {/* Narrative guidance text */}
      <div className="w-full z-10 text-center px-1">
        <h4 className="text-sm font-semibold text-white tracking-tight leading-snug line-clamp-2 max-h-[40px]">
          {stepText || 'Executing movement coordinates...'}
        </h4>
        <p className="text-[10px] text-[#a1a1aa] font-mono mt-1 leading-normal">
          {stepHint || theme.phrase}
        </p>
      </div>

      {/* Bottom status layout bar indicator */}
      {stepType === 'hold' && maxLoops > 1 && (
        <div className="w-full mt-3 pt-3 border-t border-orange-500/10 z-10 flex justify-between items-center text-[9px] font-mono">
          <span className="text-amber-500/70 font-bold">OUTER REPETITIONS</span>
          <span className="text-amber-400 font-extrabold bg-[#160d06] px-2 py-0.5 rounded border border-amber-500/15">
            CYCLE {activeLoop} OF {maxLoops}
          </span>
        </div>
      )}
      {stepType === 'exhale' && maxLoops > 1 && (
        <div className="w-full mt-3 pt-3 border-t border-rose-500/10 z-10 flex justify-between items-center text-[9px] font-mono">
          <span className="text-rose-500/70 font-bold">VIBRATION STACK</span>
          <span className="text-rose-400 font-extrabold bg-[#1a0809] px-2 py-0.5 rounded border border-rose-500/15">
            STEP CYCLE {activeLoop} / {maxLoops}
          </span>
        </div>
      )}
      {stepType !== 'hold' && stepType !== 'exhale' && (
        <div className="w-full mt-3 pt-2.5 border-t border-zinc-800/50 z-10 flex justify-center text-[8px] font-mono text-zinc-500">
          KATEDA CORE POWER TRAINING SCHEMATICS • AUTO-GENERATED GRAPH
        </div>
      )}
    </div>
  );
};
