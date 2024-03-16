import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const hello = {
  Javascript: [
    {
      subtopics: [
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content: "## Brief History of JavaScript\n\nJavaScript, o",
        },
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content: "## Brief History of JavaScript\n\nJavaScript, ",
        },
      ],
      name: "Brief History of JavaScript",
    },
    {
      subtopics: [
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content:
            "## Understanding the JavaScript Engine\n\nThe JavaScript Engine ",
        },
        {
          content:
            "## Understanding the JavaScript Engine\n\nThe JavaScript Engine ",
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
        },
      ],
      name: "Understanding the JavaScript Engine",
    },
    {
      subtopics: [
        {
          content: "## Setting up the Development Environment",
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
        },
        {
          content: "## Setting up the Development Environment",
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
        },
      ],
      name: "Setting up the Development Environment",
    },
  ],
  python: [
    {
      subtopics: [
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content: "## Brief History of JavaScript\n\nJavaScript, o",
        },
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content: "## Brief History of JavaScript\n\nJavaScript, ",
        },
      ],
      name: "Brief History of JavaScript",
    },
    {
      subtopics: [
        {
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
          content:
            "## Understanding the JavaScript Engine\n\nThe JavaScript Engine ",
        },
        {
          content:
            "## Understanding the JavaScript Engine\n\nThe JavaScript Engine ",
          name: "I am an experienced Python developer, I already knows the basics of the language, so it should be a fast-paced course.",
        },
      ],
      name: "Understanding the JavaScript Engine",
    },
  ],
};
