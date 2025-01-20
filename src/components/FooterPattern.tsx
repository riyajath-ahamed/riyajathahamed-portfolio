import React from "react";

interface FooterPatternProps {
  name: string;
}

const FooterPattern: React.FC<FooterPatternProps> = ({ name }) => {
  return (
    <div className="relative -mt-16 h-40 w-full -z-30 " aria-hidden="true">
      <div className={` pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['${name}'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['${name}'] after:[text-shadow:0_1px_0_white] dark:before:from-blue-700 dark:before:to-blue-900/30 dark:after:bg-blue-800/70 dark:after:[text-shadow:0_1px_0_black]`}></div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
        aria-hidden="true"
      >
        <div className="h-56 w-56 rounded-full border-[20px] border-[#6C47FF] blur-[80px] dark:border-blue-500"></div>
      </div>
    </div>
  );
};

export default FooterPattern;
