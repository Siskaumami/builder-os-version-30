import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Activity,
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Car,
  Compass,
  Cpu,
  Fuel,
  Gauge,
  Lock,
  MousePointer2,
  Network,
  RotateCcw,
  Sparkles,
  Terminal,
  Unlock,
  Wrench,
} from "lucide-react";

extend({ OrbitControls: ThreeOrbitControls });

const bootLines = [
  "Initializing Builder OS...",
  "Reading behavior patterns...",
  "Mapping business instincts...",
  "Scanning psychology layer...",
  "Detecting AI curiosity...",
  "Loading 360 dream garage...",
  "Generating birthday report...",
  "System ready: Version 30.",
];

const pillars = [
  {
    icon: Brain,
    title: "Mind",
    label: "Psychology & Human Behavior",
    text: "Cara berpikir yang tidak berhenti di permukaan. Ada kebiasaan membaca manusia, pola, keputusan, dan alasan di balik sebuah pilihan.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Market",
    label: "Business, Positioning, Value",
    text: "Tidak hanya berpikir soal jualan, tapi juga tentang persepsi nilai, diferensiasi, market psychology, dan bagaimana sesuatu bisa punya cerita.",
  },
  {
    icon: Cpu,
    title: "Machine",
    label: "AI, Programming, Systems",
    text: "Rasa penasaran pada teknologi, AI, dan sistem. Bukan sekadar ingin tahu, tapi ingin memahami cara sesuatu bekerja dari dalam.",
  },
  {
    icon: Gauge,
    title: "Drive",
    label: "Cars, Control, Direction",
    text: "Ketertarikan pada mobil terasa masuk akal: ada desain, kontrol, tenaga, presisi, dan karakter. Hal yang sama muncul dalam cara dia membangun sesuatu.",
  },
];

const patterns = [
  {
    title: "Builder Mindset",
    text: "Punya kecenderungan membangun sesuatu dari nol, bukan hanya mengikuti arus yang sudah ada.",
  },
  {
    title: "Strategic Thinking",
    text: "Melihat bisnis seperti permainan positioning, timing, persepsi, dan arah jangka panjang.",
  },
  {
    title: "Emotional Sensitivity",
    text: "Tidak hanya memikirkan angka, tapi juga rasa, cerita, nama, atmosfer, dan makna di balik sebuah brand.",
  },
  {
    title: "Business Psychology",
    text: "Tertarik pada alasan kenapa manusia percaya, memilih, membeli, dan terikat pada sesuatu.",
  },
  {
    title: "Future-Oriented",
    text: "Punya dorongan memahami apa yang sedang berubah: teknologi, AI, lifestyle, sistem ekonomi, dan arah industri.",
  },
  {
    title: "Overthinking Strategis",
    text: "Sering melihat game besar. Ini kekuatan, selama tetap ditemani eksekusi kecil yang konsisten.",
  },
];

const buildMap = [
  {
    title: "Furniture",
    text: "Bukan hanya produk, tapi objek yang punya fungsi, atmosfer, identitas, dan nilai emosional.",
  },
  {
    title: "iPhone Second",
    text: "Bisnis yang bergantung pada trust, positioning, persepsi kualitas, dan cara membangun rasa aman pada pembeli.",
  },
  {
    title: "Coffee / Cawine",
    text: "Tempat produk, cerita, lifestyle, dan karakter brand bisa bertemu dalam satu pengalaman.",
  },
 {
  title: "AI & Programming",
  text: "Ketertarikannya pada AI dan programming menunjukkan rasa ingin tahu terhadap sistem, teknologi, dan cara kerja masa depan.",
},
  {
    title: "Agency",
    text: "Versi terbaru dari banyak pola yang mulai menyatu: strategi, kreativitas, bisnis, AI, sistem, dan eksekusi.",
  },
];

