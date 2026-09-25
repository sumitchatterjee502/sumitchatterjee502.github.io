export const siteConfig = {
  name: "Sumit Chatterjee",
  title: "Experienced IT Lead & Senior Software Engineer",
  location: "Kolkata, India",
  tagline:
    "Building scalable systems that serve millions of users — from insurance platforms to fintech infrastructure. I lead teams, architect solutions, and ship products that create measurable business impact.",
  eyebrow: "Engineering Leader · Full-Stack Architect",
  email: "sumitchatterjee502@gmail.com",
  phone: "+91-9163808896",
  linkedin: "https://www.linkedin.com/in/sumit-chatterjee-13ab3299/",
  github: "https://github.com/sumitchatterjee502",
  website: "https://sumitchatterjee502.github.io/",
  analyticsId: "G-N6TPBYV0K8",
  /**
   * GitHub Pages is static — no server unless you deploy contact-api (Render/Vercel).
   * - `auto`: use API when /health OK, else FormSubmit to `email` (works on Pages).
   * - `api`: Render/Vercel only.
   * - `formsubmit`: FormSubmit only (no Render required).
   */
  contactDelivery: "auto" as "auto" | "api" | "formsubmit",
  contactApiUrl: "https://portfolio-contact-api.onrender.com",
} as const;

export const heroBackgroundImage = "/hero-tech-hardware-bg.png";

export const contactBackgroundImage = "/hero-world-map-tech-bg.jpg";

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroStats = [
  { value: "9+", label: "Years Experience" },
  { value: "1M+", label: "Daily Requests Handled" },
  { value: "40%", label: "Processing Time Reduced" },
  { value: "99.9%", label: "System Uptime Achieved" },
] as const;

export const aboutContent = {
  paragraphs: [
    "I'm a results-oriented Team Lead and Senior Software Engineer with over 9 years of experience designing, building, and scaling production systems across insurance, fintech, banking, and IoT domains.",
    "My engineering career spans the full stack — from architecting high-availability RESTful microservices handling 1M+ daily requests to building intuitive frontends that drive user engagement. I've led cross-functional teams at Indus Net Technologies and Digital Aptech, delivering complex platforms on time and at scale.",
    "Beyond code, I care deeply about team culture, technical standards, and mentorship. I believe the best software comes from empowered engineers with clear goals and strong foundations — which is why I invest as much in people as I do in architecture.",
    "When I'm not leading delivery, I'm exploring new patterns in microservices design, real-time systems, and developer tooling.",
  ],
  strengths: [
    {
      title: "System Architecture",
      description:
        "Microservices, RESTful APIs, high-availability infrastructure design",
    },
    {
      title: "Team Leadership",
      description:
        "Cross-functional team management, mentoring, and delivery coordination",
    },
    {
      title: "Performance Engineering",
      description:
        "Query optimization, caching strategies, and load balancing",
    },
    {
      title: "Integrations",
      description:
        "Payment gateways, OCR, IoT protocols, third-party APIs",
    },
    {
      title: "DevOps & CI/CD",
      description:
        "Automated pipelines, Docker containers, Azure deployments",
    },
    {
      title: "Security & Compliance",
      description:
        "PCI DSS, KYC/AML compliance, TOTP/OIDC authentication",
    },
  ],
  education: {
    degree: "Bachelor's Degree",
    institution: "West Bengal State University (WBSU)",
    period: "June 2009 — August 2012",
  },
  certifications: [
    {
      name: "Internet Technology & Web Design",
      issuer: "NIELIT",
      id: "ID: 8901FC8E895B2A07",
    },
    {
      name: "React.js Developer",
      issuer: "HackerRank",
      id: "ID: 69A7EBB9008E",
    },
    {
      name: "JavaScript",
      issuer: "Udemy",
      id: "ID: UC-4a92d1a1-ae57-4b5b",
    },
    {
      name: "PHP Development",
      issuer: "Ejobindia",
      id: "Certified Professional",
    },
  ],
} as const;

