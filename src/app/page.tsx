'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import {
  Mail,
  Code2,
  Rocket,
  Terminal,
  Cpu,
  Award,
  ChevronDown,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Check,
  Copy,
  X,
  Shield,
  Layers,
  Zap,
  Database,
  Globe,
  GitBranch,
  Play,
  Activity,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// TYPES & DATA DEFINITIONS
// -----------------------------------------------------------------------------

interface TimelineMilestone {
  year: string;
  phase: string;
  title: string;
  subtitle: string;
  summary: string;
  metrics: string;
  highlights: string[];
  stack: string[];
  deliverable: string;
}

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: 'AI & Multi-Agent' | 'Security & DevSecOps' | 'Distributed Cloud';
  tagline: string;
  description: string;
  impactMetric: string;
  latencyMetric: string;
  reliabilityMetric: string;
  stack: string[];
  architectureNodes: {
    stage: string;
    component: string;
    detail: string;
  }[];
  simulationLog: string[];
}

interface PlatformMetric {
  id: string;
  platform: string;
  value: string;
  unit: string;
  rankOrTier: string;
  summary: string;
  breakdown: { label: string; metric: string; percentage: number }[];
  featuredAchievement: string;
  iconName: 'code' | 'terminal' | 'rocket' | 'award';
}

interface SkillNode {
  name: string;
  category: 'AI & LLM Systems' | 'Full-Stack & WebGL' | 'Systems & DSA' | 'Cloud & DevSecOps';
  proficiency: number;
  experienceLevel: string;
  relatedProjects: string[];
  coreCapability: string;
}