const systemPrompts = [
  {
    q: "What is his strongest pattern?",
    a: "He builds meaning around things. For him, business is not only transaction. It is identity, perception, and story.",
  },
  {
    q: "What does he talk about most?",
    a: "Business, psychology, positioning, value, branding, and the invisible reasons why people choose something.",
  },
  {
    q: "What makes him different?",
    a: "He combines strategy with emotional sensitivity. He can think about market share, but still care about the feeling behind a name, a product, or a story.",
  },
  {
    q: "Why does he like cars?",
    a: "Because cars are not only machines. They are systems with character: design, speed, control, precision, and identity.",
  },
  {
    q: "What does he need this year?",
    a: "Better traction. Clearer direction. Stronger engine. Less unnecessary noise.",
  },
  {
    q: "What is his current mode?",
    a: "Still building. Still learning. Still tuning the engine.",
  },
];

const driveCards = [
  {
    icon: Activity,
    title: "Engine",
    text: "Pikiran yang terus bekerja, menganalisis, dan mencari cara lebih baik.",
  },
  {
    icon: Compass,
    title: "Steering",
    text: "Kemampuan membaca arah, positioning, dan keputusan strategis.",
  },
  {
    icon: Fuel,
    title: "Fuel",
    text: "Rasa penasaran pada bisnis, AI, psikologi, programming, mobil, dan masa depan.",
  },
  {
    icon: Wrench,
    title: "Tuning",
    text: "Proses memperbaiki diri, sistem, bisnis, dan cara eksekusi dari waktu ke waktu.",
  },
];

const asset = (path) => import.meta.env.BASE_URL + path;

const dreamCars = [
  {
    id: "gwagen",
    name: "Mercedes-Benz G-Class",
    tone: "Black G-Wagon Â· studio set",
    thumb: asset("turntable/gwagen/frame01.png"),
    frames: [
      asset("turntable/gwagen/frame01.png"),
      asset("turntable/gwagen/frame02.png"),
      asset("turntable/gwagen/frame03.png"),
      asset("turntable/gwagen/frame04.png"),
      asset("turntable/gwagen/frame05.png"),
      asset("turntable/gwagen/frame06.png"),
      asset("turntable/gwagen/frame07.png"),
      asset("turntable/gwagen/frame08.png"),
    ],
    text: "Tegas, kuat, dan punya presence. G-Class terasa seperti simbol kontrol, proteksi, dan standar hidup yang ingin dicapai.",
    spec: ["Presence", "Control", "Power"],
  },
  {
    id: "bmw",
    name: "BMW Executive Sedan",
    tone: "Silver luxury sedan Â· studio set",
    thumb: asset("turntable/bmw/frame01.png"),
    frames: [
      asset("turntable/bmw/frame01.png"),
      asset("turntable/bmw/frame02.png"),
      asset("turntable/bmw/frame03.png"),
      asset("turntable/bmw/frame04.png"),
      asset("turntable/bmw/frame05.png"),
      asset("turntable/bmw/frame06.png"),
      asset("turntable/bmw/frame07.png"),
      asset("turntable/bmw/frame08.png"),
    ],
    text: "Rapi, dewasa, dan strategis. Cocok untuk sisi dia yang suka bisnis, positioning, dan kesan profesional yang tidak perlu terlalu banyak bicara.",
    spec: ["Precision", "Business", "Elegance"],
  },
  {
    id: "honda",
    name: "Honda Civic RS",
    tone: "White sedan Â· studio set",
    thumb: asset("turntable/honda/frame01.png"),
    frames: [
      asset("turntable/honda/frame01.png"),
      asset("turntable/honda/frame02.png"),
      asset("turntable/honda/frame03.png"),
      asset("turntable/honda/frame04.png"),
      asset("turntable/honda/frame05.png"),
    ],
    text: "Clean, modern, dan lebih sporty. Mewakili sisi yang suka desain bersih, karakter tegas, dan rasa yang tetap premium tanpa berlebihan.",
    spec: ["Clean", "Modern", "Sharp"],
  },
  {
    id: "porsche",
    name: "Porsche 911 Turbo S",
    tone: "Silver sports coupe Â· studio set",
    thumb: asset("turntable/porsche/frame01.png"),
    frames: [
      asset("turntable/porsche/frame01.png"),
      asset("turntable/porsche/frame02.png"),
      asset("turntable/porsche/frame03.png"),
      asset("turntable/porsche/frame04.png"),
      asset("turntable/porsche/frame05.png"),
    ],
    text: "Low profile, cepat, dan ikonik. Bukan sekadar cepat, tapi tentang engineering, disiplin, dan karakter yang bertahan lama.",
    spec: ["Timeless", "Speed", "Discipline"],
  },
  {
    id: "minivan",
    name: "Toyota Minivan Custom",
    tone: "Black MPV Â· studio set",
    thumb: asset("turntable/minivan/frame01.png"),
    frames: [
      asset("turntable/minivan/frame01.png"),
      asset("turntable/minivan/frame02.png"),
      asset("turntable/minivan/frame03.png"),
      asset("turntable/minivan/frame04.png"),
      asset("turntable/minivan/frame05.png"),
    ],
    text: "Praktis, kuat, dan realistis. Full black membuatnya tetap clean dan berkarakter, tapi masih masuk akal untuk hidup nyata dan mobilitas sehari-hari.",
    spec: ["Realistic", "Reliable", "Daily"],
  },
];

