import { Icons } from "@/components/icons";
import { BookIcon, HomeIcon, NotebookIcon, WandSparklesIcon } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "Riyajath Ahamed",
  initials: "RJ",
  url: "https://riyajathahamed.lk",
  location: "Colombo, SL",
  locationLink: "https://www.google.com/maps/place/Colombo,+Sri+Lanka",
  description:
    "Welcome to my corner of the internet! Young Passionate Software Engineer turned Entrepreneur. I love building things and helping people.",
  summary:
    "I'm an experienced FRONT_END developer with a passion for design and a knack for tinkering. Web development is my playground,where I push boundaries and chase new horizons.",
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
    "Google Cloud",
    "Firebase",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/craftlab", icon: WandSparklesIcon, label: "Craft Lab" },
    { href: "/blog", icon: BookIcon, label: "Blog" },

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
        url: "https://medium.com/@riyajathahamed",
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
    
  ],
  education: [
    {
      school: "KDU",
      href: "https://kdu.ac.lk",
      degree: "Bsc (Hons)",
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
      href: "https://craftlab.riyajathahamed.lk",
      dates: "Jan 2023 - Present",
      active: true,
      description:
        "Beyond Childhood International is a nonpartisan development organisation that works to improve the lives of children and families in Sri Lanka. We are committed to creating a better future for all children, regardless of their background or circumstances.",
      technologies: [
        "React",
        "Typescript",
        "TailwindCSS",
        "GpraphQL",
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

  ],
} as const;
