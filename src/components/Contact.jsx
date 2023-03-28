import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { textVariant } from "../utils/motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { facebook, githubs, instagram, linkedin, twitter } from "../assets";

const Contact = () => {


  return (
    <div>
      <motion.div variants={textVariant()}>
      <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">
          Get in Touch
        </p>

        <h2 className={styles.sectionHeadText}>Contact.</h2>
        <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">
        Connect with me on social media.
        </p>
        
        </motion.div>

        <motion.div variants={slideIn()} className="flex xl:flex-row p-9 justify-center gap-10 flex-col">
        <div>
          <img src="https://avatars.githubusercontent.com/u/64283797?v=4" className="py-3 rounded-full"/>
        </div>
        <div className={`xl:mt-12 flex flex-row xl:flex-col p-1 xl:p-4 xl:gap-10 gap-1 overflow-hidden rounded-lg justify-items-center bg-slate-200 text-secondary `}>
          <div>
            <a href="https://www.facebook.com/riyajathahamed12">
              <img src={facebook} alt="facebook"  className="w-12 h-12 hover:cursor-pointer hover:shadow-lg bg-white rounded-lg p-1"/>
            </a>
         
          </div>
          <div>
            <a href="">
              <img src={instagram} alt="facebook"   className="w-12 h-12 hover:cursor-pointer hover:shadow-lg bg-white rounded-lg p-1"/>
            </a>
          </div>
          <div>
            <a href="https://twitter.com/ARiyajath">
              <img src={twitter} alt="facebook"   className="w-12 h-12 hover:cursor-pointer hover:shadow-lg bg-white rounded-lg p-1"/>
            </a>
          </div>
          <div>
            <a href="https://github.com/riyajath-ahamed">
              <img src={githubs} alt="facebook"   className="w-12 h-12 hover:cursor-pointer hover:shadow-lg bg-white rounded-lg p-1"/>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/ahamedriyajath/">
              <img src={linkedin} alt="facebook"   className="w-12 h-12 hover:cursor-pointer hover:shadow-lg bg-white rounded-lg p-1"/>
            </a>
          </div>

      </div>
      
      </motion.div>

      <div className="text-center">
        <p className="bg-gradient-to-r font-bold from-amber-500 via-red-600 to-orange-600 bg-clip-text text-transparent md:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px]">
        だってばよ
        </p>
        <p className="text-secondary">
        "Dattebayo"
        </p>

      </div>
      <p className="text-secondary">
        ""
        </p>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");