const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: '2025',
    phase: 'Phase 01 · Core Genesis',
    title: 'Foundation, DSA & Systems Software',
    subtitle: 'Algorithmic Rigor & Low-Level Execution',
    summary:
      'Established deep computer science fundamentals through intensive competitive programming, memory-safe systems architecture, and deterministic data structure design.',
    metrics: '500+ Initial Algorithmic Solutions · O(log N) Optimization Focus',
    highlights: [
      'Mastered advanced graph theory, dynamic programming, segment trees, and bit-manipulation paradigms across competitive programming arenas.',
      'Engineered custom POSIX thread schedulers, memory allocators, and socket-level TCP/IP packet inspectors in C++ and Rust.',
      'Built foundational compiler lexers and abstract syntax tree evaluators for domain-specific query parsing.',
    ],
    stack: ['C++20', 'Rust', 'Linux Kernel Primitives', 'Data Structures', 'Graph Algorithms', 'POSIX Threads'],
    deliverable: 'Custom High-Concurrency Memory Pool & Lock-Free Ring Buffer Engine',
  },
  {
    year: '2026',
    phase: 'Phase 02 · Autonomous Intelligence',
    title: 'AI Multi-Agents, Hackathons (SENTINEL, Revenue Digital Twin) & Full-Stack',
    subtitle: 'Rapid Production Prototyping & Agentic Orchestration',
    summary:
      'Transitioned algorithmic speed into full-stack AI engineering—architecting autonomous multi-agent swarms and shipping high-impact systems across national hackathons.',
    metrics: 'SENTINEL & Revenue Digital Twin Flagships · 100+ Hackathon Sprints',
    highlights: [
      'Architected SENTINEL: an autonomous cybersecurity & anomaly detection response swarm capable of real-time threat containment.',
      'Built Revenue Digital Twin: a predictive enterprise simulation core modeling cash-flow elasticity, churn dynamics, and multi-agent scenario planning.',
      'Delivered reactive full-stack interfaces with Next.js App Router, TypeScript, WebSockets, and hardware-accelerated WebGL telemetry viewports.',
    ],
    stack: ['Next.js', 'TypeScript', 'LangGraph', 'Multi-Agent Systems', 'FastAPI', 'WebGL / Canvas'],
    deliverable: 'SENTINEL Threat Defense Mesh & Revenue Digital Twin Simulation Core',
  },
  {
    year: '2027',
    phase: 'Phase 03 · Scale & Topology',
    title: 'Distributed Cloud Systems & Advanced LLM Architectures',
    subtitle: 'High-Throughput Inference & Hybrid Vector Pipelines',
    summary:
      'Scaling AI applications into fault-tolerant distributed cloud topologies with sub-50ms hybrid retrieval, semantic caching, and distributed event streaming.',
    metrics: '99.95% Uptime Architecture · Sub-45ms Vector Retrieval Latency',
    highlights: [
      'Designed hybrid GraphRAG and dense HNSW vector indexing pipelines for multi-million document enterprise knowledge bases.',
      'Implemented event-driven microservice meshes utilizing Kafka, gRPC, and distributed Redis state synchronization.',
      'Optimized quantized LLM inference routing with speculative decoding and dynamic KV-cache partitioning.',
    ],
    stack: ['Kubernetes', 'gRPC', 'Apache Kafka', 'Hybrid GraphRAG', 'PyTorch', 'Distributed Redis'],
    deliverable: 'Distributed Multi-Tenant LLM Inference Router & Semantic Cache Layer',
  },
  {
    year: '2028',
    phase: 'Phase 04 · Ecosystem Leadership',
    title: 'Open Source & Enterprise Systems',
    subtitle: 'Zero-Trust DevSecOps & Autonomous Developer Tooling',
    summary:
      'Leading open-source developer infrastructure initiatives and architecting zero-trust security guardrails for large-scale enterprise engineering organizations.',
    metrics: 'Zero-Trust CI/CD Guardrails · Automated AST Vulnerability Remediation',
    highlights: [
      'Spearheaded GitShield and BuildTrack open-source modules for real-time secret entropy analysis and deterministic build observability.',
      'Engineered automated pull-request static analysis agents that synthesize verified security patches before merge.',
      'Published technical blueprints on deterministic multi-agent state machines and resilient cloud-native observability.',
    ],
    stack: ['Rust CLI', 'eBPF', 'OpenTelemetry', 'Zero-Trust Security', 'AST Static Analysis', 'Docker'],
    deliverable: 'GitShield Enterprise Policy Engine & BuildTrack Telemetry Collector',
  },
  {
    year: '2029',
    phase: 'Phase 05 · Apex Convergence',
    title: 'Graduation & Full-Stack AI Engineer',
    subtitle: 'Production AI Systems Architect at Global Scale',
    summary:
      'Culmination of B.E. in Computer Science & Engineering with a battle-tested portfolio of autonomous enterprise platforms, competitive programming mastery, and full-stack craftsmanship.',
    metrics: '710+ CodeChef · 100+ LeetCode · 100+ Hackathons · 75+ Certifications',
    highlights: [
      'Synthesizing four years of rigorous systems engineering, competitive algorithms, and production AI research into enterprise-ready leadership.',
      'Architecting end-to-end autonomous products that bridge deep backend distributed systems with tactile 60fps spatial user interfaces.',
      'Ready to lead mission-critical AI platform engineering, foundational model tooling, and high-velocity product teams.',
    ],
    stack: ['Full-Stack AI Architecture', 'Distributed Systems', 'Next.js & WebGL', 'Autonomous Agents', 'Cloud Native'],
    deliverable: 'B.E. Computer Science & Engineering Honors · Production Systems Portfolio',
  },
];

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'revenue-digital-twin',
    index: '01',
    title: 'Revenue Digital Twin',
    category: 'AI & Multi-Agent',
    tagline: 'Autonomous Enterprise Revenue Simulation & Scenario Forecasting Engine',
    description:
      'A high-dimensional digital twin of enterprise revenue operations. Uses coordinated multi-agent reasoning and Monte Carlo stochastic modeling to simulate pricing shifts, pipeline churn risks, and expansion velocity in real time.',
    impactMetric: '+34% Forecast Precision',
    latencyMetric: '38ms Scenario Compute',
    reliabilityMetric: '10,000+ Parallel Monte Carlo Runs',
    stack: ['Next.js', 'TypeScript', 'Multi-Agent LLM', 'Python FastAPI', 'PostgreSQL', 'WebGL Canvas'],
    architectureNodes: [
      {
        stage: '01. Ingestion Layer',
        component: 'Real-Time CRM & Billing Event Stream',
        detail: 'Normalizes transactional webhooks, contract cohorts, and usage telemetry into time-series state vectors.',
      },
      {
        stage: '02. Simulation Core',
        component: 'Multi-Agent Stochastic Twin Engine',
        detail: 'Deploys specialized Market, Churn, and Expansion agents that negotiate counterfactual revenue trajectories.',
      },
      {
        stage: '03. Decision Surface',
        component: 'Interactive 3D Elasticity Matrix',
        detail: 'Renders live sensitivity curves and automated executive intervention playbooks at 60fps.',
      },
    ],
    simulationLog: [
      '[T+00ms] Initializing Digital Twin state vector across 14 enterprise cohorts...',
      '[T+12ms] Spawning 3 specialized agents: ChurnPredictor, PricingOptimizer, PipelineAuditor.',
      '[T+27ms] Executing 10,000 Monte Carlo counterfactual trajectories...',
      '[T+38ms] Convergence reached: Net Dollar Retention projected at 118.4% (+6.2% delta).',
    ],
  },
  {
    id: 'smart-hr-orchestrator',
    index: '02',
    title: 'Smart HR Orchestrator',
    category: 'AI & Multi-Agent',
    tagline: 'Multi-Agent Talent Intelligence & Autonomous Workflow Mesh',
    description:
      'End-to-end talent operations platform orchestrating technical competency evaluation, bias-free semantic rubric scoring, automated interview scheduling, and personalized onboarding workflows.',
    impactMetric: '68% Faster Cycle Time',
    latencyMetric: '120ms Rubric Synthesis',
    reliabilityMetric: '99.4% Workflow Completion',
    stack: ['Next.js', 'TypeScript', 'LangGraph', 'Vector Search', 'Node.js', 'Tailwind CSS'],
    architectureNodes: [
      {
        stage: '01. Semantic Parser',
        component: 'Skill Graph & Artifact Extractor',
        detail: 'Maps candidate repositories, architecture docs, and problem-solving history into structured competency graphs.',
      },
      {
        stage: '02. Agentic Router',
        component: 'Autonomous Orchestration State Machine',
        detail: 'Coordinates evaluation rubrics, calendar negotiation, and compliance verification with human-in-the-loop checkpoints.',
      },
      {
        stage: '03. Analytics Hub',
        component: 'Organizational Capability Radar',
        detail: 'Surfaces real-time team skill density, hiring bottlenecks, and onboarding velocity metrics.',
      },
    ],
    simulationLog: [
      '[T+00ms] Ingesting candidate technical profile & GitHub contribution graph...',
      '[T+35ms] Semantic Skill Graph constructed: 94% alignment with Distributed Systems role.',
      '[T+78ms] Orchestrator Agent synthesized tailored system-design interview rubric.',
      '[T+115ms] Workflow synchronized across hiring panel with zero scheduling conflicts.',
    ],
  },
  {
    id: 'gitshield',
    index: '03',
    title: 'GitShield',
    category: 'Security & DevSecOps',
    tagline: 'Zero-Trust Repository Security Sentinel & Automated Secret Guardrail',
    description:
      'Real-time pre-commit and CI/CD security engine that performs Shannon entropy secret scanning, AST-level vulnerability detection, dependency graph auditing, and automated remediation patch generation.',
    impactMetric: '100% Secret Leak Prevention',
    latencyMetric: '14ms Pre-Commit Scan',
    reliabilityMetric: 'Zero False-Negative Bypass',
    stack: ['Rust', 'TypeScript', 'AST Static Analysis', 'GitHub App API', 'Docker', 'Zero-Trust Rules'],
    architectureNodes: [
      {
        stage: '01. Git Hook Interceptor',
        component: 'Sub-15ms Differential Diff Scanner',
        detail: 'Inspects staged git blobs using SIMD-accelerated regex and Shannon entropy heuristics before code leaves the workstation.',
      },
      {
        stage: '02. AST Security Engine',
        component: 'Semantic Vulnerability Graph Analyzer',
        detail: 'Traces taint flow across imports to detect SQL injection, SSRF, and insecure cryptographic primitives.',
      },
      {
        stage: '03. Auto-Remediation',
        component: 'Verified Patch Synthesizer',
        detail: 'Generates drop-in environment variable refactors and dependency lockfile upgrades automatically.',
      },
    ],
    simulationLog: [
      '[T+00ms] Intercepted pull request diff (42 files modified, +1,280 lines)...',
      '[T+05ms] Entropy scanner flagged high-entropy token in config/auth.ts:48.',
      '[T+11ms] AST taint analysis verified potential credential exposure path.',
      '[T+14ms] Commit blocked & automated vault-reference refactor patch generated.',
    ],
  },
  {
    id: 'buildtrack',
    index: '04',
    title: 'BuildTrack',
    category: 'Distributed Cloud',
    tagline: 'Distributed CI/CD Pipeline Observability & Build Telemetry Engine',
    description:
      'High-frequency build telemetry and deployment traceability platform that instruments distributed CI runners, pinpoints compilation cache misses, and visualizes critical-path DAG bottlenecks in real time.',
    impactMetric: '43% Faster CI Pipelines',
    latencyMetric: 'Sub-10ms Metric Ingestion',
    reliabilityMetric: '91% Cache Hit Optimization',
    stack: ['Next.js', 'Go', 'OpenTelemetry', 'ClickHouse', 'WebSockets', 'Framer Motion'],
    architectureNodes: [
      {
        stage: '01. Telemetry Collector',
        component: 'Lightweight eBPF & Runner Agent',
        detail: 'Captures process-level CPU, memory, network I/O, and build step durations with <0.5% runner overhead.',
      },
      {
        stage: '02. DAG Analyzer',
        component: 'Critical-Path Bottleneck Solver',
        detail: 'Reconstructs dependency execution graphs to isolate slow compilation units and flaky test shards.',
      },
      {
        stage: '03. Live Cockpit',
        component: 'Streaming Flamegraph & Trace Matrix',
        detail: 'Streams sub-second build progress, remote cache efficiency, and deployment health across environments.',
      },
    ],
    simulationLog: [
      '[T+00ms] Connected to 16 distributed build runners via OpenTelemetry gRPC stream...',
      '[T+04ms] Reconstructed 148-node monorepo build DAG; isolated critical path.',
      '[T+08ms] Detected remote cache miss on package @core/distributed-engine.',
      '[T+10ms] Applied shard rebalancing: total pipeline duration reduced from 6m 12s to 3m 28s.',
    ],
  },
];