export const skillGroups = [
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "C#",
      ".NET Core",
      "Strapi",
      "Medusa.js",
      "PHP",
      "Laravel",
      "Lumen",
      "CodeIgniter",
      "Python Django",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "jQuery",
      "Ajax",
      "HTML5",
      "Tailwind CSS",
      "Bootstrap",
      "Smarty",
    ],
  },
  {
    title: "Databases",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma ORM",
      "TypeORM",
      "BullMQ",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "Docker",
      "CI/CD",
      "Azure",
      "AWS",
      "Git",
      "Pusher",
      "Socket.io",
      "WebSocket",
    ],
  },
  {
    title: "Protocols & IoT",
    skills: [
      "MQTT",
      "REST API",
      "TOTP",
      "OIDC",
      "IoT Devices",
      "WebSocket",
    ],
  },
  {
    title: "Payments & Services",
    skills: [
      "Razorpay",
      "AEPS",
      "BBPS",
      "IRIS",
      "Paytm",
      "Stripe",
      "Google Vision OCR",
      "Google Maps API",
      "WordPress",
    ],
  },
  {
    title: "Leadership",
    skills: [
      "Team Management",
      "Project Leadership",
      "Agile / Scrum",
      "Technical Mentoring",
      "Code Review",
      "Architecture Design",
    ],
  },
] as const;

export type ProjectCategory =
  | "All"
  | "Fintech"
  | "Enterprise"
  | "Insurance"
  | "Banking"
  | "IoT"
  | "Recruitment"
  | "Manufacturing"
  | "Events";

