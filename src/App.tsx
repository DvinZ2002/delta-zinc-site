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
const PROCESS_SIDE_CLOSEUP_SRC = "/process-side-closeup.png";
const PROCESS_SIDE_STACKS_SRC = "/process-side-stacks.png";

type Point = {
  x: number;
  y: number;
};

type Language = "en" | "fa";

const capabilityIcons = [
  <Factory size={18} />,
  <FlaskConical size={18} />,
  <PackageCheck size={18} />,
  <Truck size={18} />,
];

const pageCopy = {
  en: {
    htmlLang: "en",
    dir: "ltr",
    languageButton: "فارسی",
    languageLabel: "Switch language to Farsi",
    brandReveal: "Delta",
    logoLabel: "Delta home",
    nav: ["Story", "Investing", "Building", "Advisory"],
    heroTitle: "Zinc alloys.\nMade for casting.",
    heroSubtitle:
      "Controlled chemistry, lot traceability, and reliable delivery from melt to release.",
    heroCta: "Explore Now",
    heroTag: "Zamak 3. Zamak 5. Custom.",
    alloysEyebrow: "Industrial Supply",
    alloyHeadingEyebrow: "Built For Production",
    alloyHeading: "Lab-checked alloy supply for production die casting.",
    capabilityCards: [
      {
        label: "Die Casters",
        value: "Production-ready ingots for high-volume parts.",
      },
      {
        label: "Controlled Chemistry",
        value: "Lab-checked Zamak grades and custom alloy targets.",
      },
      {
        label: "Lot Traceability",
        value: "Batch records aligned to industrial QA needs.",
      },
      {
        label: "Bulk Delivery",
        value: "Reliable supply for foundry operations.",
      },
    ],
    alloyNarrativeBlocks: [
      {
        eyebrow: "01 / Casting Operations",
        title: "Primary material for die casting",
        text: "Door knob, tap knob, hardware, and automotive component manufacturers use these zinc alloy ingots as primary material for die-cast parts.",
      },
      {
        eyebrow: "02 / Lab Quality Control",
        title: "Quality checked before release",
        text: "Each batch is sampled and checked in the lab for chemistry, melt control, and production records before it moves to delivery.",
      },
      {
        eyebrow: "03 / Zamak Range",
        title: "Standard and custom alloy programs",
        text: "We manufacture and supply Zamak 3, Zamak 5, Zamak 2, Zamak 7, and custom zinc alloy ingots with lot traceability and reliable bulk delivery.",
      },
    ],
    processEyebrow: "Process Assurance",
    processTitle: "From start to finish, all with quality checks.",
    stagingEyebrow: "Staging To Melt",
    stagingText:
      "Materials are staged, weighed, melted, and checked against alloy targets before each batch moves forward.",
    releaseEyebrow: "Verify And Release",
    releaseText:
      "Chemistry, surface condition, lot traceability, and release documentation stay visible before bulk delivery.",
    qualityGate: "Quality Gate",
    qualityTitle: "Ready For Controlled\nProduction Runs?",
    qualityButton: "START QUALITY REVIEW",
    footerIntro:
      "Premium zinc alloy supply with process checkpoints from raw material intake to release.",
    footerColumns: [
      {
        title: "MATERIAL",
        items: ["Zamak 3", "Zamak 5", "Zamak 2", "Zamak 7"],
      },
      {
        title: "CHECKPOINTS",
        items: ["Melt control", "Chemistry review", "Surface inspection", "Lot records"],
      },
      {
        title: "RELEASE",
        items: ["Bulk orders", "Foundries", "Die casters", "Industrial casting"],
      },
    ],
    qualitySteps: [
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
    ],
    deliveryBrand: "Delta Zinc Alloys",
    deliveryText:
      "Built for repeatable alloy sourcing across die casting, foundry, automotive, hardware, and industrial casting operations.",
  },
  fa: {
    htmlLang: "fa",
    dir: "rtl",
    languageButton: "English",
    languageLabel: "تغییر زبان به انگلیسی",
    brandReveal: "دلتا",
    logoLabel: "خانه دلتا",
    nav: ["داستان", "آلیاژها", "فرایند", "تماس"],
    heroTitle: "آلیاژ روی.\nآماده ریخته گری.",
    heroSubtitle:
      "کنترل ترکیب شیمیایی، ردیابی بچ و تحویل منظم؛ از مرحله ذوب تا خروج محصول.",
    heroCta: "مشاهده آلیاژها",
    heroTag: "زاماک ۳. زاماک ۵. سفارشی.",
    alloysEyebrow: "تامین صنعتی",
    alloyHeadingEyebrow: "ساخته شده برای تولید",
    alloyHeading: "آلیاژ کنترل شده برای خطوط دایکست.",
    capabilityCards: [
      {
        label: "دایکست کاران",
        value: "شمش آماده تولید برای قطعات پرتیراژ.",
      },
      {
        label: "کنترل شیمیایی",
        value: "گریدهای زاماک و ترکیب های سفارشی با بررسی آزمایشگاهی.",
      },
      {
        label: "ردیابی بچ",
        value: "سوابق تولید و بچ برای نیازهای کنترل کیفیت صنعتی.",
      },
      {
        label: "تحویل عمده",
        value: "تامین قابل اتکا برای کارخانه ها و ریخته گری ها.",
      },
    ],
    alloyNarrativeBlocks: [
      {
        eyebrow: "۰۱ / مصرف دایکست",
        title: "ماده اولیه برای قطعات دایکست",
        text: "تولیدکنندگان دستگیره در، شیرآلات، یراق آلات و قطعات خودرو از این شمش های آلیاژ روی به عنوان ماده اولیه قطعات دایکستی استفاده می کنند.",
      },
      {
        eyebrow: "۰۲ / کنترل آزمایشگاهی",
        title: "کنترل کیفیت پیش از تحویل",
        text: "از هر بچ نمونه برداری می شود و ترکیب شیمیایی، کنترل ذوب و سوابق تولید در آزمایشگاه بررسی می شود؛ سپس محصول برای ارسال آزاد می گردد.",
      },
      {
        eyebrow: "۰۳ / گریدهای زاماک",
        title: "آلیاژهای استاندارد و سفارشی",
        text: "زاماک ۳، زاماک ۵، زاماک ۲، زاماک ۷ و ترکیب های سفارشی با ردیابی بچ و تحویل عمده قابل اتکا تامین می شوند.",
      },
    ],
    processEyebrow: "تضمین فرایند",
    processTitle: "از شروع تا پایان، همراه با کنترل کیفیت.",
    stagingEyebrow: "آماده سازی تا ذوب",
    stagingText:
      "مواد اولیه آماده، توزین و ذوب می شوند و پیش از ادامه تولید با هدف آلیاژی هر بچ تطبیق داده می شوند.",
    releaseEyebrow: "بررسی و آزادسازی",
    releaseText:
      "ترکیب شیمیایی، وضعیت سطح، ردیابی بچ و مدارک آزادسازی قبل از تحویل عمده قابل پیگیری است.",
    qualityGate: "دروازه کیفیت",
    qualityTitle: "آماده تولید\nبا کنترل دقیق؟",
    qualityButton: "بررسی کیفیت تولید",
    footerIntro:
      "تامین آلیاژ روی با کنترل های مرحله ای از ورود ماده اولیه تا آزادسازی محصول.",
    footerColumns: [
      {
        title: "مواد",
        items: ["زاماک ۳", "زاماک ۵", "زاماک ۲", "زاماک ۷"],
      },
      {
        title: "کنترل ها",
        items: ["کنترل ذوب", "بررسی شیمیایی", "بازرسی سطح", "سوابق بچ"],
      },
      {
        title: "تحویل",
        items: ["سفارش عمده", "ریخته گری ها", "دایکست کاران", "تولید صنعتی"],
      },
    ],
    qualitySteps: [
      {
        label: "شارژ",
        text: "مواد اولیه پیش از ورود به ذوب، آماده سازی و توزین می شوند.",
      },
      {
        label: "کنترل",
        text: "ترکیب شیمیایی، دما و سوابق بچ در زمان تولید بررسی می شوند.",
      },
      {
        label: "آزادسازی",
        text: "شمش نهایی بازرسی، علامت گذاری و برای ارسال عمده تایید می شود.",
      },
    ],
    deliveryBrand: "آلیاژ روی دلتا",
    deliveryText:
      "ساخته شده برای تامین تکرارپذیر خطوط دایکست، ریخته گری، خودرو، یراق آلات و تولید صنعتی.",
  },
} as const;

