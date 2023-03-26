import React from 'react'
import { motion } from 'framer-motion';

import {styles} from '../styles';
import {  textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Experience = () => {

const intern ="<Internship/>";

  return (
    <>
    <motion.div variants={textVariant()}>
      <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">What I have Done So far</p>
      <h2 className={styles.sectionHeadText}>Experience.</h2>

      
      
      <h2 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-poppins font-semibold md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] py-5">{intern}</h2>
    </motion.div>
    </>
  )
}

export default SectionWrapper (Experience, "");