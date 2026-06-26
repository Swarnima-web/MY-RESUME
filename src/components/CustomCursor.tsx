import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Set initial offscreen positions
    gsap.set([cursor, trail], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, target } = event;

      // Animate cursor dot (tighter follow)
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Animate cursor lagging trail (slower, smoother follow)
      gsap.to(trail, {
        x: clientX,
        y: clientY,
        duration: 0.35,
        ease: "power3.out"
      });

      // Interactive hover state detection via event delegation
      const isHoverable = (target as HTMLElement)?.closest(
        'a, button, select, input, textarea, [role="button"], .group, .interactive'
      );

      if (isHoverable) {
        // Explode trail, shrink cursor dot, and add a glow fill
        gsap.to(trail, {
          scale: 1.6,
          borderColor: "rgba(0, 217, 255, 0.8)",
          backgroundColor: "rgba(0, 217, 255, 0.08)",
          duration: 0.3,
          overwrite: "auto"
        });
        gsap.to(cursor, {
          scale: 0.5,
          backgroundColor: "#7C5CFF",
          duration: 0.3,
          overwrite: "auto"
        });
      } else {
        // Revert to normal state
        gsap.to(trail, {
          scale: 1,
          borderColor: "rgba(0, 217, 255, 0.3)",
          backgroundColor: "rgba(0, 217, 255, 0)",
          duration: 0.3,
          overwrite: "auto"
        });
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#00D9FF",
          duration: 0.3,
          overwrite: "auto"
        });
      }
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, trail], {
        opacity: 0,
        scale: 0,
        duration: 0.3
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, trail], {
        opacity: 1,
        scale: 1,
        duration: 0.3
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={trailRef}
        className="custom-cursor-trail pointer-events-none fixed left-0 top-0 z-[120] hidden h-9 w-9 rounded-full border border-cyan/30 mix-blend-screen will-change-transform lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Inner precise dot */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[121] hidden h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_#00D9FF] will-change-transform lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
