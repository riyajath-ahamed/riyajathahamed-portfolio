import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, WandSparklesIcon } from "lucide-react";

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
      image: "",
      video:
        "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/IMG_0419.MP4 ",
    },
  ]
} as const;
