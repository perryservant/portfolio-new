// Mock database for projects
export interface Project {
  id: number;
  name: string;
  photos: string[];
  description: string;
  language_used: string[];
  project_type: string;
  client_name: string;
}

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: 1,
    name: "FlowMaestro",
    photos: ["imgs/flow.png", "imgs/flow1.png", "imgs/flow2.png"],
    description: "A comprehensive AI workflow orchestration platform that enables users to build, deploy, and scale intelligent automations through a visual canvas interface. Features include drag-and-drop workflow builder with 20+ node types, autonomous AI agents with memory management and tool integration, durable execution powered by Temporal for fault-tolerant processing, real-time monitoring via WebSocket connections, and seamless integration with 50+ external services. Built with TypeScript, React, and Fastify, the platform supports multiple LLM providers (OpenAI, Anthropic, Google, Cohere) and includes knowledge base management with RAG capabilities for context-aware AI operations",
    language_used: ["TS", "RCT", "FSTFY"],
    project_type: "AI Workflow Platform",
    client_name: "Team Project"
  },
  {
    id: 2,
    name: "The Wetland Shop",
    photos: ["imgs/wet1.png", "imgs/wet2.png"],
    description: "A full-stack e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, and secure payment processing. The application demonstrates modern web development practices with responsive design and optimized performance.",
    language_used: ["JS", "RCT", "NODE"],
    project_type: "E-commerce Platform",
    client_name: "Covexco inc."
  },
  {
    id: 3,
    name: "Ovellum",
    photos: ["imgs/nov1.png", "imgs/nov2.png"],
    description: "A comprehensive backend-as-a-service platform designed to power modern business websites and operations. Provides a robust API infrastructure with user authentication, database management, file storage, and real-time capabilities. Features include RESTful and GraphQL API endpoints, role-based access control, automated data validation, webhook integrations, and scalable cloud infrastructure. Built with Node.js and PostgreSQL, Novellum enables businesses to rapidly deploy backend services without managing complex server infrastructure, allowing teams to focus on building exceptional frontend experiences and core business logic.",
    language_used: ["TS", "RCT", "FSTFY"],
    project_type: "Backend Platform",
    client_name: "Personal Project"
  },
  {
    id: 4,
    name: "Portfolio",
    photos: ["imgs/port.png", "imgs/port2.png"],
    description: "A modern, fully responsive portfolio web application showcasing professional work and technical expertise. Built with TypeScript and React, featuring smooth animations powered by Framer Motion, a floating profile card component with collapsible navigation, and an interactive scroll-based content system with snap scrolling. The design emphasizes clean typography, custom fonts, and a minimalist aesthetic with thoughtful micro-interactions. Features include a custom draggable navigation menu with smooth easing animations and touch support, terminal-style breadcrumb navigation, a dynamic projects showcase with hover effects, detailed project pages, responsive layouts optimized for all screen sizes, and a reusable component architecture. Styled entirely with Tailwind CSS for maintainability and performance. Deployed on GitHub Pages with optimized routing and loading states.",
    language_used: ["TS", "RCT"],
    project_type: "Webapp",
    client_name: "Personal Project"
  }
];

// Mock API service to simulate backend calls
export const mockApi = {
  // Simulate API delay
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    await mockApi.delay(300);
    return [...mockProjects];
  },

  // Get a single project by ID
  getProject: async (id: number): Promise<Project | null> => {
    await mockApi.delay(300);
    const project = mockProjects.find(p => p.id === Number(id));
    return project || null;
  },

  // Submit contact form (mock - just returns success message)
  submitContact: async (data: { name: string; email: string; request: string[] }): Promise<{ message: string; data: any }> => {
    await mockApi.delay(500);
    return {
      message: `Thanks ${data.name} for contacting me! I will get back to you ASAP!`,
      data: { ...data, id: Date.now() }
    };
  }
};