function SectionBadge({ children }) {
  return (
    <div className="section-badge">
      <Sparkles size={14} />
      {children}
    </div>
  );
}

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (code.trim() === "30") {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <main className="page center-page">
      <Background />
      <motion.section className="gate-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="gate-head">
          <div className="gate-brand">
            <span className="icon-box"><Lock size={20} /></span>
            <div>
              <p>Private Access</p>
              <h1>Builder OS</h1>
            </div>
          </div>
          <span className="version-pill">v30</span>
        </div>

        <p className="eyebrow">Birthday Report</p>
        <h2>Enter access code.</h2>
        <p className="muted wide">A small system built to read the mind, market instinct, machine curiosity, and drive behind one person.</p>

        <form onSubmit={submit} className="gate-form">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access code" aria-label="Access code" />
          <button type="submit"><Unlock size={16} /> Unlock</button>
        </form>
        <div className="hint-line">
          <span>Hint: tanggalnya.</span>
          <span className={error ? "error" : ""}>{error ? "Wrong code. Try again." : "Protected page"}</span>
        </div>
      </motion.section>
    </main>
  );
}

function BootScreen({ onDone }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= bootLines.length) {
      const doneTimer = setTimeout(onDone, 700);
      return () => clearTimeout(doneTimer);
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), 420);
    return () => clearTimeout(timer);
  }, [index, onDone]);

  const progress = Math.min(100, Math.round((index / bootLines.length) * 100));

  return (
    <main className="page center-page">
      <Background />
      <motion.section className="terminal-card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="terminal-head">
          <Terminal size={20} />
          <span>builder-os.boot</span>
          <strong>{progress}%</strong>
        </div>
        <div className="terminal-body">
          {bootLines.slice(0, index).map((line, i) => (
            <motion.div key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="terminal-line">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{line}</p>
            </motion.div>
          ))}
        </div>
        <div className="progress-track"><motion.div animate={{ width: `${progress}%` }} /></div>
      </motion.section>
    </main>
  );
}

function Background() {
  return (
    <div className="background" aria-hidden="true">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="grid-layer" />
    </div>
  );
}

function Hero() {
  return (
    <section className="section hero">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hero-content">
        <SectionBadge>Birthday Intelligence Report</SectionBadge>
        <h1>Builder OS<span>.</span></h1>
        <div className="hero-pills">
          <span>Version 30</span>
          <span>Mind / Market / Machine / Drive</span>
          <span>360 Garage Ready</span>
        </div>
        <p>Sebuah website kecil untuk seseorang yang tidak hanya suka membangun bisnis, tapi juga mencoba memahami manusia, nilai, sistem, teknologi, mobil, dan arah hidupnya sendiri.</p>
      </motion.div>

      <motion.div className="pillar-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <article className="mini-card" key={item.title}>
              <Icon size={20} />
              <h3>{item.title}</h3>
              <p>{item.label}</p>
            </article>
          );
        })}
      </motion.div>
    </section>
  );
}

