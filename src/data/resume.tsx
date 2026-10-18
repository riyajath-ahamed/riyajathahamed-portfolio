import { Icons } from "@/components/icons";
import { FEATURE_FLAGS } from "@/lib/flags";
import { BookIcon, HomeIcon, NotebookIcon, PencilRulerIcon, WandSparklesIcon } from "lucide-react";

export const DATA = {
  name: "Riyajath Ahamed",
  initials: "RJ",
  url: "https://riyajathahamed.netlify.app/",
  location: "Colombo, SL",
  locationLink: "https://www.google.com/maps/place/Colombo,+Sri+Lanka",
  timezone: "Asia/Colombo",
  description:
    "Builds scalable B2B and B2C products, combining product engineering, data-driven systems, and AI to turn complex problems into intuitive experiences.",
  summary:
    "I’m a software engineer with a passion for product engineering, thoughtful design, and a knack for tinkering. I work at the intersection of product, design, and engineering, building experiences that scale, perform, and feel intentional. From design-system-driven UI architecture to data-intensive visualizations, I see interfaces as more than a layer of the application, they’re product-defining systems that shape how people interact with software. I care about what happens beneath the surface, too: the architecture, performance, and engineering decisions that keep products reliable under real load, with real data and real users. Beyond product work, I build developer tools, explore AI-powered applications, and experiment with new ways to make software development more capable, efficient, and expressive.",
  summaryTldr:
    "I build at the intersection of product, design, and engineering interfaces that scale, the systems under them, and the tools and AI experiments around them.",
  avatarUrl: "https://avatars.githubusercontent.com/u/64283797?v=4",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Go",
    "GraphQL",
    "React Native",
    "Docker",
    "Redux",
    "Postgres",
    "Kubernetes",
    "AWS",
    "GCP",
    "Firebase",
    "Terraform",
    "MCP",
    "AI",
    "LLM"
  ],
  navbar: [
    { href: "/casestudies", icon: PencilRulerIcon, label: "Design Engineering" },
    { href: "/blog", icon: BookIcon, label: "Blog" },
    { href: "/bookmarks", icon: WandSparklesIcon, label: "Inspiration" },
  ],
  games: [
    {
      href: "/drawCircle",
      slug: "drawCircle",
      title: "Draw Circle",
      description: "Draw a circle freehand and see how close you get.",
    },
    {
      href: "/colorMemo",
      slug: "colorMemo",
      title: "Color Memo",
      description: "A color flashes. Recreate it from memory.",
    },
    {
      href: "/CityRise",
      slug: "cityRise",
      title: "CityRise",
      description: "Grow a city from a farm to a skyline.",
      flag: FEATURE_FLAGS.NEW_GAME,
    },
  ],
  contact: {
    email: "riyajatha@gmail.com",
    tel: "+94779794993",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/riyajath-ahamed",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ahamedriyajath/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ARiyajath",
        icon: Icons.x,

        navbar: true,
      },
      Medium: {
        name: "Medium",
        url: "https://medium.com/@riyajatha",
        icon: Icons.medium,

        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:riyajatha@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Octobus BI",
      href: "https://octobusbi.com",
      badges: [],
      location: "Colombo, SL",
      title: "Associate Software Engineer",
      logoUrl: "/octopusbilogo.jpg",
      start: "May 2023",
      end: "Present",
      description:
        " ",
    },
    {
      company: "Qoria",
      href: "https://qoria.com",
      badges: [],
      location: "Colombo, SL",
      title: "Software Engineer",
      logoUrl: "/qorialogo.jpg",
      start: " 2025 July",
      end: "Present",
      description:
        "Qoria is a global technology company, dedicated to keeping children safe and well in their digital lives.",
    }
    
  ],
  education: [
    {
      school: "KDU",
      href: "https://kdu.ac.lk",
      degree: "BSc (Hons)",
      logoUrl: "/kdu.png",
      start: "2020",
      end: "2023",
    },
    
  ],
  projects: [
    {
      title: "MuSync",
      href: "https://musyncs.vercel.app/login",
      dates: "Jan 2023 - Nov 2023",
      active: true,
      description:
        "Music Streaming Application with Emotion recognition and Playlist generation using Image Processing. designed to enhance the user's listening experience by analyzing their emotions through facial expressions and creating a customized playlist to match their mood. The system utilizes a camera to capture the user's facial expressions and an Image Processing algorithm to analyze those expressions to determine the user's current emotional state.",
      technologies: [
        "React",
        "Javascript",
        "MongoDB",
        "FireBase",
        "TailwindCSS",
        "TensorFlow",
        "Docker",
        "Heroku",
        "NodeJs"
      ],
      links: [
        {
          type: "Website",
          href: "https://musyncs.vercel.app/login",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/musync",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/capture3598.PNG",
      video:
        "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/IMG_0419.MP4 ",
    },
    {
      title: "Beyond Childhood Int",
      href: "https://dev-beyondchildhoodinternational.netlify.app/",
      dates: "Jan 2023 - Present",
      active: true,
      description:
        "Beyond Childhood International is a nonpartisan development organisation that works to improve the lives of children and families in Sri Lanka. We are committed to creating a better future for all children, regardless of their background or circumstances.",
      technologies: [
        "React",
        "Typescript",
        "TailwindCSS",
        "GraphQL",
        "Netlify",
        "HashNode"
      ],
      links: [
        {
          type: "Dev - Website",
          href: "https://dev-beyondchildhoodinternational.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/cbi-frontend",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/Capture.PNG",
    },
    {
      title: "Genso CLI",
      href: "https://www.npmjs.com/package/genso-boilerplate",
      dates: "Jan 2023 - Present",
      active: true,
      description:
        "Genso CLI is a React boilerplate designed to simplify development by providing a pre-configured setup",
      technologies: [
        "JavaScript",
        "React",
        "TailwindCSS",
        "NPM",
        "Node.js",
        "GitHub Actions",
      ],
      links: [
        {
          type: "NPM",
          href: "https://www.npmjs.com/package/genso-boilerplate",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/genso-boilerplate",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/Capture%20335.PNG",
    },
    {
      title: "FOSS KDU",
      href: "https://foss-kdu.github.io/fosskdu_web/",
      dates: "Jan 2023 - Jan 2023",
      active: true,
      description:
        "FOSS KDU is a student-led organization at KDU that promotes Free and Open Source Software (FOSS) among students. The website serves as a platform to share information about the organization, its events, and its projects.",
      technologies: [
        "JavaScript",
        "React",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://foss-kdu.github.io/fosskdu_web/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/Foss-kdu/fosskdu_web",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/Foss01.PNG",
    },
     {
      title: "mcp-gateway",
      href: "https://github.com/riyajath-ahamed/mcp-gateway",
      dates: "Jan 2023 - Jan 2023",
      active: true,
      description:
        "Gateway AI agent tool layer. A single Go binary that proxies N MCP servers behind a unified Streamable HTTP endpoint-with capability aggregation, health checks, circuit breakers, pluggable auth, and full observability. ",
      technologies: [
        "Go",
        "NPM",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/mcp-gateway",
          icon: <Icons.github className="size-3" />,
        }
      ],
    },
    {
      title: "react-unique-id-generator",
      href: "https://github.com/riyajath-ahamed/react-unique-id-generator",
      dates: "Jan 2023 - Jan 2023",
      active: true,
      description:
        "A lightweight, flexible library for generating unique IDs in React applications. Perfect for form elements, accessibility attributes, and any scenario where you need guaranteed unique identifiers.",
      technologies: [
        "TypeScript",
        "NPM",
        "React"
      ],
      links: [
        {
          type: "Website",
          href: "https://riyajath-ahamed.github.io/react-unique-id-generator/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/react-unique-id-generator",
          icon: <Icons.github className="size-3" />,
        }
      ],
    },
    {
      title: "mcp-schema-validator",
      href: "https://github.com/riyajath-ahamed/mcp-schema-validator",
      dates: "Jan 2023 - Jan 2023",
      active: true,
      description:
        "Runtime schema validation middleware for MCP tool inputs and outputs.",
      technologies: [
        "TypeScript",
        "MCP"
      ],
      links: [
        {
          type: "mcp-schema-validator-ui",
          href: "https://github.com/riyajath-ahamed/mcp-schema-validator-ui",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/mcp-schema-validator",
          icon: <Icons.github className="size-3" />,
        }
      ],
    },
     {
      title: "vite-plugin-bundler",
      href: "https://github.com/riyajath-ahamed/vite-plugin-bundler",
      dates: "Jan 2023 - Jan 2023",
      active: true,
      description:
        "A high-performance Vite plugin that compresses build assets using Brotli, Gzip, and Zstandard (zstd), reducing bundle sizes by up to 80% and improving loading times.",
      technologies: [
        "TypeScript",
        "NPM",
        "Vite"
      ],
      links: [
        {
          type: "NPM",
          href: "https://www.npmjs.com/package/vite-plugin-bundler/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/riyajath-ahamed/vite-plugin-bundler",
          icon: <Icons.github className="size-3" />,
        }
      ],
    },
  ],
  chartData: {
    radar: {
      indicator: [
        { name: 'React / TypeScript', max: 1000 },
        { name: 'UI/UX Design', max: 1000 },
        { name: 'Design Systems', max: 1000 },
        { name: 'Performance Optimi', max: 1000 }, //Performance Optimization
        { name: 'Problem Solving', max: 1000 },
        { name: 'Collaboration/Commun', max: 1000 }, // Collaboration / Communication
        { name: 'API Integration', max: 1000 },
        { name: 'Data Visualization', max: 1000 }
      ],
      axisName: {
        color: '#737373',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'monospace',
        width: 1,
        overflow: "break",
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [900, 850, 950, 800, 750, 850, 900, 700],
            name: 'Skill Level'
          }
        ],
        itemStyle: {
          color: '#adff2f'
        },
        lineStyle: {
          color: '#adff2f'
        }
      }
    ]
  }
} as const;
