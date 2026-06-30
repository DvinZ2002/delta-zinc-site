import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Factory,
  FlaskConical,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SPOTLIGHT_R = 260;
const HEADER_LOGO_SRC = "/delta-header-logo.png";
const HERO_VIDEO_SRC = "/hero-logo-motion.mp4";
const PROCESS_VIDEO_SRC = "/process-scroll.mov";

type Point = {
  x: number;
  y: number;
};

const capabilityCards = [
  {
    icon: <Factory size={18} />,
    label: "Die Casters",
    value: "Production-ready ingots for high-volume parts.",
  },
  {
    icon: <FlaskConical size={18} />,
    label: "Controlled Chemistry",
    value: "Zamak grades and custom alloy targets.",
  },
  {
    icon: <PackageCheck size={18} />,
    label: "Lot Traceability",
    value: "Batch records aligned to industrial QA needs.",
  },
  {
    icon: <Truck size={18} />,
    label: "Bulk Delivery",
    value: "Reliable supply for foundry operations.",
  },
];

const qualitySteps = [
  {
    label: "Charge",
    text: "Raw materials are staged, weighed, and prepared before melt-in.",
  },
  {
    label: "Check",
    text: "Chemistry, temperature, and lot records are verified during production.",
  },
  {
    label: "Release",
    text: "Finished ingots are inspected, marked, and cleared for bulk dispatch.",
  },
];

