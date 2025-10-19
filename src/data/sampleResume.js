import { v4 as uuidv4 } from "uuid";

export default {
  basics: {
    name: "John doe",
    label: "Full Stack Developer",
    email: "johndoe@gmail.com",
    phone: "+91 9257463982",
    website: "https://linkedin.com/in/userid0101",
    summary:
      "Passionate developer skilled in React, Node.js, and MongoDB with hands-on experience building modern web apps.",
  },
  sections: [
    {
      id: uuidv4(),
      title: "Work Experience",
      type: "work",
      items: [
        {
          id: uuidv4(),
          title: "Frontend Developer",
          company: "Zidio Technologies",
          startDate: "Apr 2025",
          endDate: "Jun 2025",
          summary:
            "Developed a MERN stack e-commerce web app with product management and admin analytics dashboard.",
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Projects",
      type: "projects",
      items: [
        {
          id: uuidv4(),
          title: "Excel Analytics Platform",
          summary:
            "Built an Excel-to-Chart analytics dashboard with user authentication and admin stats using React and Node.js.",
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Skills",
      type: "skills",
      items: [
        { id: uuidv4(), skill: "React.js" },
        { id: uuidv4(), skill: "Node.js" },
        { id: uuidv4(), skill: "MongoDB" },
        { id: uuidv4(), skill: "Tailwind CSS" },
      ],
    },
  ],
};