const navHref = ["#alloys", "#alloys", "#quality", "#delivery"];

const textAlign = {
  en: "text-left",
  fa: "text-right",
} as const;

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

function RevealLayer({
  cursorPos,
  text,
  isFarsi,
}: {
  cursorPos: Point;
  text: string;
  isFarsi: boolean;
}) {
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
          <span
            className={`select-none font-bold leading-none text-white ${
              isFarsi
                ? "font-persian text-[clamp(5rem,18vw,16rem)] tracking-normal"
                : "text-[clamp(5rem,20vw,18rem)] tracking-[0.04em]"
            }`}
          >
            {text}
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

function AnimatedHeading({
  text,
  isFarsi = false,
}: {
  text: string;
  isFarsi?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const lines = text.split("\n");
  const charDelay = 30;

  useEffect(() => {
    setIsVisible(false);

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [text]);

  if (isFarsi) {
    return (
      <>
        {lines.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            className="block transition-all duration-700"
            dir="rtl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(18px)",
              transitionDelay: `${lineIndex * 180}ms`,
            }}
          >
            {line}
          </span>
        ))}
      </>
    );
  }

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
                  transform: isVisible
                    ? "translateX(0)"
                    : `translateX(${isFarsi ? "18px" : "-18px"})`,
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
  const alloyNarrativeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const qualityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef<Point>(getViewportCenter());
  const smooth = useRef<Point>(getViewportCenter());
  const [cursorPos, setCursorPos] = useState<Point>(getViewportCenter);
  const [language, setLanguage] = useState<Language>("en");
  const copy = pageCopy[language];
  const isFarsi = language === "fa";
  const capabilities = copy.capabilityCards.map((card, index) => ({
    ...card,
    icon: capabilityIcons[index],
  }));

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = copy.dir;
    document.body.dir = copy.dir;
    document.title = isFarsi ? "آلیاژ روی دلتا" : "Delta Zinc Alloys";
    ScrollTrigger.refresh();
  }, [copy.dir, copy.htmlLang, isFarsi]);

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
        { autoAlpha: 0, y: 36, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        },
      );

      alloyNarrativeRefs.current.filter(Boolean).forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 72, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.7,
            },
          },
        );
      });
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
    <div
      dir={copy.dir}
      className={`relative min-h-screen bg-[#050505] text-white ${
        isFarsi ? "font-persian persian-copy" : "font-sans"
      }`}
    >
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
          <nav className="liquid-glass relative flex items-center justify-between gap-4 rounded-xl px-4 py-2">
            <a href="#top" aria-label={copy.logoLabel} className="relative z-10">
              <LogoMark />
            </a>
            <div className="relative z-10 ml-auto hidden items-center gap-8 text-sm text-white md:flex lg:absolute lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
              {copy.nav.map((item, index) => (
                <a
                  key={item}
                  href={navHref[index]}
                  className={`transition-colors hover:text-gray-300 ${
                    isFarsi ? "text-[15px] font-medium" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label={copy.languageLabel}
              onClick={() => {
                setLanguage((current) => (current === "en" ? "fa" : "en"));
              }}
              className="relative z-10 ml-auto rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black md:ml-0"
            >
              {copy.languageButton}
            </button>
          </nav>
        </div>

        <RevealLayer cursorPos={cursorPos} text={copy.brandReveal} isFarsi={isFarsi} />

        <main
          className={`relative z-40 flex h-full w-full flex-1 flex-col justify-end px-6 pb-12 pt-28 md:px-12 lg:grid lg:grid-cols-2 lg:items-end lg:px-16 lg:pb-16 ${textAlign[language]}`}
        >
          <div className="max-w-[34rem] lg:max-w-none">
            <h1
              className={`mb-4 font-normal text-white ${
                isFarsi
                  ? "text-[clamp(2.35rem,10vw,4.2rem)] leading-[1.16] tracking-normal md:text-5xl lg:text-6xl"
                  : "text-[clamp(2.65rem,12vw,4.8rem)] leading-[0.96] md:text-5xl lg:text-6xl xl:text-7xl"
              }`}
              style={{ letterSpacing: isFarsi ? "0" : "-0.035em" }}
            >
              <AnimatedHeading text={copy.heroTitle} isFarsi={isFarsi} />
            </h1>

            <FadeIn delay={800} duration={1000}>
              <p
                className={`mb-5 max-w-[28rem] text-[15px] leading-7 text-gray-300 md:text-lg md:leading-8 ${
                  isFarsi ? "mr-0 md:max-w-[32rem]" : ""
                }`}
              >
                {copy.heroSubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className={`flex flex-wrap gap-4 ${isFarsi ? "justify-end" : ""}`}>
                <a
                  href="#alloys"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  {copy.heroCta}
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
              <p className="text-base font-light text-white md:text-xl lg:text-2xl">
                {copy.heroTag}
              </p>
            </div>
          </FadeIn>
        </main>
      </section>

      <section
        id="alloys"
        ref={copySectionRef}
        className="relative z-20 min-h-[170dvh] overflow-hidden bg-black px-5 py-24 text-white sm:px-8 md:px-12 md:py-32"
        style={{ boxShadow: "0 -20px 70px rgba(0,0,0,0.72)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div
          className={`mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 ${textAlign[language]}`}
        >
          <div
            ref={(element) => {
              copyRefs.current[0] = element;
            }}
            className="self-start lg:sticky lg:top-28"
          >
            <p
              className={`mb-5 text-[11px] font-semibold uppercase text-white/40 ${
                isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.28em]"
              }`}
            >
              {copy.alloysEyebrow}
            </p>
            <div className="grid gap-3">
              {capabilities.map((card) => (
                <div
                  key={card.label}
                  className="rounded-sm border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                >
                  <div
                    className={`mb-3 flex items-center gap-2 text-white/70 ${
                      isFarsi ? "justify-end" : ""
                    }`}
                  >
                    {card.icon}
                    <span
                      className={`text-[11px] font-semibold uppercase ${
                        isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.18em]"
                      }`}
                    >
                      {card.label}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-white/52">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-8 md:gap-10">
            <div
              ref={(element) => {
                copyRefs.current[1] = element;
              }}
              className="max-w-2xl"
            >
              <p
                className={`text-[10px] font-semibold uppercase text-white/35 ${
                  isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.3em]"
                }`}
              >
                {copy.alloyHeadingEyebrow}
              </p>
              <h2
                className={`mt-4 font-medium text-white ${
                  isFarsi
                    ? "text-[clamp(2rem,6vw,4.1rem)] leading-[1.12] tracking-normal"
                    : "text-[clamp(2rem,7vw,4.8rem)] leading-[0.98] tracking-tight"
                }`}
              >
                {copy.alloyHeading}
              </h2>
            </div>

            <div id="traceability" className="grid gap-5 md:gap-6">
              {copy.alloyNarrativeBlocks.map((block, index) => (
                <div
                  key={block.title}
                  ref={(element) => {
                    alloyNarrativeRefs.current[index] = element;
                  }}
                  className="rounded-sm border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-7 lg:p-9"
                >
                  <div
                    className={`mb-5 flex items-center gap-3 text-white/62 ${
                      isFarsi ? "justify-end" : ""
                    }`}
                  >
                    {index === 2 ? <ShieldCheck size={20} /> : <PackageCheck size={20} />}
                    <span
                      className={`text-[10px] font-semibold uppercase ${
                        isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.24em]"
                      }`}
                    >
                      {block.eyebrow}
                    </span>
                  </div>
                  <h3
                    className={`max-w-3xl font-medium text-white ${
                      isFarsi
                        ? "text-[clamp(1.65rem,3.5vw,3rem)] leading-[1.18] tracking-normal"
                        : "text-[clamp(1.65rem,4vw,3.4rem)] leading-[1.02] tracking-tight"
                    }`}
                  >
                    {block.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg md:leading-8">
                    {block.text}
                  </p>
                </div>
              ))}
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
          <div
            className="absolute inset-0 hidden grid-cols-[minmax(0,1fr)_min(100vw,56.25dvh)_minmax(0,1fr)] lg:grid"
            aria-hidden="true"
          >
            <div className="relative overflow-hidden">
              <img
                src={PROCESS_SIDE_CLOSEUP_SRC}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/24" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
            </div>
            <div className="bg-black" />
            <div className="relative overflow-hidden">
              <img
                src={PROCESS_SIDE_STACKS_SRC}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/28" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
            </div>
          </div>
          <video
            ref={processVideoRef}
            src={PROCESS_VIDEO_SRC}
            className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-black object-contain lg:w-[min(100vw,56.25dvh)]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-black via-black/70 to-transparent sm:h-52 md:h-64"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,transparent_0%,rgba(0,0,0,0.26)_44%,rgba(0,0,0,0.82)_100%)]" />
        </div>

        <div className={`pointer-events-none absolute inset-x-0 top-0 z-10 ${textAlign[language]}`}>
          <div className="quality-panel mx-auto flex h-[100dvh] w-[90%] items-end pb-14 md:pb-20">
            <div className="max-w-[920px]">
              <p
                className={`mb-5 text-[10px] font-semibold uppercase text-white/45 ${
                  isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.32em]"
                }`}
              >
                {copy.processEyebrow}
              </p>
              <h2
                className={`font-medium text-white ${
                  isFarsi
                    ? "text-[clamp(2.2rem,6vw,5.6rem)] leading-[1.12] tracking-normal"
                    : "text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] tracking-tight"
                }`}
              >
                {copy.processTitle}
              </h2>
            </div>
          </div>

          <div className="quality-panel mx-auto grid h-[100dvh] w-[90%] items-center md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-8">
              <p
                className={`mb-4 text-[10px] font-semibold uppercase text-white/42 ${
                  isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.32em]"
                }`}
              >
                {copy.stagingEyebrow}
              </p>
              <p
                className={`font-medium text-white ${
                  isFarsi
                    ? "text-[clamp(1.45rem,3vw,3rem)] leading-[1.2] tracking-normal"
                    : "text-[clamp(1.5rem,3.2vw,3.4rem)] leading-[1.05] tracking-tight"
                }`}
              >
                {copy.stagingText}
              </p>
            </div>
          </div>

          <div className="quality-panel mx-auto grid h-[100dvh] w-[90%] items-center md:grid-cols-12">
            <div className="md:col-span-5">
              <p
                className={`mb-4 text-[10px] font-semibold uppercase text-white/42 ${
                  isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.32em]"
                }`}
              >
                {copy.releaseEyebrow}
              </p>
              <p
                className={`font-medium text-white ${
                  isFarsi
                    ? "text-[clamp(1.45rem,3vw,3rem)] leading-[1.2] tracking-normal"
                    : "text-[clamp(1.5rem,3.2vw,3.4rem)] leading-[1.05] tracking-tight"
                }`}
              >
                {copy.releaseText}
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
                  <p
                    className={`mb-5 text-[10px] uppercase text-white/32 ${
                      isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.28em]"
                    }`}
                  >
                    {copy.qualityGate}
                  </p>
                  <h2
                    className={`font-medium text-white ${
                      isFarsi
                        ? "text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] tracking-normal"
                        : "text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
                    }`}
                  >
                    {copy.qualityTitle.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
                <a
                  href="#quote"
                  className="pointer-events-auto group flex items-stretch gap-1"
                >
                  <span
                    className={`bg-white px-8 py-5 text-[12px] font-bold text-black transition-colors group-hover:bg-gray-200 ${
                      isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[-0.01em]"
                    }`}
                  >
                    {copy.qualityButton}
                  </span>
                  <span className="flex items-center bg-white px-6 text-black transition-colors group-hover:bg-gray-200">
                    <ArrowRight size={20} className={isFarsi ? "rotate-180" : ""} />
                  </span>
                </a>
              </div>

              <div className="grid gap-[clamp(32px,3vw,48px)] pt-[clamp(48px,4vw,64px)] md:grid-cols-4">
                <div>
                  <LogoMark />
                  <p className="mt-6 max-w-[220px] text-[13px] leading-6 text-white/40">
                    {copy.footerIntro}
                  </p>
                </div>
                {copy.footerColumns.map((column) => (
                  <div key={column.title}>
                    <h3
                      className={`mb-5 text-[10px] uppercase text-white/30 ${
                        isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.1em]"
                      }`}
                    >
                      {column.title}
                    </h3>
                    <ul className="space-y-3 text-sm text-white/60">
                      {column.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div
                ref={(element) => {
                  qualityRefs.current[0] = element;
                }}
                className="mt-14 grid gap-3 md:grid-cols-3"
              >
                {copy.qualitySteps.map((step, index) => (
                  <div
                    key={step.label}
                    ref={(element) => {
                      qualityRefs.current[index + 1] = element;
                    }}
                    className="rounded-sm border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                        {isFarsi ? `۰${index + 1}` : `0${index + 1}`}
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
          className={`relative z-20 mx-auto flex w-[90%] flex-col justify-between gap-6 border-t border-white/10 py-8 text-white/44 sm:flex-row ${textAlign[language]}`}
        >
          <p
            className={`text-[11px] uppercase ${
              isFarsi ? "font-persian tracking-normal" : "font-mono tracking-[0.24em]"
            }`}
          >
            {copy.deliveryBrand}
          </p>
          <p id="quote" className="max-w-lg text-sm leading-6">
            {copy.deliveryText}
          </p>
        </div>
      </section>
    </div>
  );
}
