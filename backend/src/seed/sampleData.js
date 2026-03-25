const projects = [
  {
    title: 'Apex Commerce Platform',
    description:
      'Enterprise-grade ecommerce suite with analytics, inventory automation, and regional payment integrations.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveDemo: 'https://example.com/apex-commerce',
    github: 'https://github.com/example/apex-commerce',
    featured: true,
    order: 1,
  },
  {
    title: 'NavyBank Dashboard',
    description:
      'Secure fintech operations dashboard with role-based controls, audit trails, and real-time portfolio insights.',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Chart.js'],
    liveDemo: 'https://example.com/navybank',
    github: 'https://github.com/example/navybank-dashboard',
    featured: true,
    order: 2,
  },
  {
    title: 'DevSprint Collaboration Hub',
    description:
      'Team delivery workspace for sprint planning, issue tracking, and engineering workflow visibility.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    category: 'SaaS',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    liveDemo: 'https://example.com/devsprint',
    github: 'https://github.com/example/devsprint',
    featured: true,
    order: 3,
  },
  {
    title: 'Pulse Healthcare Portal',
    description:
      'Patient-first web experience with appointment workflows, records overview, and accessibility-first interface.',
    image:
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Application',
    techStack: ['React', 'Express', 'MongoDB'],
    liveDemo: 'https://example.com/pulse-healthcare',
    github: 'https://github.com/example/pulse-healthcare',
    featured: false,
    order: 4,
  },
]

const services = [
  {
    title: 'Web Design',
    description:
      'Designing modern, conversion-focused interfaces with clear hierarchy and premium visual language.',
    icon: 'layout',
    order: 1,
  },
  {
    title: 'Frontend Dev',
    description:
      'Building robust React interfaces with reusable systems, motion, and accessibility baked in.',
    icon: 'monitor',
    order: 2,
  },
  {
    title: 'Full Stack',
    description:
      'Delivering scalable web applications from API architecture to polished production deployment.',
    icon: 'server',
    order: 3,
  },
  {
    title: 'UI/UX Strategy',
    description:
      'Aligning product goals, user journeys, and engineering execution for measurable outcomes.',
    icon: 'sparkles',
    order: 4,
  },
]

const skills = [
  { name: 'TypeScript', level: 92, category: 'Language', highlight: true, order: 1 },
  { name: 'React / Next.js', level: 95, category: 'Frontend', highlight: true, order: 2 },
  { name: 'Tailwind CSS', level: 94, category: 'Styling', highlight: true, order: 3 },
  { name: 'Node.js', level: 90, category: 'Backend', highlight: true, order: 4 },
  { name: 'MongoDB', level: 88, category: 'Database', highlight: false, order: 5 },
]

const testimonials = [
  {
    quote:
      'Shirwac transformed our fragmented product into a structured digital platform. The execution quality and communication were exceptional.',
    clientName: 'Amina Hassan',
    role: 'Product Manager',
    company: 'Nexa Labs',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    order: 1,
  },
  {
    quote:
      'From architecture decisions to frontend polish, every layer felt intentional. We launched faster than planned with fewer regressions.',
    clientName: 'Daniel Mwangi',
    role: 'CTO',
    company: 'Orbit Systems',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    order: 2,
  },
]

const experience = [
  {
    role: 'Software Engineer',
    company: 'BluePeak Technologies',
    year: '2024 - Present',
    description:
      'Leading architecture for high-traffic client platforms, improving reliability and accelerating delivery velocity across teams.',
    order: 1,
  },
  {
    role: 'Full Stack Developer',
    company: 'Nexa Labs',
    year: '2022 - 2024',
    description:
      'Built and scaled full product cycles, from UX prototypes to API design, deployment automation, and production observability.',
    order: 2,
  },
  {
    role: 'UI/UX Engineer',
    company: 'Studio Vertex',
    year: '2020 - 2022',
    description:
      'Crafted premium design systems and translated complex user journeys into elegant, maintainable frontend implementations.',
    order: 3,
  },
]

const settings = {
  brandName: 'Shirwac Dev',
  adminEmail: 'shirwac.dev@gmail.com',
  timezone: 'Africa/Nairobi',
  dashboardGreeting: 'Welcome back, Shirwac.',
  itemsPerPage: 12,
  notificationsEnabled: true,
}

module.exports = {
  projects,
  services,
  skills,
  testimonials,
  experience,
  settings,
}
