import React, { useId } from "react";

export interface TextShimmerWaveProps {
  children?: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  baseColor?: string;
  shimmerColor?: string;
  yDistance?: number;
  zDistance?: number;
  xDistance?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  spread?: number;
  style?: React.CSSProperties;
}

export function TextShimmerWave({
  children = "Choylashamiz...",
  as: Component = "p",
  className = "",
  duration = 1.2,
  baseColor = "rgba(156, 163, 175, 0.4)",
  shimmerColor = "#111827",
  yDistance = -5,
  zDistance = 10,
  xDistance = 0,
  scaleDistance = 1.1,
  rotateYDistance = 8,
  spread = 1,
  style,
}: TextShimmerWaveProps) {
  const reactId = useId();
  const animName = `shimmer-wave-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const text = typeof children === "string" ? children : String(children ?? "");

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotateY(0deg);
            color: var(--base-color);
            opacity: 0.45;
          }
          50% {
            transform: translate3d(${xDistance}px, ${yDistance}px, ${zDistance}px) scale(${scaleDistance}) rotateY(${rotateYDistance}deg);
            color: var(--shimmer-color);
            opacity: 1;
          }
        }
      `}</style>
      <Component
        className={`relative inline-flex items-center select-none [perspective:600px] ${className}`}
        style={{
          ...style,
          "--base-color": baseColor,
          "--shimmer-color": shimmerColor,
        } as React.CSSProperties}
      >
        {text.split("").map((char, i) => {
          const delay = (i * duration * (1 / spread)) / (text.length || 1);

          return (
            <span
              key={i}
              className="inline-block whitespace-pre [transform-style:preserve-3d] will-change-transform font-medium"
              style={{
                animation: `${animName} ${duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: `${delay}s`,
                animationFillMode: "both",
              }}
            >
              {char}
            </span>
          );
        })}
      </Component>
    </>
  );
}

export interface LoaderProps {
  text?: string;
  className?: string;
  textClassName?: string;
  duration?: number;
  baseColor?: string;
  shimmerColor?: string;
}

export function Loader({
  text = "Choylashamiz...",
  className = "",
  textClassName = "text-xl font-semibold sora",
duration = 1.3,
  baseColor = "#9ca3af",
  shimmerColor = "#C2C2C2",
}: LoaderProps) {
  return (
    <div className={`w-full py-10 flex items-center justify-center ${className}`}>
      <TextShimmerWave
        className={textClassName}
        duration={duration}
        baseColor={baseColor}
        shimmerColor={shimmerColor}
        yDistance={-6}
        scaleDistance={1.12}
      >
        {text}
      </TextShimmerWave>
    </div>
  );
}