export interface Project {
  id: string;
  category: Exclude<ProjectCategory, "All">;
  title: string;
  role: string;
  description: string;
  result: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "indigo-kiosk",
    category: "Fintech",
    featured: true,
    title: "Indigo Kiosk Admin Portal",
    role: "Team Lead / Full-Stack Developer",
    description:
      "Centralized management platform for monitoring and administering payment kiosks, transactions, users, configurations, and operational activities across the kiosk network.",
    result:
      "Designed and developed the admin portal with secure REST APIs, transaction monitoring, user and role management, kiosk configuration, reporting, and operational workflows.",
    technologies: [
      "React.js",
      "Node.js",
      "REST API",
      "MongoDB",
      "Redis",
      "Socket.io",
      "Azure",
    ],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "lens-manufacturing",
    category: "Manufacturing",
    title: "Lens Manufacturing Platform",
    role: "Project Manager / Team Lead",
    description:
      "Web-based lens manufacturing and operations platform for production workflows, order processing, inventory management, and operational activities.",
    result:
      "Built with NestJS and Next.js, MySQL for structured data, and Redis for caching. Scalable REST APIs and business modules for efficient production processes.",
    technologies: [
      "NestJS",
      "Next.js",
      "Node.js",
      "REST API",
      "MySQL",
      "Redis",
      "TypeScript",
    ],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "sis",
    category: "Enterprise",
    featured: true,
    title: "SIS",
    role: "Team Lead / Full-Stack Developer / Project Manager",
    description:
      "Scalable enterprise platform with microservices architecture — Mobile App API, Client Portal, and Operation Portal for field operations and client workflows.",
    result:
      "Cloud-native platform using .NET microservices, MSSQL, and Next.js portals. Deployed on Azure with CI/CD pipelines for automated build and release.",
    technologies: [
      ".NET",
      "Microservices",
      "Next.js",
      "REST API",
      "MSSQL",
      "Azure",
      "CI/CD",
      "Docker",
    ],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "stafingo-website",
    category: "Recruitment",
    title: "StafinGo Website",
    role: "Full-Stack Developer / Team Lead",
    description:
      "Recruitment and workforce solutions platform connecting job seekers with career opportunities and businesses with qualified talent.",
    result:
      "Scalable recruitment website with candidate engagement, job discovery, content management, and streamlined application workflows.",
    technologies: [
      "Laravel",
      "Vue.js",
      "MySQL",
      "REST API",
      "JavaScript",
      "AWS",
    ],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "stafingo-crm",
    category: "Recruitment",
    title: "StafinGo CRM",
    role: "Full-Stack Developer / Team Lead",
    description:
      "Internal recruitment management platform for candidate management, job management, and recruitment workflows with role-based access.",
    result:
      "Centralized CRM to streamline recruitment operations, improve data management, and provide structured workflows for candidates, jobs, and clients.",
    technologies: ["Laravel", "Vue.js", "MySQL", "REST API", "RBAC", "Redis", "AWS"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "veneka",
    category: "Fintech",
    title: "Veneka",
    role: "Team Lead",
    description:
      "Payment orchestration platform integrating financial institutions with core banking systems, card networks, digital wallet rails, and open banking APIs. PCI-certified, hosted on Azure.",
    result:
      "Fully managed SaaS solution on Microsoft Azure with secure, highly available, and scalable infrastructure for African market compliance.",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Angular",
      ".NET",
      "MSSQL",
      "Stripe",
      "Azure",
      "Redis",
    ],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "senditto",
    category: "Fintech",
    featured: true,
    title: "Senditto",
    role: "Team Lead",
    description:
      "Secure international money transfer platform with real-time transaction processing, multi-currency support, KYC/AML compliance, and fraud detection.",
    result:
      "Sub-3s transfer processing · 99.9% transaction success rate · PCI DSS compliant · Containerized microservices with Redis caching.",
    technologies: ["React.js", "Node.js", "MongoDB", "Stripe", "AWS", "Redis", "Socket.io"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "unation",
    category: "Events",
    title: "UNATION",
    role: "Team Lead",
    description:
      "Local events discovery and ticketing platform with geolocation-based discovery, Stripe payments, and real-time management dashboard.",
    result:
      "45% increase in local event participation · Real-time attendee management · AWS microservices deployment.",
    technologies: ["React.js", "Node.js", "Stripe", "Google Maps", "Pusher", "AWS"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "ageas-federal",
    category: "Insurance",
    title: "Ageas Federal Life Insurance Portals",
    role: "Team Lead",
    description:
      "Customer and renewal portals for a leading life insurance company with secure TOTP/OIDC authentication and full-stack PHP/React architecture.",
    result:
      "30% increase in user engagement · Improved agent experience · Scalable renewal pipeline.",
    technologies: ["React", "PHP Laravel", "Next.js", "MySQL", "TOTP/OIDC", "Drupal"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "sbi-general",
    category: "Insurance",
    title: "SBI General — Rural Portals",
    role: "Team Lead",
    description:
      "Motor and health policy purchase portals designed for rural India with navigation simplicity and accessibility focus.",
    result:
      "25% reduction in navigation complexity · Expanded rural insurance reach · Redis-cached performance.",
    technologies: ["React", "PHP Laravel", "Node.js", "MySQL", "Redis"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "aeps-iris",
    category: "Banking",
    title: "AEPS & IRIS Banking System",
    role: "Senior Developer",
    description:
      "Video KYC solution integrated with Aadhaar authentication for biometric verification and digital onboarding in rural banking.",
    result:
      "40% reduction in onboarding time · Aadhaar integration · Real-time Pusher-based status updates.",
    technologies: ["React", "PHP Laravel", "IoT", "Pusher", "WebSocket", "MySQL"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "esim-erp",
    category: "IoT",
    title: "E-SIM Management ERP",
    role: "Senior Developer",
    description:
      "IoT-based ERP platform for eSIM lifecycle management with multi-protocol communication across embedded SIM hardware and web interfaces.",
    result:
      "Multi-protocol IoT integration · Real-time device monitoring · Scalable ERP architecture.",
    technologies: ["React", "CodeIgniter", "MQTT", "Medusa.js", "Python", "WebSocket"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "water-level",
    category: "IoT",
    title: "Smart Water Level Management",
    role: "Senior Developer",
    description:
      "Real-time water level monitoring using IoT sensors and MQTT protocol for proactive infrastructure management.",
    result:
      "Real-time sensor monitoring · MQTT-based alerts · Optimized resource allocation.",
    technologies: ["React", "Node.js", "MQTT", "Python", "MySQL", "Pusher"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
  {
    id: "weather-station",
    category: "IoT",
    title: "Advanced Weather Station",
    role: "Senior Developer",
    description:
      "Real-time weather forecasting with advanced sensors, MQTT protocol, and REST API for localized weather data.",
    result:
      "Real-time forecasting · MQTT + REST architecture · Scalable sensor network.",
    technologies: ["React", "Node.js", "MQTT", "Python", "WebSocket"],
    image: "[PLACEHOLDER]",
    liveUrl: "[PLACEHOLDER]",
    repoUrl: "[PLACEHOLDER]",
  },
];

export const experience = [
  {
    role: "Team Lead",
    company: "Digital Aptech Pvt. Ltd.",
    period: "July 2025 — Present",
    impact: ["40% faster processing", "60% fewer manual deployments", "99.9% uptime"],
    achievements: [
      "Delivering core insurance applications using PHP, React.js, Node.js, Medusa.js, and Tailwind CSS — enhancing claim processing and renewal system efficiency at scale.",
      "Integrated Razorpay & Paytm payment gateways and Google Vision OCR services, achieving a 40% reduction in processing time and improved customer experience.",
      "Built scalable RESTful APIs with Lumen, Express.js, and Strapi supporting infrastructure handling 1M+ daily requests at 99.9% uptime.",
      "Implemented automated CI/CD pipelines that reduced manual deployments by 60%, accelerating release cycles and minimizing production risk.",
      "Mentoring development teams, establishing technical standards, and driving continuous improvement across all project phases.",
    ],
    technologies: [
      "PHP",
      "React.js",
      "Node.js",
      "Medusa.js",
      "Tailwind",
      "Lumen",
      "Express.js",
      "CI/CD",
      "Docker",
    ],
  },
  {
    role: "Team Lead",
    company: "Indus Net Technologies",
    period: "April 2022 — June 2025",
    impact: ["1M+ daily requests", "40% processing reduction", "Disaster recovery implemented"],
    achievements: [
      "Spearheaded design and implementation of core insurance applications across PHP, React.js, Node.js, and Medusa.js — driving efficiency in claim and renewal processes.",
      "Architected RESTful web services with Lumen, Express.js, and Strapi supporting high-availability systems managing over 1M daily requests.",
      "Introduced disaster recovery mechanisms securing 99.9% system uptime for production environments.",
      "Orchestrated third-party integrations including Razorpay, Paytm, and Google Vision OCR — cutting processing time by 40%.",
      "Developed CI/CD pipelines, automating deployment and reducing manual intervention by 60%.",
    ],
    technologies: [
      "PHP",
      "React.js",
      "Node.js",
      "MySQL",
      "Redis",
      "Next.js",
      "Strapi",
      "CI/CD",
    ],
  },
  {
    role: "Senior Web Developer",
    company: "Paythrough Software Solution Pvt. Ltd.",
    period: "Feb 2020 — Mar 2022",
    impact: ["30% transaction success increase", "AEPS & BBPS systems"],
    achievements: [
      "Designed and deployed custom AEPS and BBPS banking systems to streamline Aadhaar-based payments and video KYC processes.",
      "Built modular, scalable banking solutions using PHP Laravel, React.js, Node.js, and Python Django.",
      "Enhanced transaction success rates by 30% through load testing, database schema refinement, and optimized caching strategies.",
    ],
    technologies: ["PHP Laravel", "React.js", "Node.js", "Python Django", "MySQL"],
  },
  {
    role: "Junior Developer",
    company: "Iotivity Communication Pvt. Ltd.",
    period: "Jan 2018 — Jan 2020",
    impact: [] as string[],
    achievements: [
      "Engineered IoT-enabled platforms including an embedded SIM management system and vehicle tracking system.",
      "Developed and deployed REST APIs enabling communication between IoT devices and web applications.",
      "Collaborated with cross-functional teams to deliver user-centric IoT solutions.",
    ],
    technologies: ["React", "Node.js", "MQTT", "PHP CodeIgniter", "Python", "WebSocket"],
  },
];

export type ServiceCategory =
  | "All"
  | "Development"
  | "Integration"
  | "Infrastructure"
  | "Consulting";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: Exclude<ServiceCategory, "All">;
  capabilities: string[];
  technologies: string[];
  featured?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  "All",
  "Development",
  "Integration",
  "Infrastructure",
  "Consulting",
];

export const engagementProcess = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand goals, constraints, users, and success metrics.",
  },
  {
    step: "02",
    title: "Architecture",
    description: "Define system design, tech stack, milestones, and delivery plan.",
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative development with reviews, demos, and quality gates.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "CI/CD setup, cloud deployment, monitoring, and handover.",
  },
  {
    step: "05",
    title: "Support",
    description: "Post-launch optimization, scaling guidance, and iteration.",
  },
] as const;

export const services: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Bespoke web and enterprise applications built around your business logic — from greenfield MVPs to production platforms handling millions of requests across insurance, fintech, banking, and IoT.",
    category: "Development",
    featured: true,
    capabilities: [
      "Domain-specific platform engineering",
      "Admin portals, client dashboards & operational tools",
      "Microservices and modular monolith architectures",
      "Role-based access, workflows & business rule engines",
      "MVP scoping through production hardening",
      "Team-led delivery with clear milestones",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PHP",
      "Laravel",
      ".NET",
      "TypeScript",
    ],
  },
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    description:
      "End-to-end application development with React, Next.js, Node.js, and PHP — from architecture to production deployment.",
    category: "Development",
    capabilities: [
      "Frontend + backend ownership",
      "Responsive, accessible UI implementation",
      "Production-ready deployment pipelines",
    ],
    technologies: ["React", "Next.js", "Node.js", "PHP", "Tailwind CSS"],
  },
  {
    id: "nextjs",
    title: "Next.js Application Development",
    description:
      "Modern, performant web applications with server-side rendering patterns, static export, and optimized user experiences.",
    category: "Development",
    capabilities: [
      "App Router & static export setups",
      "Performance and SEO optimization",
      "Component-driven UI architecture",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "api-integration",
    title: "API Development & Integration",
    description:
      "RESTful microservices, third-party integrations (payments, OCR, maps), and real-time systems with WebSocket and MQTT.",
    category: "Integration",
    capabilities: [
      "REST API design & documentation",
      "Payment gateway & OCR integrations",
      "Real-time event systems",
    ],
    technologies: ["Node.js", "Express.js", "Strapi", "Socket.io", "MQTT"],
  },
  {
    id: "backend",
    title: "Backend System Development",
    description:
      "Scalable backend architectures with Node.js, NestJS, Laravel, and .NET — designed for high availability and 1M+ daily requests.",
    category: "Development",
    capabilities: [
      "High-availability service design",
      "Authentication & authorization layers",
      "Queue, cache & background job systems",
    ],
    technologies: ["Node.js", "NestJS", "Laravel", ".NET", "Redis", "BullMQ"],
  },
  {
    id: "database",
    title: "Database Design",
    description:
      "Schema design, query optimization, caching strategies with Redis, and data layer architecture for MySQL, PostgreSQL, and MongoDB.",
    category: "Infrastructure",
    capabilities: [
      "Relational & document schema design",
      "Query tuning & indexing strategy",
      "Caching and data access patterns",
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    id: "modernization",
    title: "Application Modernization",
    description:
      "Legacy system migration, CI/CD pipeline implementation, containerization with Docker, and cloud deployment on Azure and AWS.",
    category: "Infrastructure",
    capabilities: [
      "Legacy codebase assessment",
      "Incremental migration planning",
      "Docker & cloud deployment",
    ],
    technologies: ["Docker", "CI/CD", "Azure", "AWS", "Git"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description:
      "Architecture reviews, team mentoring, technical standards establishment, and delivery coordination for complex platforms.",
    category: "Consulting",
    capabilities: [
      "Architecture & code review",
      "Team mentoring & standards",
      "Delivery planning & risk reduction",
    ],
    technologies: ["Microservices", "Agile", "CI/CD", "Cloud"],
  },
];

export const featuredService = services.find((service) => service.featured)!;

export const projectCategories: ProjectCategory[] = [
  "All",
  "Fintech",
  "Enterprise",
  "Insurance",
  "Banking",
  "IoT",
  "Recruitment",
  "Manufacturing",
  "Events",
];

export const projectPortfolioStats = {
  totalProjects: projects.length,
  domainCount: projectCategories.length - 1,
  featuredCount: projects.filter((project) => project.featured).length,
} as const;