const PLATFORM_METRICS: PlatformMetric[] = [
  {
    id: 'codechef',
    platform: 'CodeChef',
    value: '710+',
    unit: 'Problems Solved',
    rankOrTier: 'Competitive Algorithmic Programming',
    summary:
      'Extensive competitive programming track record solving complex algorithmic problems under strict time and memory constraints.',
    breakdown: [
      { label: 'Dynamic Programming & Memoization', metric: '195+ Solved', percentage: 92 },
      { label: 'Graph Theory, Shortest Paths & Flows', metric: '180+ Solved', percentage: 88 },
      { label: 'Segment Trees, Fenwick & Range Queries', metric: '165+ Solved', percentage: 85 },
      { label: 'Number Theory, Combinatorics & Greedy', metric: '170+ Solved', percentage: 90 },
    ],
    featuredAchievement: 'Consistent high-speed contest execution across rated CodeChef Starters & Long Challenges.',
    iconName: 'code',
  },
  {
    id: 'leetcode',
    platform: 'LeetCode',
    value: '100+',
    unit: 'Core Patterns Mastered',
    rankOrTier: 'Production DSA & Complexity Optimization',
    summary:
      'Curated mastery of high-leverage algorithmic patterns essential for low-latency distributed systems and technical architecture interviews.',
    breakdown: [
      { label: 'Trees, Tries & Balanced Hierarchies', metric: '32+ Core Patterns', percentage: 94 },
      { label: 'Sliding Window, Two Pointers & Monotonic Stack', metric: '28+ Core Patterns', percentage: 96 },
      { label: 'Backtracking, State-Space Search & Heaps', metric: '24+ Core Patterns', percentage: 89 },
      { label: 'Concurrency & System Design Primitives', metric: '18+ Core Patterns', percentage: 91 },
    ],
    featuredAchievement: 'Top-percentile runtime and memory efficiency across Medium and Hard algorithmic benchmarks.',
    iconName: 'terminal',
  },
  {
    id: 'hackathons',
    platform: 'Hackathons',
    value: '100+',
    unit: 'Builds & Rapid Sprints',
    rankOrTier: 'National Finalist & Flagship Systems Builder',
    summary:
      'Battle-tested rapid engineering under 24-to-48-hour pressure—transforming raw problem statements into deployed, full-stack AI architectures.',
    breakdown: [
      { label: 'Autonomous Multi-Agent Systems (SENTINEL)', metric: 'Flagship Winner', percentage: 98 },
      { label: 'Enterprise Simulation (Revenue Digital Twin)', metric: 'Production Prototype', percentage: 96 },
      { label: 'DevSecOps & Developer Tooling (GitShield)', metric: 'Security Track', percentage: 93 },
      { label: 'Full-Stack Real-Time WebGL & Cloud Apps', metric: '100+ Sprints', percentage: 95 },
    ],
    featuredAchievement: 'Creator of SENTINEL & Revenue Digital Twin—bridging multi-agent LLM orchestration with live telemetry.',
    iconName: 'rocket',
  },
  {
    id: 'certifications',
    platform: 'Certifications',
    value: '75+',
    unit: 'Verified Credentials',
    rankOrTier: 'Multidisciplinary Engineering Mastery',
    summary:
      'Continuous verified upskilling across cloud-native infrastructure, generative AI engineering, cybersecurity, and modern full-stack frameworks.',
    breakdown: [
      { label: 'Generative AI, LLMs & Agentic Workflows', metric: '24 Credentials', percentage: 96 },
      { label: 'Cloud Architecture, Kubernetes & DevOps', metric: '20 Credentials', percentage: 91 },
      { label: 'Full-Stack TypeScript, Next.js & Systems', metric: '18 Credentials', percentage: 95 },
      { label: 'Cybersecurity, Zero-Trust & Network Defense', metric: '15 Credentials', percentage: 89 },
    ],
    featuredAchievement: '75+ verified technical specializations validating end-to-end systems and AI engineering depth.',
    iconName: 'award',
  },
];

const SKILL_MATRIX: SkillNode[] = [
  // AI & LLM Systems
  {
    name: 'Multi-Agent Orchestration (LangGraph / CrewAI)',
    category: 'AI & LLM Systems',
    proficiency: 96,
    experienceLevel: 'Production Architect',
    relatedProjects: ['Revenue Digital Twin', 'Smart HR Orchestrator'],
    coreCapability: 'Deterministic state machines, tool-calling loops, and multi-agent consensus protocols.',
  },
  {
    name: 'Hybrid GraphRAG & Vector Indexing',
    category: 'AI & LLM Systems',
    proficiency: 94,
    experienceLevel: 'Advanced Systems',
    relatedProjects: ['Smart HR Orchestrator', 'Revenue Digital Twin'],
    coreCapability: 'HNSW dense retrieval, knowledge graph traversal, and sub-50ms semantic reranking.',
  },
  {
    name: 'LLM Inference Optimization & Prompt Engineering',
    category: 'AI & LLM Systems',
    proficiency: 93,
    experienceLevel: 'Production Architect',
    relatedProjects: ['Revenue Digital Twin', 'Smart HR Orchestrator'],
    coreCapability: 'Structured JSON outputs, speculative routing, KV-cache optimization, and eval harnesses.',
  },
  // Full-Stack & WebGL
  {
    name: 'Next.js (App Router) & React 19 Architecture',
    category: 'Full-Stack & WebGL',
    proficiency: 98,
    experienceLevel: 'Principal Craft',
    relatedProjects: ['Revenue Digital Twin', 'Smart HR Orchestrator', 'BuildTrack'],
    coreCapability: 'Server components, streaming SSR, optimistic UI mutations, and modular state design.',
  },
  {
    name: 'TypeScript & Strict Type-Level Programming',
    category: 'Full-Stack & WebGL',
    proficiency: 97,
    experienceLevel: 'Principal Craft',
    relatedProjects: ['Revenue Digital Twin', 'Smart HR Orchestrator', 'GitShield', 'BuildTrack'],
    coreCapability: 'End-to-end type safety, discriminated unions, schema validation, and zero-runtime-error contracts.',
  },
  {
    name: 'Framer Motion, HTML5 Canvas & 3D Spatial UI',
    category: 'Full-Stack & WebGL',
    proficiency: 95,
    experienceLevel: 'Creative Technologist',
    relatedProjects: ['Revenue Digital Twin', 'BuildTrack'],
    coreCapability: 'Spring physics, scroll-linked kinematics, custom 3D projection canvases, and 60fps HUDs.',
  },
  // Systems & DSA
  {
    name: 'Advanced Data Structures & Competitive Algorithms',
    category: 'Systems & DSA',
    proficiency: 96,
    experienceLevel: '710+ CodeChef / 100+ LeetCode',
    relatedProjects: ['GitShield', 'BuildTrack'],
    coreCapability: 'Graph algorithms, dynamic programming, segment trees, and asymptotic latency reduction.',
  },
  {
    name: 'C++20 / Rust Systems & Memory-Safe Concurrency',
    category: 'Systems & DSA',
    proficiency: 91,
    experienceLevel: 'Systems Engineer',
    relatedProjects: ['GitShield', 'BuildTrack'],
    coreCapability: 'Lock-free data structures, SIMD text scanning, AST parsing, and zero-copy serialization.',
  },
  {
    name: 'High-Throughput Backend APIs (FastAPI / Node / Go)',
    category: 'Systems & DSA',
    proficiency: 95,
    experienceLevel: 'Production Architect',
    relatedProjects: ['Revenue Digital Twin', 'Smart HR Orchestrator', 'BuildTrack'],
    coreCapability: 'Asynchronous event loops, WebSockets, gRPC streaming, and rate-limited API gateways.',
  },
  // Cloud & DevSecOps
  {
    name: 'Zero-Trust Security & AST Static Analysis',
    category: 'Cloud & DevSecOps',
    proficiency: 94,
    experienceLevel: 'Security Architect',
    relatedProjects: ['GitShield'],
    coreCapability: 'Shannon entropy secret detection, taint analysis, automated PR guardrails, and RBAC.',
  },
  {
    name: 'Distributed Observability & OpenTelemetry',
    category: 'Cloud & DevSecOps',
    proficiency: 92,
    experienceLevel: 'Systems Engineer',
    relatedProjects: ['BuildTrack', 'Revenue Digital Twin'],
    coreCapability: 'Distributed tracing, critical-path DAG profiling, ClickHouse time-series, and live flamegraphs.',
  },
  {
    name: 'Docker, Kubernetes & Cloud-Native CI/CD',
    category: 'Cloud & DevSecOps',
    proficiency: 91,
    experienceLevel: 'Cloud Engineer',
    relatedProjects: ['BuildTrack', 'GitShield'],
    coreCapability: 'Multi-stage containerization, deterministic build caching, and automated canary rollouts.',
  },
];

