import {
    mobile,
    backend,
    creator,
    web,
    javascript,
 
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    musync,
    myweather,
    lightroomhouse,
    studentass,
   
    nextjs,
    postman,
    googlecloud,
    java,
    firebase,

  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
      description: "Build extremely responsive web apps with the latest and cutting edge technologies.",
    },
    {
      title: "App Developer",
      icon: mobile,
      description: "Develops well designed, user-friendly and interactive mobile apps for Android.",
    },
    {
      title: "Graphic Designer",
      icon: creator,
      description: "Understanding user empathy and creates designs that gives meaningful experiences.",
    },
    {
      title: "UI/UX Designer",
      icon: backend,
      description: "Understanding user empathy and creates designs that gives meaningful experiences.",
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Next JS",
      icon: nextjs,
    },
    {
      name: "Postman",
      icon: postman,
    },
    {
      name: "Google Cloud",
      icon: googlecloud,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "Firebase",
      icon: firebase,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  

  
  
  const projects = [
    {
      name: "MuSync",
      description:
        "Web-based music streaming service that captures the emotion and generate playlist.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: musync,
      source_code_link: "https://github.com/riyajath-ahamed/musync",
    },
    {
      name: "My Weather",
      description:
        "Web application that enable to find the current weather report of the location",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Rapid API",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: myweather,
      source_code_link: "https://github.com/riyajath-ahamed/myweather",
    },
    {
      name: "Student Assist",
      description:
        "A mobile application that enable to assist the students in a university act as social media platform for students.",
      tags: [
        {
          name: "React Native",
          color: "blue-text-gradient",
        },
        {
          name: "Node Js",
          color: "green-text-gradient",
        },
        {
          name: "Firebase",
          color: "pink-text-gradient",
        },
      ],
      image: studentass,
      source_code_link: "https://github.com/riyajath-ahamed/student-assist",
    },
    {
      name: "Lightroom House",
      description:
        "Web application that enable to download Lightroom presets for free",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "Sanity",
          color: "green-text-gradient",
        },
        {
          name: "Vercel",
          color: "pink-text-gradient",
        },
      ],
      image: lightroomhouse,
      source_code_link: "https://github.com/riyajath-ahamed/lightroomhouse",
    },
  ];
  
  export { services, technologies, projects };