function PillarSection() {
  return (
    <section className="section two-col top-align">
      <div className="sticky-copy">
        <SectionBadge>Core System</SectionBadge>
        <h2>Four worlds in one person.</h2>
        <p>Kalau diringkas, dia bukan cuma satu karakter. Ada sisi manusia, bisnis, teknologi, dan drive yang terus bergerak.</p>
      </div>
      <div className="card-grid two">
        {pillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article className="feature-card" key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <div className="card-head"><span className="icon-box"><Icon size={22} /></span><b>0{index + 1}</b></div>
              <h3>{item.title}</h3>
              <small>{item.label}</small>
              <p>{item.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ProfileSection() {
  return (
    <section className="section">
      <div className="large-panel two-col compact">
        <div>
          <SectionBadge>Person Behind The Account</SectionBadge>
          <h2>Young, but not simple.</h2>
        </div>
        <div className="text-stack">
          <p>Orang di balik ini masih muda, tapi cara berpikirnya tidak sederhana. Pola pikirnya banyak dibentuk oleh pengalaman bisnis nyata, bukan cuma teori atau gaya berpikir mahasiswa biasa.</p>
          <p>Ada kombinasi antara kreativitas, strategi, kedalaman emosional, dan dorongan kuat untuk membangun sesuatu yang punya identitas. Bukan hanya mengejar transaksi, tapi ingin membuat sesuatu yang punya rasa, cerita, dan value.</p>
          <p>Yang paling kuat: dia seperti sedang membangun identitas sebagai creative businessman â€” gabungan antara pengusaha, strategist, observer manusia, dan builder yang ingin meninggalkan karakter dalam apa yang dia bangun.</p>
        </div>
      </div>
    </section>
  );
}

function PatternSection() {
  return (
    <section className="section">
      <div className="section-title">
        <SectionBadge>Pattern Detected</SectionBadge>
        <h2>Core patterns that keep appearing.</h2>
      </div>
      <div className="card-grid three">
        {patterns.map((item, index) => (
          <motion.article className="pattern-card" key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
            <small>#{String(index + 1).padStart(2, "0")}</small>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function DriveSection() {
  return (
    <section className="section">
      <div className="large-panel drive-panel">
        <div className="two-col compact">
          <div>
            <SectionBadge>The Drive</SectionBadge>
            <h2>Cars are not random here.</h2>
            <p>Mobil bukan cuma soal kecepatan. Di dalamnya ada kontrol, desain, karakter, mesin, presisi, dan rasa bergerak maju. Mungkin itu kenapa ketertarikannya pada mobil terasa nyambung dengan cara dia berpikir.</p>
            <p>Dia seperti suka hal-hal yang bukan cuma menarik dari luar, tapi juga punya sistem yang bekerja di dalamnya. Hal yang sama muncul saat dia melihat bisnis, manusia, brand, teknologi, dan ide.</p>
          </div>
          <div className="orbit-art">
            <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
            <span className="car-core"><Car size={52} /></span>
          </div>
        </div>
        <div className="card-grid four drive-cards">
          {driveCards.map((item) => {
            const Icon = item.icon;
            return <article key={item.title}><Icon size={20} /><h3>{item.title}</h3><p>{item.text}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) this.setState({ hasError: false });
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GLBCar({ car }) {
  const gltf = useLoader(GLTFLoader, car.model);
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    cloned.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.filter(Boolean).forEach((material) => {
        if (typeof material.metalness === "number") material.metalness = material.metalness || car.metalness;
        if (typeof material.roughness === "number") material.roughness = material.roughness || car.roughness;
        material.needsUpdate = true;
      });
    });
  }, [cloned, car]);

  return <primitive object={cloned} scale={car.scale} position={car.position} rotation={car.rotation} />;
}

function FallbackCar3D({ car }) {
  const dimensions = {
    suv: { body: [3.05, 0.86, 1.34], cabin: [1.55, 0.82, 1.1], cabinY: 0.78, cabinX: -0.1, front: 1.24 },
    sedan: { body: [3.28, 0.56, 1.08], cabin: [1.25, 0.58, 0.9], cabinY: 0.64, cabinX: -0.15, front: 1.34 },
    coupe: { body: [3.05, 0.5, 1.02], cabin: [1.05, 0.5, 0.8], cabinY: 0.58, cabinX: -0.2, front: 1.3 },
    mpv: { body: [3.32, 0.86, 1.22], cabin: [1.82, 0.78, 1.04], cabinY: 0.8, cabinX: -0.2, front: 1.3 },
  }[car.fallback];

  const wheelPositions = [
    [-1.1, -0.28, -0.68],
    [1.1, -0.28, -0.68],
    [-1.1, -0.28, 0.68],
    [1.1, -0.28, 0.68],
  ];

  return (
    <group position={[0, -0.35, 0]} rotation={[0, -0.45, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={dimensions.body} />
        <meshStandardMaterial color={car.paint} metalness={car.metalness} roughness={car.roughness} />
      </mesh>
      <mesh castShadow receiveShadow position={[dimensions.cabinX, dimensions.cabinY, 0]}>
        <boxGeometry args={dimensions.cabin} />
        <meshStandardMaterial color="#141b24" metalness={0.5} roughness={0.18} transparent opacity={0.92} />
      </mesh>
      <mesh castShadow receiveShadow position={[dimensions.front, 0.36, 0]}>
        <boxGeometry args={[0.28, 0.26, dimensions.body[2] * 0.93]} />
        <meshStandardMaterial color={car.paint} metalness={car.metalness} roughness={car.roughness} />
      </mesh>
      {wheelPositions.map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.31, 0.31, 0.2, 48]} />
            <meshStandardMaterial color="#040404" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.105, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.025, 48]} />
            <meshStandardMaterial color="#9da5ae" metalness={0.75} roughness={0.18} />
          </mesh>
        </group>
      ))}
      <mesh position={[1.67, 0.26, -0.38]}>
        <boxGeometry args={[0.04, 0.09, 0.3]} />
        <meshStandardMaterial color="#dff9ff" emissive="#67e8f9" emissiveIntensity={0.65} />
      </mesh>
      <mesh position={[1.67, 0.26, 0.38]}>
        <boxGeometry args={[0.04, 0.09, 0.3]} />
        <meshStandardMaterial color="#dff9ff" emissive="#67e8f9" emissiveIntensity={0.65} />
      </mesh>
    </group>
  );
}

function Controls({ autoRotate }) {
  const { camera, gl } = useThree();
  const controls = useRef(null);

  useEffect(() => {
    controls.current = new ThreeOrbitControls(camera, gl.domElement);
    controls.current.enablePan = false;
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.08;
    controls.current.enableZoom = true;
    controls.current.minDistance = 3.2;
    controls.current.maxDistance = 7.6;
    controls.current.minPolarAngle = Math.PI / 3.4;
    controls.current.maxPolarAngle = Math.PI / 2.02;

    return () => controls.current?.dispose();
  }, [camera, gl]);

  useEffect(() => {
    if (!controls.current) return;
    controls.current.autoRotate = autoRotate;
    controls.current.autoRotateSpeed = 1.2;
  }, [autoRotate]);

  useFrame(() => controls.current?.update());
  return null;
}

function LoadingLabel() {
  return (
    <mesh position={[0, 0.25, 0]}>
      <boxGeometry args={[1.5, 0.05, 0.05]} />
      <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.4} />
    </mesh>
  );
}

function StudioFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <circleGeometry args={[4.8, 96]} />
        <meshStandardMaterial color="#061316" metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.895, 0]}>
        <ringGeometry args={[2.4, 2.43, 128]} />
        <meshStandardMaterial color="#67e8f9" transparent opacity={0.23} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.892, 0]}>
        <ringGeometry args={[3.2, 3.23, 128]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

function TurntableViewer({ car, activeFrameIndex, setActiveFrameIndex, autoSpin, onToggleAutoSpin }) {
  const viewerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dragStartXRef = useRef(0);
  const stepThreshold = 18;

  const preloadFrames = React.useCallback((targetCar) => {
    targetCar.frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    dreamCars.forEach(preloadFrames);
  }, [preloadFrames]);

  useEffect(() => {
    setActiveFrameIndex((value) => (value >= car.frames.length ? 0 : value));
  }, [car, setActiveFrameIndex]);

  useEffect(() => {
    if (!autoSpin) return undefined;
    const interval = window.setInterval(() => {
      setActiveFrameIndex((current) => (current + 1) % car.frames.length);
    }, 500);
    return () => window.clearInterval(interval);
  }, [autoSpin, car.frames.length, setActiveFrameIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (event.key === "ArrowRight") setActiveFrameIndex((current) => (current + 1) % car.frames.length);
      if (event.key === "ArrowLeft") setActiveFrameIndex((current) => (current - 1 + car.frames.length) % car.frames.length);
      if (event.key.toLowerCase() === "r") setActiveFrameIndex(0);
      if (event.key === " ") {
        event.preventDefault();
        onToggleAutoSpin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [car.frames.length, onToggleAutoSpin, setActiveFrameIndex]);

  const stepFrame = (step) => {
    setActiveFrameIndex((current) => (current + step + car.frames.length) % car.frames.length);
  };

  const onPointerDown = (event) => {
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    viewerRef.current?.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isDragging) return;
    const diff = event.clientX - dragStartXRef.current;
    if (Math.abs(diff) >= stepThreshold) {
      setIsLoading(true);
      stepFrame(diff > 0 ? -1 : 1);
      dragStartXRef.current = event.clientX;
    }
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div className="turntable-shell">
      <div
        ref={viewerRef}
        className={`viewer-card turntable-viewer ${isDragging ? "grabbing" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <img
          key={car.frames[activeFrameIndex]}
          src={car.frames[activeFrameIndex]}
          alt={`${car.name} frame ${activeFrameIndex + 1}`}
          className="turntable-image"
          draggable="false"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        <div className={`turntable-loading ${isLoading ? "visible" : ""}`}>Loading frame...</div>
        <div className="viewer-hint"><MousePointer2 size={15} /> Drag / swipe kiri-kanan untuk memutar</div>
      </div>

      <div className="turntable-controls">
        <div className="slider-wrap">
          <label htmlFor={`frame-slider-${car.id}`}>Frame</label>
          <input
            id={`frame-slider-${car.id}`}
            type="range"
            min="0"
            max={Math.max(car.frames.length - 1, 0)}
            step="1"
            value={activeFrameIndex}
            onChange={(event) => {
              setIsLoading(true);
              setActiveFrameIndex(Number(event.target.value));
            }}
          />
        </div>
        <div className="status-wrap">
          <div className="status-chip"><span>Frame:</span> <strong>{activeFrameIndex + 1} / {car.frames.length}</strong></div>
          <div className="status-chip"><span>Total Mobil:</span> <strong>{dreamCars.length}</strong></div>
        </div>
      </div>
    </div>
  );
}

function DreamGarageSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [autoSpin, setAutoSpin] = useState(false);
  const selected = dreamCars[selectedIndex];

  useEffect(() => {
    setActiveFrameIndex(0);
  }, [selectedIndex]);

  const switchCar = (index) => {
    setSelectedIndex(((index % dreamCars.length) + dreamCars.length) % dreamCars.length);
  };

  const toggleAutoSpin = React.useCallback(() => {
    setAutoSpin((value) => !value);
  }, []);

  return (
    <section className="section">
      <div className="section-title split-title">
        <div>
          <SectionBadge>Dream Garage 360</SectionBadge>
          <h2>The cars in his future garage.</h2>
        </div>
        <p>Bagian ini sekarang memakai viewer 360 foto asli yang kamu buat. Pilih mobil, drag kiri-kanan pada gambar untuk memutar frame, atau pakai slider dan auto spin.</p>
      </div>

      <div className="garage-panel garage-panel-turntable">
        <div className="garage-main">
          <div className="garage-nav-top">
            <button type="button" className="nav-pill" onClick={() => switchCar(selectedIndex - 1)}>â—€ Mobil Sebelumnya</button>
            <button type="button" className="nav-pill" onClick={() => switchCar(selectedIndex + 1)}>Mobil Berikutnya â–¶</button>
          </div>

          <div className="garage-top">
            <div>
              <p className="eyebrow">Selected unit</p>
              <AnimatePresence mode="wait">
                <motion.div key={selected.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3>{selected.name}</h3>
                  <span>{selected.tone}</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="garage-actions">
              <button onClick={toggleAutoSpin} className={autoSpin ? "active" : ""}><RotateCcw size={15} /> {autoSpin ? "Stop Spin" : "Auto Spin"}</button>
              <button onClick={() => setActiveFrameIndex(0)}><RotateCcw size={15} /> Reset Frame</button>
              <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(dreamCars.length).padStart(2, "0")}</span>
            </div>
          </div>

          <TurntableViewer
            car={selected}
            activeFrameIndex={activeFrameIndex}
            setActiveFrameIndex={setActiveFrameIndex}
            autoSpin={autoSpin}
            onToggleAutoSpin={toggleAutoSpin}
          />

          <div className="garage-copy">
            <p>{selected.text}</p>
            <div>{selected.spec.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>

        <aside className="garage-list">
          {dreamCars.map((car, index) => (
            <button key={car.id} onClick={() => switchCar(index)} className={selectedIndex === index ? "selected" : ""}>
              <span className="car-icon image-thumb"><img src={car.thumb} alt={car.name} /></span>
              <span>
                <small>Unit {String(index + 1).padStart(2, "0")}</small>
                <b>{car.name}</b>
                <em>{car.tone}<br />{car.frames.length} frame</em>
              </span>
            </button>
          ))}
          <div className="asset-note">
            <small>Asset note</small>
            <p>Viewer ini sekarang memakai image sequence 360 dari file ZIP yang kamu kirim. Jadi yang berputar memang foto mobil aslinya, bukan viewer 3D fallback.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function TopicsSection() {
  const topics = ["Business", "Psychology", "Positioning", "Brand Identity", "Storytelling", "Market Perception", "Value Creation", "AI", "Programming", "Cars", "Design", "Systems"];
  return (
    <section className="section two-col compact">
      <div>
        <SectionBadge>Recurring Topics</SectionBadge>
        <h2>The things he keeps circling back to.</h2>
        <p>Polanya jelas: dia tidak hanya tertarik pada cara menjual sesuatu. Dia tertarik pada bagaimana sebuah ide menjadi bernilai, bagaimana manusia membentuk persepsi, dan bagaimana sesuatu bisa punya identitas.</p>
      </div>
      <div className="topic-panel">
        <Network className="network-icon" size={24} />
        {topics.map((topic, index) => (
          <motion.span key={topic} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>{topic}</motion.span>
        ))}
      </div>
    </section>
  );
}

function BuildMapSection() {
  return (
    <section className="section">
      <div className="section-title">
        <SectionBadge>Things He Builds</SectionBadge>
        <h2>Not random projects. A pattern.</h2>
      </div>
      <div className="timeline">
        {buildMap.map((item, index) => (
          <motion.article key={item.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <span>{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function AskSystemSection() {
  const [selected, setSelected] = useState(systemPrompts[0]);
  const [answerKey, setAnswerKey] = useState(0);

  function choose(prompt) {
    setSelected(prompt);
    setAnswerKey((k) => k + 1);
  }

  return (
    <section className="section two-col top-align">
      <div>
        <SectionBadge>Ask The System</SectionBadge>
        <h2>A small AI-style reading.</h2>
        <p>Pilih prompt. Sistem ini tidak benar-benar pintar, tapi dibuat dari hal-hal yang terlihat berulang dari dirinya.</p>
        <div className="prompt-list">
          {systemPrompts.map((prompt) => (
            <button key={prompt.q} onClick={() => choose(prompt)} className={selected.q === prompt.q ? "active" : ""}>
              {prompt.q}<ArrowRight size={16} />
            </button>
          ))}
        </div>
      </div>
      <div className="response-card">
        <div className="response-head"><Terminal size={16} /> system.response</div>
        <div className="prompt-box"><small>Prompt</small><p>{selected.q}</p></div>
        <AnimatePresence mode="wait">
          <motion.div className="answer-box" key={answerKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <small>Output</small><p>{selected.a}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MessageSection() {
  return (
    <section className="section">
      <div className="large-panel two-col compact">
        <div>
          <SectionBadge>Birthday Message</SectionBadge>
          <h2>For your next version.</h2>
        </div>
        <div className="text-stack message-text">
         <p>Selamat ulang tahun.</p>

<p>
  Aku bikin ini karena menurutku cara berpikirmu layak dilihat dengan lebih utuh.
  Bukan hanya sebagai orang yang cerdas, tapi sebagai seseorang pria yang terus belajar,
  memahami banyak hal, dan berusaha membangun sesuatu dengan caramu sendiri.
</p>
<p>
  Aku tahu kamu banyak berpikir. Kadang mungkin terlalu banyak. Tapi aku juga tahu,
  cara kamu berpikir adalah salah satu hal yang membuat kamu terus berkembang dan
  melihat sesuatu lebih dalam dari kebanyakan orang.
</p>
<p>
  Semoga umur baru ini membawa lebih banyak kejelasan, ketenangan, kesempatan yang
  baik, dan arah yang makin stabil. Semoga hal-hal yang sedang kamu bangun pelan-pelan
  jadi lebih nyata, lebih rapi, dan lebih dekat dengan diri yang ingin kamu bentuk.
</p>
<p>
  Aku selalu bangga sama kamu, bukan hanya karena apa yang sudah kamu lakukan, tapi juga
  karena cara kamu terus bertumbuh.
</p>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="section closing">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="eyebrow">System closing note</p>
        <h2>Keep building.<br />Keep driving.</h2>
        <p>Better systems. Clearer direction. Stronger drive. Less unnecessary noise.</p>
        <span><Gauge size={17} /> Happy Birthday Â· Version 30</span>
      </motion.div>
    </section>
  );
}

function Website() {
  return (
    <main className="page">
      <Background />
      <Hero />
      <PillarSection />
      <ProfileSection />
      <PatternSection />
      <DriveSection />
      <DreamGarageSection />
      <TopicsSection />
      <BuildMapSection />
      <AskSystemSection />
      <MessageSection />
      <ClosingSection />
    </main>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [booted, setBooted] = useState(false);

  const screen = useMemo(() => {
    if (!unlocked) return "gate";
    if (!booted) return "boot";
    return "site";
  }, [unlocked, booted]);

  return (
    <AnimatePresence mode="wait">
      {screen === "gate" && <motion.div key="gate" exit={{ opacity: 0 }}><AccessGate onUnlock={() => setUnlocked(true)} /></motion.div>}
      {screen === "boot" && <motion.div key="boot" exit={{ opacity: 0 }}><BootScreen onDone={() => setBooted(true)} /></motion.div>}
      {screen === "site" && <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Website /></motion.div>}
    </AnimatePresence>
  );
}

