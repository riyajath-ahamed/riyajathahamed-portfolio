import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">
          PROFESSIONALISM
        </p>

        <h2 className={styles.sectionHeadText}>My Skills.</h2>
      
      <div className="flex flex-row flex-wrap justify-center py-4 gap-2">
        {technologies.map((technology) => (
          <div className="w-25 h-25 p-3" key={technology.name}>
            <div className="rounded-3xl bg-white shadow-md w-20 h-20 justify-center items-center hover:shadow-lg ">
              {/* <span class="animate-ping absolute inline-flex w-4 h-4 rounded-full bg-secondary opacity-75"></span>
        <span class="absolute inline-flex w-4 h-4 rounded-full bg-secondary opacity-100"></span> */}
              <img
                src={technology.icon}
                className="w-20 h-20 object-cover p-3"
                alt="techlogo"
              />
            </div>
          </div>
        ))}
      </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
