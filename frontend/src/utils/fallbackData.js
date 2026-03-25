export const FALLBACK_SERVICES = [
  {
    _id: 'service-1',
    title: 'Web Design',
    description:
      'Designing conversion-focused digital products with modern visuals and clear user journeys.',
    order: 1,
  },
  {
    _id: 'service-2',
    title: 'Frontend Dev',
    description:
      'Building high-performance React interfaces with reusable components and polished interaction design.',
    order: 2,
  },
  {
    _id: 'service-3',
    title: 'Full Stack',
    description:
      'Delivering complete platforms from API architecture to deployment-ready frontend experiences.',
    order: 3,
  },
  {
    _id: 'service-4',
    title: 'UI/UX Strategy',
    description:
      'Aligning product strategy with practical implementation to improve usability and business impact.',
    order: 4,
  },
]

export const FALLBACK_SKILLS = [
  { _id: 'skill-1', name: 'TypeScript', level: 92, category: 'Language', order: 1 },
  { _id: 'skill-2', name: 'React / Next.js', level: 95, category: 'Frontend', order: 2 },
  { _id: 'skill-3', name: 'Tailwind CSS', level: 94, category: 'Styling', order: 3 },
  { _id: 'skill-4', name: 'Node.js', level: 90, category: 'Backend', order: 4 },
  { _id: 'skill-5', name: 'MongoDB', level: 88, category: 'Database', order: 5 },
]

export const FALLBACK_PROJECTS = [
  {
    _id: 'project-1',
    title: 'Apex Commerce Platform',
    description:
      'Enterprise-grade ecommerce platform built for scale, operational visibility, and modern checkout flow.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveDemo: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    _id: 'project-2',
    title: 'NavyBank Dashboard',
    description:
      'A premium dashboard interface for analytics, account management, and operational intelligence.',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend',
    techStack: ['TypeScript', 'React', 'Tailwind'],
    liveDemo: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    order: 2,
  },
  {
    _id: 'project-3',
    title: 'DevSprint Collaboration Hub',
    description:
      'Collaborative project workspace for engineering teams with sprint-level planning and tracking.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    category: 'SaaS',
    techStack: ['Next.js', 'Express', 'MongoDB'],
    liveDemo: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    order: 3,
  },
]

export const FALLBACK_TESTIMONIALS = [
  {
    _id: 'testimonial-1',
    quote:
      'Shirwac delivered a robust platform with clean architecture, polished UX, and clear communication from kickoff to launch.',
    clientName: 'Amina Hassan',
    role: 'Product Manager',
    company: 'Nexa Labs',
    rating: 5,
    order: 1,
  },
]

export const FALLBACK_EXPERIENCE = [
  {
    _id: 'experience-1',
    role: 'Software Engineer',
    company: 'BluePeak Technologies',
    year: '2024 - Present',
    description:
      'Leading product architecture and frontend delivery for high-growth digital platforms.',
    order: 1,
  },
  {
    _id: 'experience-2',
    role: 'Full Stack Developer',
    company: 'Nexa Labs',
    year: '2022 - 2024',
    description:
      'Designed and shipped full-stack products with API integrations, analytics, and deployment pipelines.',
    order: 2,
  },
  {
    _id: 'experience-3',
    role: 'UI/UX Engineer',
    company: 'Studio Vertex',
    year: '2020 - 2022',
    description:
      'Built scalable design systems and interaction patterns for SaaS and enterprise products.',
    order: 3,
  },
]
