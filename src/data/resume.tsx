import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Riyajath Ahamed",
  initials: "RJ",
  url: "https://riyajathahamed.lk",
  location: "Colombo, SL",
  locationLink: "https://www.google.com/maps/place/Colombo,+Sri+Lanka",
  description:
    "Welcome to my corner of the internet! Young Passionate Software Engineer turned Entrepreneur. I love building things and helping people.",
  summary:
    "I'm an experienced front-end developer with a passion for design and a knack for tinkering. Web development is my playground,where I push boundaries and chase new horizons.",
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
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "Firebase",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
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
      email: {
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
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