function getViewportCenter(): Point {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

function LogoMark() {
  return (
    <img
      src={HEADER_LOGO_SRC}
      alt="Delta"
      className="h-14 w-auto max-w-[44vw] object-contain sm:h-16"
      draggable={false}
    />
  );
}

function RevealLayer({ cursorPos }: { cursorPos: Point }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const maskElement = maskRef.current;
    if (!canvas || !maskElement) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { x: cursorX, y: cursorY } = cursorPos;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,1)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.beginPath();
    context.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();

    const maskImage = `url(${canvas.toDataURL()})`;
    maskElement.style.maskImage = maskImage;
    maskElement.style.setProperty("-webkit-mask-image", maskImage);
  });

  return (
    <>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
        style={
          {
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <div className="relative flex h-full w-full items-center justify-center px-4">
          <span className="select-none text-[clamp(5rem,20vw,18rem)] font-bold leading-none tracking-[0.04em] text-white">
            Delta
          </span>
        </div>
      </div>
    </>
  );
}

function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const lines = text.split("\n");
  const charDelay = 30;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={line} className="block">
          {line.split("").map((char, charIndex) => {
            const delay = lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={`${lineIndex}-${charIndex}-${char}`}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const copySectionRef = useRef<HTMLElement>(null);
  const qualitySectionRef = useRef<HTMLElement>(null);
  const processVideoRef = useRef<HTMLVideoElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const qualityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef<Point>(getViewportCenter());
  const smooth = useRef<Point>(getViewportCenter());
  const [cursorPos, setCursorPos] = useState<Point>(getViewportCenter);

  useEffect(() => {
    const centerCursor = () => {
      const center = getViewportCenter();
      mouse.current = center;
      smooth.current = center;
      setCursorPos(center);
    };

    centerCursor();
    window.addEventListener("resize", centerCursor);

    return () => {
      window.removeEventListener("resize", centerCursor);
    };
  }, []);

  useEffect(() => {
    const restartHeroVideo = () => {
      const video = heroVideoRef.current;
      if (!video) return;

      video.currentTime = 0;
      void video.play();
    };

    restartHeroVideo();
    window.addEventListener("pageshow", restartHeroVideo);

    return () => {
      window.removeEventListener("pageshow", restartHeroVideo);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const section = copySectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        copyRefs.current.filter(Boolean),
        { autoAlpha: 0, y: 64, filter: "blur(18px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.22,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const section = qualitySectionRef.current;
    const video = processVideoRef.current;
    if (!section || !video) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".quality-panel",
        { autoAlpha: 0, y: 64, filter: "blur(18px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        qualityRefs.current.filter(Boolean),
        { autoAlpha: 0, y: 48, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    const playProcessVideo = () => {
      void video.play().catch(() => {
        // Muted autoplay can still be delayed by the browser until it is ready.
      });
    };

    video.addEventListener("canplay", playProcessVideo);
    video.load();
    playProcessVideo();

    return () => {
      context.revert();
      video.removeEventListener("canplay", playProcessVideo);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    mouse.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  return (
    <div className="relative min-h-screen bg-[#050505] font-sans text-white">
      <section
        id="top"
        ref={heroRef}
        className="relative z-0 flex h-[100dvh] w-full overflow-hidden bg-black"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <video
            ref={heroVideoRef}
            src={HERO_VIDEO_SRC}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={(event) => {
              event.currentTarget.pause();
            }}
          />
        </div>

        <div className="absolute left-0 right-0 top-0 z-50 px-6 pt-6 md:px-12 lg:px-16">
          <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
            <a href="#top" aria-label="Delta home" className="relative z-10">
              <LogoMark />
            </a>
            <div className="relative z-10 hidden items-center gap-8 text-sm text-white md:flex">
              {["Story", "Investing", "Building", "Advisory"].map((item) => (
                <a
                  key={item}
                  href="#alloys"
                  className="transition-colors hover:text-gray-300"
                >
                  {item}
                </a>
              ))}
            </div>
            <a
              href="#quote"
              className="relative z-10 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              Start a Chat
            </a>
          </nav>
        </div>

        <RevealLayer cursorPos={cursorPos} />

        <main className="relative z-40 flex h-full w-full flex-1 flex-col justify-end px-6 pb-12 pt-28 md:px-12 lg:grid lg:grid-cols-2 lg:items-end lg:px-16 lg:pb-16">
          <div>
            <h1
              className="mb-4 whitespace-nowrap text-4xl font-normal leading-[1.04] text-white md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              <AnimatedHeading text={"Shaping tomorrow\nwith vision and action."} />
            </h1>

            <FadeIn delay={800} duration={1000}>
              <p className="mb-5 max-w-[620px] text-base leading-relaxed text-gray-300 md:text-lg">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#quote"
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                >
                  Start a Chat
                </a>
                <a
                  href="#alloys"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn
            delay={1400}
            duration={1000}
            className="mt-10 flex items-end justify-start lg:mt-0 lg:justify-end"
          >
            <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
              <p className="text-lg font-light text-white md:text-xl lg:text-2xl">
                Investing. Building. Advisory.
              </p>
            </div>
          </FadeIn>
        </main>
      </section>

      <section
        id="alloys"
        ref={copySectionRef}
        className="relative z-20 min-h-[120dvh] overflow-hidden bg-black px-5 py-24 text-white sm:px-8 md:px-12 md:py-32"
        style={{ boxShadow: "0 -20px 70px rgba(0,0,0,0.72)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div
            ref={(element) => {
              copyRefs.current[0] = element;
            }}
            className="self-start"
          >
            <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Industrial Supply
            </p>
            <div className="grid gap-3">
              {capabilityCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-sm border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                >
                  <div className="mb-3 flex items-center gap-2 text-white/70">
                    {card.icon}
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-white/52">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-12">
            <div
              ref={(element) => {
                copyRefs.current[1] = element;
              }}
              className="max-w-5xl"
            >
              <p className="text-[clamp(2.5rem,6vw,6.4rem)] font-medium leading-[0.98] tracking-tight text-white">
                Precision zinc alloy ingots for die casters, foundries, hardware
                manufacturers, automotive component producers, and industrial
                casting operations.
              </p>
            </div>

            <div
              id="traceability"
              ref={(element) => {
                copyRefs.current[2] = element;
              }}
              className="max-w-3xl border-l border-white/16 pl-6 md:ml-auto"
            >
              <div className="mb-5 flex items-center gap-3 text-white/70">
                <ShieldCheck size={20} />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em]">
                  Chemistry. Records. Delivery.
                </span>
              </div>
              <p className="text-xl leading-9 text-white/72 md:text-2xl md:leading-10">
                We manufacture and supply Zamak 3, Zamak 5, Zamak 2, Zamak 7,
                and custom zinc alloy ingots with controlled chemistry, lot
                traceability, and reliable bulk delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quality"
        ref={qualitySectionRef}
        className="relative z-20 min-h-[360dvh] overflow-visible bg-black text-white"
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
          <video
            ref={processVideoRef}
            src={PROCESS_VIDEO_SRC}
            className="absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,transparent_0%,rgba(0,0,0,0.26)_44%,rgba(0,0,0,0.82)_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className="quality-panel mx-auto flex h-[100dvh] w-[90%] items-end pb-14 md:pb-20">
            <div className="max-w-[920px]">
              <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                Process Assurance
              </p>
              <h2 className="text-[clamp(2.6rem,7vw,7rem)] font-medium leading-[0.95] tracking-tight text-white">
                From start to finish, all with quality checks.
              </h2>
            </div>
          </div>

          <div className="quality-panel mx-auto grid h-[100dvh] w-[90%] items-center md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-8">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white/42">
                Staging To Melt
              </p>
              <p className="text-[clamp(1.5rem,3.2vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-white">
                Materials are staged, weighed, melted, and checked against alloy
                targets before each batch moves forward.
              </p>
            </div>
          </div>

          <div className="quality-panel mx-auto grid h-[100dvh] w-[90%] items-center md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white/42">
                Verify And Release
              </p>
              <p className="text-[clamp(1.5rem,3.2vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-white">
                Chemistry, surface condition, lot traceability, and release
                documentation stay visible before bulk delivery.
              </p>
            </div>
          </div>

          <div className="mx-auto flex min-h-[100dvh] w-[90%] items-end pb-16">
            <div
              className="w-full border border-white/10 bg-[#1A1A1A]/60 p-[clamp(32px,4vw,64px)] backdrop-blur-[80px]"
              style={{ WebkitBackdropFilter: "blur(80px)" }}
            >
              <div className="flex flex-wrap items-end justify-between gap-10 border-b border-white/10 pb-[clamp(48px,4vw,80px)]">
                <div>
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/32">
                    Quality Gate
                  </p>
                  <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
                    Ready For Controlled
                    <br />
                    Production Runs?
                  </h2>
                </div>
                <a
                  href="#quote"
                  className="pointer-events-auto group flex items-stretch gap-1"
                >
                  <span className="bg-white px-8 py-5 font-mono text-[12px] font-bold tracking-[-0.01em] text-black transition-colors group-hover:bg-gray-200">
                    START QUALITY REVIEW
                  </span>
                  <span className="flex items-center bg-white px-6 text-black transition-colors group-hover:bg-gray-200">
                    <ArrowRight size={20} />
                  </span>
                </a>
              </div>

              <div className="grid gap-[clamp(32px,3vw,48px)] pt-[clamp(48px,4vw,64px)] md:grid-cols-4">
                <div>
                  <LogoMark />
                  <p className="mt-6 max-w-[220px] text-[13px] leading-6 text-white/40">
                    Premium zinc alloy supply with process checkpoints from raw
                    material intake to release.
                  </p>
                </div>
                <div>
                  <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
                    MATERIAL
                  </h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>Zamak 3</li>
                    <li>Zamak 5</li>
                    <li>Zamak 2</li>
                    <li>Zamak 7</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
                    CHECKPOINTS
                  </h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>Melt control</li>
                    <li>Chemistry review</li>
                    <li>Surface inspection</li>
                    <li>Lot records</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
                    RELEASE
                  </h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>Bulk orders</li>
                    <li>Foundries</li>
                    <li>Die casters</li>
                    <li>Industrial casting</li>
                  </ul>
                </div>
              </div>

              <div
                ref={(element) => {
                  qualityRefs.current[0] = element;
                }}
                className="mt-14 grid gap-3 md:grid-cols-3"
              >
                {qualitySteps.map((step, index) => (
                  <div
                    key={step.label}
                    ref={(element) => {
                      qualityRefs.current[index + 1] = element;
                    }}
                    className="rounded-sm border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                        0{index + 1}
                      </span>
                      <PackageCheck size={18} className="text-white/52" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{step.label}</h3>
                    <p className="text-sm leading-6 text-white/54">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="delivery"
          className="relative z-20 mx-auto flex w-[90%] flex-col justify-between gap-6 border-t border-white/10 py-8 text-white/44 sm:flex-row"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.24em]">
            Delta Zinc Alloys
          </p>
          <p id="quote" className="max-w-lg text-sm leading-6">
            Built for repeatable alloy sourcing across die casting, foundry,
            automotive, hardware, and industrial casting operations.
          </p>
        </div>
      </section>
    </div>
  );
}