// -----------------------------------------------------------------------------
// 3D INTERACTIVE CANVAS ENGINE (PURE CANVAS / WEBGL-INSPIRED 3D PROJECTION)
// -----------------------------------------------------------------------------

type CoreVisualMode = 'orbital' | 'neural' | 'lattice';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  isCrimson: boolean;
}

function InteractiveAvatarCoreCanvas({
  mode,
  mouseOffset,
}: {
  mode: CoreVisualMode;
  mouseOffset: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D Icosahedron / Geodesic vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];

    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return { x: (x / len) * 78, y: (y / len) * 78, z: (z / len) * 78 };
    });

    // Edges between close vertices
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 95) {
          edges.push([i, j]);
        }
      }
    }

    // Generate 3D floating particles
    const particles: Particle3D[] = Array.from({ length: 68 }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const r = 55 + Math.random() * 95;
      return {
        x: r * Math.sqrt(1 - u * u) * Math.cos(theta),
        y: r * Math.sqrt(1 - u * u) * Math.sin(theta),
        z: r * u,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        size: 1.2 + (i % 3) * 0.8,
        alpha: 0.35 + Math.random() * 0.65,
        isCrimson: i % 4 !== 0,
      };
    });

    let angleX = 0.3;
    let angleY = 0.5;
    let tick = 0;

    const render = () => {
      tick += 0.016;
      const logicalW = canvas.offsetWidth;
      const logicalH = canvas.offsetHeight;
      const cx = logicalW / 2;
      const cy = logicalH / 2;

      ctx.clearRect(0, 0, logicalW, logicalH);

      // Subtle radial core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, 150);
      coreGrad.addColorStop(0, 'rgba(225, 29, 72, 0.28)');
      coreGrad.addColorStop(0.5, 'rgba(153, 27, 27, 0.09)');
      coreGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, logicalW, logicalH);

      // Rotation speed influenced by mode & cursor offset
      const speedMultiplier = mode === 'orbital' ? 1 : mode === 'neural' ? 1.45 : 0.75;
      angleY += 0.007 * speedMultiplier + mouseOffset.x * 0.0004;
      angleX += 0.004 * speedMultiplier + mouseOffset.y * 0.0004;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 290;
        const scale = fov / (fov + z2 + 120);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          z: z2,
          scale,
        };
      };

      // Draw outer gyroscope orbital rings
      const ringRadii = mode === 'lattice' ? [92, 118, 138] : [96, 124];
      ringRadii.forEach((radius, rIdx) => {
        ctx.beginPath();
        const segments = 64;
        for (let s = 0; s <= segments; s++) {
          const t = (s / segments) * Math.PI * 2;
          const rx = Math.cos(t) * radius;
          const ry = Math.sin(t) * radius * (rIdx % 2 === 0 ? 0.42 : 0.85);
          const rz = Math.sin(t) * radius * (rIdx % 2 === 0 ? 0.9 : 0.5);
          const { px, py } = project(rx, ry, rz);
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle =
          rIdx === 0 ? 'rgba(239, 68, 68, 0.36)' : 'rgba(244, 63, 94, 0.18)';
        ctx.lineWidth = rIdx === 0 ? 1.2 : 0.8;
        ctx.stroke();
      });

      // Project polyhedron vertices
      const projectedVertices = vertices.map((v) => {
        const pulse = mode === 'neural' ? 1 + Math.sin(tick * 2.5 + v.x) * 0.08 : 1;
        return project(v.x * pulse, v.y * pulse, v.z * pulse);
      });

      // Draw polyhedron edges
      edges.forEach(([i, j]) => {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];
        const depthAlpha = Math.max(0.12, Math.min(0.75, (p1.scale + p2.scale - 1.1) * 0.9));
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(239, 68, 68, ${depthAlpha})`;
        ctx.lineWidth = mode === 'lattice' ? 1.4 : 1;
        ctx.stroke();
      });

      // Draw glowing neon nodes on vertices
      projectedVertices.forEach((p) => {
        const nodeRadius = Math.max(1.8, 3.4 * p.scale);
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.z < 0 ? '#ef4444' : '#fda4af';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update & draw 3D particles
      particles.forEach((pt, idx) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.z += pt.vz;

        const dist = Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z);
        if (dist > 155 || dist < 42) {
          pt.vx *= -1;
          pt.vy *= -1;
          pt.vz *= -1;
        }

        const proj = project(pt.x, pt.y, pt.z);

        // In neural mode, connect nearby particles to vertices
        if (mode === 'neural' && idx % 3 === 0) {
          const targetV = projectedVertices[idx % projectedVertices.length];
          ctx.beginPath();
          ctx.moveTo(proj.px, proj.py);
          ctx.lineTo(targetV.px, targetV.py);
          ctx.strokeStyle = 'rgba(225, 29, 72, 0.16)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pt.size * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = pt.isCrimson
          ? `rgba(239, 68, 68, ${pt.alpha})`
          : `rgba(255, 255, 255, ${pt.alpha * 0.7})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, mouseOffset.x, mouseOffset.y]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      aria-label="Interactive 3D Orbital Core Visualization for Mathanraj S"
    />
  );
}

