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
    name: "The Wetland Shop",
    photos: ["imgs/wet1.png", "imgs/wet2.png"],
    description: "A full-stack e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, and secure payment processing. The application demonstrates modern web development practices with responsive design and optimized performance.",
    language_used: ["JS", "RCT", "NODE"],
    project_type: "E-commerce Platform",
    client_name: "The Wetland Shop"
  },
  {
    id: 2,
    name: "Novellum Portfolio",
    photos: ["imgs/nov1.png", "imgs/nov2.png"],
    description: "A creative portfolio website showcasing projects and skills. Built with React and featuring smooth animations, interactive components, and a modern design aesthetic. Demonstrates proficiency in front-end development and UI/UX design.",
    language_used: ["JS", "RCT"],
    project_type: "Portfolio Website",
    client_name: "Personal Project"
  },
  {
    id: 3,
    name: "Flow Maestro",
    photos: ["imgs/Screenshot 2025-11-04 at 09.35.46.png"],
    description: "A workflow management application designed to streamline team collaboration. Features real-time updates, task tracking, and intuitive project organization. Built with React for the frontend and Node.js for the backend.",
    language_used: ["JS", "RCT", "NODE"],
    project_type: "Workflow Management",
    client_name: "Team Project"
  },
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
