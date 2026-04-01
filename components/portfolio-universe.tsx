"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const skills = ["TypeScript", "Next.js", "React", "Three.js", "Node", "UI Motion", "AI Integrations", "Design Systems"];
const projects = [
  { title: "Nebula Commerce", desc: "Immersive e-commerce interface with adaptive intelligence." },
  { title: "Quantum Dash", desc: "Data platform with cinematic visual analytics." },
  { title: "OrbitOS", desc: "A modular productivity workspace with fluid interactions." }
];
const timeline = ["First lines of code", "Built first SaaS", "Shipped motion-first design system", "Exploring human + AI interfaces"];

export default function PortfolioUniverse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [idle, setIdle] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const idleTimer = useRef<NodeJS.Timeout>();
  const lastY = useRef(0);
  const lastT = useRef(0);
  const { scrollYProgress, scrollY } = useScroll();

  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;
  const dynamicLightX = useSpring(useTransform(mouseX, [0, 1], ["20%", "80%"]), { stiffness: 60, damping: 30 });
  const dynamicLightY = useSpring(useTransform(mouseY, [0, 1], ["15%", "70%"]), { stiffness: 60, damping: 30 });
  const dynamicLightBackground = useMotionTemplate`radial-gradient(circle at ${dynamicLightX} ${dynamicLightY}, rgba(130,145,255,0.25), transparent 45%)`;

  useEffect(() => {
    const unsub = scrollY.on("change", (current) => {
      const now = performance.now();
      const dt = Math.max(now - lastT.current, 1);
      const velocity = Math.abs((current - lastY.current) / dt);
      setScrollVelocity(Math.min(velocity * 120, 1));
      lastY.current = current;
      lastT.current = now;
    });
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      setIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdle(true), 1800);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [mouseX, mouseY]);

  const particles = useMemo(
    () => Array.from({ length: 55 }).map((_, i) => ({ id: i, left: (i * 37) % 100, delay: (i % 11) * 0.4, depth: (i % 4) + 1 })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      <motion.div className="fixed inset-0 -z-10" style={{ filter: blurFilter }}>
        <motion.div
          className="absolute inset-0"
          style={{ background: dynamicLightBackground }}
        />
        <motion.div
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl"
          animate={{ y: [-20, -80, -20], x: [0, 40, 0], scale: idle ? [1, 1.05, 1] : [1, 1.2, 1] }}
          transition={{ duration: idle ? 8 : 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-5rem] top-24 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-3xl"
          animate={{ y: [-30, -120, -30], x: [0, -50, 0] }}
          transition={{ duration: idle ? 9 : 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 space-grain bg-grain" />
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-white/70"
            style={{ left: `${p.left}%`, bottom: "-2%", opacity: 0.2 + p.depth * 0.15 }}
            animate={{ y: [0, -1600], x: [0, (p.depth - 2) * 24, 0] }}
            transition={{ duration: 9 + p.depth * 4 - scrollVelocity * 3, repeat: Infinity, delay: p.delay, ease: "linear" }}
          />
        ))}
      </motion.div>

      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="mb-5 text-sm uppercase tracking-[0.35em] text-white/60">
          Digital Universe // Developer Portfolio
        </motion.p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          {"Astra Novae".split("").map((letter, idx) => (
            <motion.span
              key={`${letter}-${idx}`}
              initial={{ opacity: 0, y: 42, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: idx * 0.04, type: "spring", stiffness: 180, damping: 18 }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          Building digital experiences beyond reality.
        </motion.p>
        <div className="mt-10 flex flex-wrap gap-4">
          {[
            ["Projects", "#projects"],
            ["Contact", "#contact"]
          ].map(([label, href], index) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 0 40px rgba(106,93,255,.35)" }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
              className="glass light-sweep rounded-full px-8 py-3 text-sm font-medium tracking-wide"
            >
              {label}
            </motion.a>
          ))}
        </div>
      </section>

      <ContentSection title="About" id="about" energetic={0.2}>
        <p className="text-white/80">
          I craft immersive interfaces at the edge of software, motion, and narrative. I build products that feel alive — where each
          interaction has intention, emotional weight, and technical precision.
        </p>
      </ContentSection>

      <ContentSection title="Skills" id="skills" energetic={0.4}>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="glass rounded-full px-4 py-2 text-sm"
              whileHover={{ scale: 1.08, y: -6, boxShadow: "0 0 25px rgba(84,173,255,.36)" }}
              animate={{ y: [0, -6 - (i % 3) * 3, 0] }}
              transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Projects" id="projects" energetic={0.8}>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, rotateX: -15, y: 35 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              whileHover={{ y: -8, rotateZ: i % 2 ? 1 : -1, boxShadow: "0 0 36px rgba(108,105,255,.3)" }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-white/70">{project.desc}</p>
            </motion.article>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Journey" id="journey" energetic={0.5}>
        <ol className="space-y-3 border-l border-white/20 pl-4">
          {timeline.map((item, i) => (
            <motion.li
              key={item}
              className="relative text-white/80"
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, type: "spring" }}
              viewport={{ once: true }}
            >
              <span className="absolute -left-[21px] top-2 h-2 w-2 rounded-full bg-blue-300 shadow-glow" />
              {item}
            </motion.li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection title="Contact" id="contact" energetic={0.1}>
        <form className="grid gap-3 md:grid-cols-2">
          <input className="glass rounded-xl px-4 py-3 outline-none transition hover:shadow-glow focus:shadow-glow" placeholder="Name" />
          <input className="glass rounded-xl px-4 py-3 outline-none transition hover:shadow-glow focus:shadow-glow" placeholder="Email" />
          <textarea
            className="glass rounded-xl px-4 py-3 outline-none transition hover:shadow-glow focus:shadow-glow md:col-span-2"
            placeholder="What are we building next?"
            rows={4}
          />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="glass rounded-xl px-5 py-3 md:col-span-2">
            Launch Transmission
          </motion.button>
        </form>
      </ContentSection>
    </main>
  );
}

function ContentSection({ title, id, children, energetic }: { title: string; id: string; children: React.ReactNode; energetic: number }) {
  return (
    <section id={id} className="mx-auto mb-10 w-full max-w-5xl px-6">
      <motion.div
        className="glass rounded-3xl p-7 md:p-10"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 + energetic * 90, damping: 16 }}
        viewport={{ margin: "-120px" }}
      >
        <h2 className="mb-4 text-3xl font-semibold tracking-tight">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}