// -----------------------------------------------------------------------------
// 3D GLASS-TILT INTERACTIVE CARD COMPONENT
// -----------------------------------------------------------------------------

function GlassTiltCard({
  children,
  className = '',
  onClick,
  glowIntensity = 'medium',
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowIntensity?: 'low' | 'medium' | 'high';
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 260,
    damping: 24,
  });

  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 260,
    damping: 28,
  });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 260,
    damping: 28,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const alphaMap = {
    low: '0.10',
    medium: '0.16',
    high: '0.24',
  };

  const backgroundGlow = useMotionTemplate`radial-gradient(420px circle at ${spotlightX}% ${spotlightY}%, rgba(225, 29, 72, ${alphaMap[glowIntensity]}), transparent 75%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 hover:border-red-500/60 transition-colors duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <motion.div
        style={{ background: backgroundGlow }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// MAIN PORTFOLIO PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PortfolioPage() {
  // Scroll progress for Hero massive typography zoom & fade
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothHeroScroll = useSpring(heroScroll, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Hero "MATHANRAJ" typography scales up (zooms in) and fades out gracefully on scroll
  const heroTitleScale = useTransform(smoothHeroScroll, [0, 0.75], [1, 2.15]);
  const heroTitleOpacity = useTransform(smoothHeroScroll, [0, 0.62], [0.92, 0]);
  const heroTitleY = useTransform(smoothHeroScroll, [0, 0.75], [0, -110]);
  const avatarBoxY = useTransform(smoothHeroScroll, [0, 1], [0, 65]);

  // Timeline scroll progress for vertical laser-line
  const timelineRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 30%'],
  });
  const laserScaleY = useSpring(timelineScroll, {
    stiffness: 140,
    damping: 26,
  });

  // Interactive states
  const [coreMode, setCoreMode] = useState<CoreVisualMode>('orbital');
  const [avatarMouse, setAvatarMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [expandedYear, setExpandedYear] = useState<string>('2026');
  const [projectFilter, setProjectFilter] = useState<string>('All Systems');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [simulatingProject, setSimulatingProject] = useState<boolean>(false);
  const [activePlatformId, setActivePlatformId] = useState<string>('codechef');
  const [activeSkillTab, setActiveSkillTab] = useState<string>('All Capabilities');
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('Full-Stack AI Engineering Role');
  const [contactSender, setContactSender] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All Systems') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  // Active platform metric object
  const activePlatform = useMemo(
    () => PLATFORM_METRICS.find((m) => m.id === activePlatformId) || PLATFORM_METRICS[0],
    [activePlatformId]
  );

  // Filtered skills
  const skillTabs = [
    'All Capabilities',
    'AI & LLM Systems',
    'Full-Stack & WebGL',
    'Systems & DSA',
    'Cloud & DevSecOps',
  ];

  const filteredSkills = useMemo(() => {
    if (activeSkillTab === 'All Capabilities') return SKILL_MATRIX;
    return SKILL_MATRIX.filter((s) => s.category === activeSkillTab);
  }, [activeSkillTab]);

  // Avatar 3D tilt values
  const avatarTiltX = useMotionValue(0);
  const avatarTiltY = useMotionValue(0);
  const avatarRotateX = useSpring(useTransform(avatarTiltY, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 22,
  });
  const avatarRotateY = useSpring(useTransform(avatarTiltX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 22,
  });

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    avatarTiltX.set(nx);
    avatarTiltY.set(ny);
    setAvatarMouse({ x: nx * 35, y: ny * 35 });
  };

  const handleAvatarMouseLeave = () => {
    avatarTiltX.set(0);
    avatarTiltY.set(0);
    setAvatarMouse({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kit25cseamathanrajs@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setContactSender('');
      setContactMessage('');
      setContactModalOpen(false);
    }, 2200);
  };

  // Close modals on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setContactModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const renderPlatformIcon = (name: PlatformMetric['iconName']) => {
    switch (name) {
      case 'code':
        return <Code2 className="w-5 h-5 text-red-500" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-red-500" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-red-500" />;
      case 'award':
        return <Award className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Subtle Ambient Background Grid & Crimson Horizon Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(225, 29, 72, 0.16), transparent 55%),
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* =====================================================================
          TOP NAVIGATION BAR (STRICT 3-ZONE CONTRACT)
         ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('hero');
            }}
            className="font-display text-lg font-extrabold tracking-tight text-white hover:text-red-500 transition-colors whitespace-nowrap"
          >
            MATHANRAJ S
          </a>

          {/* Zone 2: 4-5 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button
              onClick={() => handleScrollTo('timeline')}
              className="hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap cursor-pointer"
            >
              Timeline
            </button>
            <button
              onClick={() => handleScrollTo('projects')}
              className="hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleScrollTo('metrics')}
              className="hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap cursor-pointer"
            >
              Metrics
            </button>
            <button
              onClick={() => handleScrollTo('matrix')}
              className="hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap cursor-pointer"
            >
              Technical Matrix
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-[0_0_24px_rgba(225,29,72,0.45)] transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Initiate Contact</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* =====================================================================
            1. HERO SECTION (CINEMATIC SCALE & IMPACT)
           ===================================================================== */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen pt-24 pb-16 px-6 flex flex-col justify-between overflow-hidden"
        >
          {/* Massive Parallax Typography "MATHANRAJ" with useScroll & useTransform */}
          <div className="relative w-full max-w-7xl mx-auto pt-4 md:pt-8 flex flex-col items-center justify-center">
            <motion.div
              style={{
                scale: heroTitleScale,
                opacity: heroTitleOpacity,
                y: heroTitleY,
              }}
              className="w-full text-center select-none pointer-events-none z-0"
            >
              <h1
                className="font-display font-extrabold tracking-tighter leading-none text-[13vw] sm:text-[13.5vw] lg:text-[142px] text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950/40 drop-shadow-[0_0_45px_rgba(225,29,72,0.55)]"
              >
                MATHANRAJ
              </h1>
            </motion.div>

            {/* Main Split Hero Content & Foreground 3D Glassmorphic Interactive Avatar Box */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-2 lg:-mt-10 relative z-10">
              {/* Left Column: Editorial Narrative & Quantitative Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-red-500 font-semibold">MATHANRAJ S</span>
                  <span aria-hidden="true">·</span>
                  <span>B.E. Computer Science & Engineering (2025 – 2029)</span>
                  <span aria-hidden="true">·</span>
                  <span>Full-Stack AI & Distributed Systems</span>
                </div>

                <h2
                  className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  Architecting Autonomous Multi-Agent Systems & High-Contrast Spatial Interfaces.
                </h2>

                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Bridging competitive algorithmic precision (<span className="text-zinc-200 font-mono">710+ CodeChef</span>) with production-grade AI engineering. Creator of{' '}
                  <span className="text-zinc-200 font-medium">Revenue Digital Twin</span>,{' '}
                  <span className="text-zinc-200 font-medium">SENTINEL</span>,{' '}
                  <span className="text-zinc-200 font-medium">GitShield</span>, and{' '}
                  <span className="text-zinc-200 font-medium">BuildTrack</span>.
                </p>

                {/* Primary Hero Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleScrollTo('projects')}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.75)] transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Explore Flagship Systems</span>
                  </button>

                  <button
                    onClick={() => handleScrollTo('timeline')}
                    className="px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-red-500/50 font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Journey 2025 – 2029</span>
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  </button>

                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 border border-zinc-800/80 text-xs font-mono transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    title="Copy Direct Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Email Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-red-500" />
                        <span>kit25cseamathanrajs@gmail.com</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Claim-to-Proof Adjacency Strip */}
                <div className="pt-6 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      710<span className="text-red-500">+</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">CodeChef Problems</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      100<span className="text-red-500">+</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">LeetCode DSA Core</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      100<span className="text-red-500">+</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">Hackathon Builds</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      75<span className="text-red-500">+</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">Verified Certifications</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Foreground 3D Glassmorphic Interactive Avatar Box */}
              <motion.div
                style={{ y: avatarBoxY }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex justify-center"
              >
                <div
                  className="relative w-full max-w-[430px]"
                  style={{ perspective: '1200px' }}
                >
                  {/* Pulsing Neon Red Aura Behind Avatar Box */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-red-600/35 via-rose-600/15 to-transparent blur-2xl animate-pulse-glow pointer-events-none"
                  />

                  <motion.div
                    onMouseMove={handleAvatarMouseMove}
                    onMouseLeave={handleAvatarMouseLeave}
                    style={{
                      rotateX: avatarRotateX,
                      rotateY: avatarRotateY,
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border-2 border-red-500/60 shadow-[0_0_50px_rgba(225,29,72,0.3)] overflow-hidden p-5"
                  >
                    {/* Top Avatar Header Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="font-mono text-xs font-medium text-zinc-200">
                          3D SPATIAL AVATAR CORE
                        </span>
                      </div>
                      <span className="font-mono text-xs text-red-400">
                        COHORT 2025–2029
                      </span>
                    </div>

                    {/* Interactive 3D Particle & Polyhedron Viewport */}
                    <div className="relative h-[290px] w-full my-3 rounded-xl bg-gradient-to-b from-zinc-900/60 to-black border border-zinc-800/90 overflow-hidden flex items-center justify-center">
                      <InteractiveAvatarCoreCanvas mode={coreMode} mouseOffset={avatarMouse} />

                      {/* Center Glassmorphic Identity Emblem Overlay */}
                      <div
                        style={{ transform: 'translateZ(32px)' }}
                        className="pointer-events-none absolute flex flex-col items-center justify-center text-center px-4 py-3 rounded-xl bg-black/55 backdrop-blur-md border border-red-500/40 shadow-[0_0_25px_rgba(225,29,72,0.35)]"
                      >
                        <div className="font-display text-2xl font-extrabold tracking-wider text-white">
                          MS
                        </div>
                        <div className="text-[11px] font-mono text-red-400 mt-0.5">
                          MATHANRAJ S
                        </div>
                      </div>

                      {/* Corner Precision Reticles */}
                      <div className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-500/70" />
                      <div className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-500/70" />
                      <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-red-500/70" />
                      <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-red-500/70" />
                    </div>

                    {/* Interactive 3D Core Topology Switcher (Functional Controls) */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Interactive Geometry Mode</span>
                        <span className="font-mono text-zinc-300 capitalize">{coreMode}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900/90 rounded-lg border border-zinc-800">
                        {(['orbital', 'neural', 'lattice'] as CoreVisualMode[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setCoreMode(m)}
                            className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all whitespace-nowrap cursor-pointer ${
                              coreMode === m
                                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Smooth Scroll Indicator with Animated Pulsing Arrows */}
          <div className="w-full flex flex-col items-center justify-center pt-12">
            <button
              onClick={() => handleScrollTo('timeline')}
              className="group flex flex-col items-center gap-2 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              aria-label="Scroll down to Journey Through Time section"
            >
              <span>Scroll to Journey (2025 – 2029)</span>
              <div className="flex flex-col items-center -space-y-2">
                <motion.div
                  animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-4 h-4 text-red-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0], opacity: [0.2, 0.85, 0.2] }}
                  transition={{
                    duration: 1.6,
                    delay: 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-red-500" />
                </motion.div>
              </div>
            </button>
          </div>
        </section>

        {/* =====================================================================
            2. TIMELINE SECTION ("JOURNEY THROUGH TIME" 2025 - 2029)
           ===================================================================== */}
        <section
          id="timeline"
          ref={timelineRef}
          className="relative py-28 px-6 border-t border-zinc-900/80"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
              <div className="space-y-3">
                <div className="text-xs font-mono text-red-500 font-semibold">
                  01. CHRONOLOGICAL ARCHITECTURE · 2025 – 2029
                </div>
                <h2
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Journey Through Time
                </h2>
              </div>

              {/* Quick Year Selector Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800/90">
                {TIMELINE_DATA.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setExpandedYear(item.year)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      expandedYear === item.year
                        ? 'bg-red-600 text-white shadow-[0_0_16px_rgba(225,29,72,0.5)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Dark Laser-Line & Alternating Glassmorphic Cards */}
            <div className="relative">
              {/* Static Dark Track Line */}
              <div
                aria-hidden="true"
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-zinc-900"
              />

              {/* Scroll-Driven Glowing Red Laser Line */}
              <motion.div
                aria-hidden="true"
                style={{ scaleY: laserScaleY, transformOrigin: 'top' }}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-red-500 via-red-600 to-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.85)]"
              />

              <div className="space-y-14 md:space-y-20">
                {TIMELINE_DATA.map((milestone, index) => {
                  const isEven = index % 2 === 0;
                  const isExpanded = expandedYear === milestone.year;

                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Glowing Red Orbit Node on the Laser Line */}
                      <button
                        type="button"
                        onClick={() => setExpandedYear(milestone.year)}
                        aria-label={`Inspect ${milestone.year} milestone`}
                        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 w-10 h-10 rounded-full bg-[#050505] border-2 border-red-500 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.85)] group cursor-pointer focus:outline-none"
                      >
                        <span
                          className={`w-3 h-3 rounded-full transition-transform duration-200 ${
                            isExpanded
                              ? 'bg-white scale-125 shadow-[0_0_12px_#ffffff]'
                              : 'bg-red-500 group-hover:scale-125'
                          }`}
                        />
                        <span className="pointer-events-none absolute -inset-1.5 rounded-full border border-red-500/40 animate-ping" />
                      </button>

                      {/* Card Column (50% width on desktop with spacing from center laser) */}
                      <div
                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                          isEven ? 'md:pr-14' : 'md:pl-14'
                        }`}
                      >
                        <GlassTiltCard
                          onClick={() =>
                            setExpandedYear(isExpanded ? '' : milestone.year)
                          }
                          glowIntensity={isExpanded ? 'high' : 'medium'}
                          className={`p-6 sm:p-8 ${
                            isExpanded
                              ? 'border-red-500/70 shadow-[0_0_35px_rgba(225,29,72,0.18)]'
                              : ''
                          }`}
                        >
                          {/* Top Year & Phase Header */}
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <span className="font-display text-3xl sm:text-4xl font-extrabold text-red-500 tracking-tight tabular-nums">
                              {milestone.year}
                            </span>
                            <span className="text-xs font-mono text-zinc-400">
                              {milestone.phase}
                            </span>
                          </div>

                          {/* Milestone Title */}
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                            {milestone.title}
                          </h3>

                          <p className="text-xs font-mono text-zinc-400 mb-4">
                            {milestone.metrics}
                          </p>

                          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5">
                            {milestone.summary}
                          </p>

                          {/* Unboxed Clean Tech Stack Metadata with Separators */}
                          <div className="flex flex-wrap items-center gap-y-1 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 pt-4">
                            {milestone.stack.map((tech, i) => (
                              <React.Fragment key={tech}>
                                <span className="text-zinc-200">{tech}</span>
                                {i < milestone.stack.length - 1 && (
                                  <span className="mx-2 text-red-500/70" aria-hidden="true">
                                    ·
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Expandable Deep-Dive Engineering Breakdown */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-5 pt-5 border-t border-zinc-800/90 space-y-3">
                                  <div className="text-xs font-mono text-red-400 font-semibold">
                                    Key Engineering Milestones & Deliverables
                                  </div>
                                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                                    {milestone.highlights.map((h) => (
                                      <li key={h} className="flex items-start gap-2.5">
                                        <span className="text-red-500 font-mono mt-0.5">→</span>
                                        <span>{h}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="pt-2 text-xs font-mono text-zinc-400">
                                    <span className="text-zinc-200 font-semibold">
                                      Core Artifact:{' '}
                                    </span>
                                    {milestone.deliverable}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="mt-4 flex items-center justify-between text-xs font-mono text-red-400">
                            <span>
                              {isExpanded ? 'Click to collapse details' : 'Click to inspect deliverables'}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </GlassTiltCard>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. CINEMATIC PROJECT GRID
           ===================================================================== */}
        <section
          id="projects"
          className="relative py-28 px-6 border-t border-zinc-900/80 bg-gradient-to-b from-[#050505] via-zinc-950/50 to-[#050505]"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header & Interactive Domain Filter */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="space-y-3">
                <div className="text-xs font-mono text-red-500 font-semibold">
                  02. PRODUCTION SYSTEMS & ARCHITECTURES
                </div>
                <h2
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Cinematic Project Grid
                </h2>
              </div>

              {/* Interactive Segmented Control Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800">
                {['All Systems', 'AI & Multi-Agent', 'Security & DevSecOps', 'Distributed Cloud'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setProjectFilter(cat)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        projectFilter === cat
                          ? 'text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {projectFilter === cat && (
                        <motion.span
                          layoutId="projectFilterIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-lg bg-red-600 shadow-[0_0_20px_rgba(225,29,72,0.5)] -z-10"
                        />
                      )}
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 2x2 High-Contrast Sci-Fi Project Grid */}
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassTiltCard
                      onClick={() => {
                        setSelectedProject(project);
                        setSimulatingProject(false);
                      }}
                      glowIntensity="high"
                      className="h-full p-7 sm:p-9 flex flex-col justify-between"
                    >
                      <div>
                        {/* Quiet 1-line Kicker */}
                        <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 mb-4">
                          <span>
                            {project.index}. {project.category}
                          </span>
                          <span className="text-red-400 font-semibold">
                            {project.impactMetric}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                          {project.title}
                        </h3>

                        <p className="text-sm font-medium text-zinc-300 mb-4">
                          {project.tagline}
                        </p>

                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Quantitative Benchmark Row */}
                        <div className="grid grid-cols-3 gap-4 py-4 px-4 rounded-xl bg-black/50 border border-zinc-900 mb-6">
                          <div>
                            <div className="text-[11px] text-zinc-500">Primary Impact</div>
                            <div className="font-mono text-xs sm:text-sm font-semibold text-white mt-0.5 tabular-nums">
                              {project.impactMetric}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500">Execution Speed</div>
                            <div className="font-mono text-xs sm:text-sm font-semibold text-red-400 mt-0.5 tabular-nums">
                              {project.latencyMetric}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500">Scale / SLA</div>
                            <div className="font-mono text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 tabular-nums">
                              {project.reliabilityMetric}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer: Interactive Tech Stack Filter Buttons + Architecture Trigger */}
                      <div className="space-y-5 pt-2 border-t border-zinc-900">
                        <div className="flex flex-wrap items-center gap-2">
                          {project.stack.map((tech) => (
                            <button
                              key={tech}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSkillName(tech);
                                handleScrollTo('matrix');
                              }}
                              className="px-2.5 py-1 rounded-md bg-zinc-900/90 hover:bg-red-950/60 border border-zinc-800 hover:border-red-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                              title={`Inspect ${tech} in Technical Matrix`}
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-red-400 group-hover:text-red-300">
                          <span className="flex items-center gap-1.5">
                            <Cpu className="w-4 h-4" />
                            <span>Inspect System Topology & Run Trace</span>
                          </span>
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </GlassTiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            4. TECHNICAL MATRIX & PLATFORM METRICS
           ===================================================================== */}
        <section
          id="metrics"
          className="relative py-28 px-6 border-t border-zinc-900/80"
        >
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Part A: Competitive & Engineering Platform Metrics */}
            <div>
              <div className="space-y-3 mb-12">
                <div className="text-xs font-mono text-red-500 font-semibold">
                  03. VERIFIED COMPETITIVE & ENGINEERING TELEMETRY
                </div>
                <h2
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Platform Metrics & Proof
                </h2>
              </div>

              {/* 4-Card Interactive Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {PLATFORM_METRICS.map((item) => {
                  const isSelected = item.id === activePlatformId;
                  return (
                    <GlassTiltCard
                      key={item.id}
                      onClick={() => setActivePlatformId(item.id)}
                      glowIntensity={isSelected ? 'high' : 'low'}
                      className={`p-6 transition-all ${
                        isSelected
                          ? 'border-red-500 bg-zinc-900/90 shadow-[0_0_30px_rgba(225,29,72,0.25)]'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-zinc-200">
                          {item.platform}
                        </span>
                        {renderPlatformIcon(item.iconName)}
                      </div>

                      <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums mb-1">
                        {item.value}
                      </div>

                      <div className="text-xs font-mono text-red-400 mb-3">
                        {item.unit}
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.rankOrTier}
                      </p>
                    </GlassTiltCard>
                  );
                })}
              </div>

              {/* Interactive Breakdown Panel for Selected Metric */}
              <motion.div
                key={activePlatform.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-zinc-950/90 border border-zinc-800/90 p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="text-xs font-mono text-red-500">
                      ACTIVE TELEMETRY BREAKDOWN · {activePlatform.platform.toUpperCase()}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {activePlatform.value} {activePlatform.unit}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {activePlatform.summary}
                    </p>
                    <div className="pt-2 text-xs font-mono text-zinc-300">
                      <span className="text-red-500">Highlight: </span>
                      {activePlatform.featuredAchievement}
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePlatform.breakdown.map((b) => (
                      <div
                        key={b.label}
                        className="p-4 rounded-xl bg-black/60 border border-zinc-900 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-medium">{b.label}</span>
                          <span className="font-mono text-red-400 tabular-nums">
                            {b.metric}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${b.percentage}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Part B: Interactive Technical Matrix with Spring Skill Tab Filter */}
            <div id="matrix" className="pt-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-red-500 font-semibold">
                    04. CAPABILITY ARCHITECTURE & PROFICIENCY MATRIX
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Interactive Technical Matrix
                  </h2>
                </div>

                {/* Interactive Skill Tab Filter with Framer Motion Spring LayoutId */}
                <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  {skillTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveSkillTab(tab);
                        setSelectedSkillName(null);
                      }}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        activeSkillTab === tab
                          ? 'text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {activeSkillTab === tab && (
                        <motion.span
                          layoutId="activeSkillTabBubble"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className="absolute inset-0 rounded-lg bg-red-600 shadow-[0_0_20px_rgba(225,29,72,0.5)] -z-10"
                        />
                      )}
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Cards Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => {
                    const isHighlighted =
                      selectedSkillName &&
                      skill.name.toLowerCase().includes(selectedSkillName.toLowerCase());

                    return (
                      <motion.div
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        onClick={() =>
                          setSelectedSkillName(
                            selectedSkillName === skill.name ? null : skill.name
                          )
                        }
                        className={`p-6 rounded-2xl bg-zinc-950/85 border transition-all cursor-pointer ${
                          isHighlighted || selectedSkillName === skill.name
                            ? 'border-red-500 shadow-[0_0_25px_rgba(225,29,72,0.25)]'
                            : 'border-zinc-800/80 hover:border-red-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-2">
                          <span>{skill.category}</span>
                          <span className="text-red-400 font-semibold tabular-nums">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white mb-2">
                          {skill.name}
                        </h3>

                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                          {skill.coreCapability}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-400"
                          />
                        </div>

                        {/* Unboxed Metadata: Deployed In Projects */}
                        <div className="text-[11px] font-mono text-zinc-400">
                          <span className="text-zinc-500">Deployed in: </span>
                          {skill.relatedProjects.map((proj, idx) => (
                            <React.Fragment key={proj}>
                              <span className="text-zinc-200">{proj}</span>
                              {idx < skill.relatedProjects.length - 1 && (
                                <span className="mx-1.5 text-red-500">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. DIRECT CONTACT & COLLABORATION SECTION
           ===================================================================== */}
        <section
          id="contact"
          className="relative py-28 px-6 border-t border-zinc-900/80"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-xs font-mono text-red-500 font-semibold">
              05. DIRECT TRANSMISSION · AVAILABLE FOR AI & FULL-STACK ROLES
            </div>

            <h2
              className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Ready to Build the Next Autonomous Platform?
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether architecting multi-agent LLM workflows, low-latency distributed backends, or high-impact spatial web interfaces—initiate a direct conversation with Mathanraj S.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open Direct Dispatch</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono text-xs sm:text-sm transition-colors flex items-center gap-2.5 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied: kit25cseamathanrajs@gmail.com</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-red-500" />
                    <span>kit25cseamathanrajs@gmail.com</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN EDITORIAL FOOTER
         ===================================================================== */}
      <footer className="border-t border-zinc-900 py-10 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-zinc-200">MATHANRAJ S</span>
            <span>·</span>
            <span>Full-Stack AI Engineer & Systems Architect</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleScrollTo('hero')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
            <span>© {new Date().getFullYear()} Mathanraj S. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE MODAL 1: SYSTEM ARCHITECTURE & LIVE SIMULATION VIEWER
         ===================================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-red-500/50 shadow-[0_0_60px_rgba(225,29,72,0.3)] p-6 sm:p-8 space-y-6 my-8"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-red-500 mb-1">
                    SYSTEM ARCHITECTURE BLUEPRINT · {selectedProject.category}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close System Architecture Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* 3-Stage Architecture Pipeline Nodes */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-zinc-400 font-semibold">
                  End-to-End Execution Topology
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedProject.architectureNodes.map((node) => (
                    <div
                      key={node.stage}
                      className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5"
                    >
                      <div className="text-[11px] font-mono text-red-400">
                        {node.stage}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {node.component}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {node.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Benchmark Trace Runner */}
              <div className="rounded-xl bg-black border border-zinc-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    Interactive Diagnostic Trace
                  </span>
                  <button
                    onClick={() => setSimulatingProject((prev) => !prev)}
                    className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>{simulatingProject ? 'Reset Trace' : 'Run Live Benchmark'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  {selectedProject.simulationLog.map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0.35 }}
                      animate={{
                        opacity: simulatingProject ? 1 : 0.75,
                        x: simulatingProject ? [0, 3, 0] : 0,
                      }}
                      transition={{ delay: i * 0.12 }}
                      className={
                        i === selectedProject.simulationLog.length - 1
                          ? 'text-red-400 font-semibold'
                          : 'text-zinc-300'
                      }
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800">
                <div className="text-xs font-mono text-zinc-400">
                  Stack: {selectedProject.stack.join(' · ')}
                </div>
                <button
                  onClick={() => {
                    const projectTitle = selectedProject.title;
                    setSelectedProject(null);
                    setContactSubject(`Architecture Inquiry: ${projectTitle}`);
                    setContactModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Request Full Case Study & Repo Access →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          INTERACTIVE MODAL 2: DIRECT CONTACT & DISPATCH
         ===================================================================== */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-red-500/50 shadow-[0_0_60px_rgba(225,29,72,0.3)] p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-red-500">
                    DIRECT CHANNEL · MATHANRAJ S
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Initiate Transmission
                  </h3>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                  aria-label="Close Contact Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {dispatchSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center mx-auto text-red-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    Transmission Logged
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Your inquiry regarding <span className="text-zinc-200">{contactSubject}</span> has been prepared for Mathanraj S (kit25cseamathanrajs@gmail.com).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Inquiry Track
                    </label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="Full-Stack AI Engineering Role">
                        Full-Stack AI Engineering Role
                      </option>
                      <option value="Hackathon / Multi-Agent R&D Collaboration">
                        Hackathon / Multi-Agent R&amp;D Collaboration
                      </option>
                      <option value="Enterprise Architecture Consulting">
                        Enterprise Architecture Consulting
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Name or Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSender}
                      onChange={(e) => setContactSender(e.target.value)}
                      placeholder="e.g. Sarah Chen · Principal Recruiter"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Project Brief or Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe the system, role, or engineering challenge..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(225,29,72,0.5)] transition-all cursor-pointer"
                  >
                    Send Transmission
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
