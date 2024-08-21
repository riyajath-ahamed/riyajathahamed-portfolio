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
      <h2 className=" font-poppins font-semibold md:text-4xl sm:text-xl xs:text-lg text-base py-5 text-center">
      <div>
        <span className='text-sm'>leveled up to</span>  Assoc. Software Engineer <span className='text-sm'>at</span> Octobus BI <span className='text-sm'>Present</span> 
      </div>
      <div>
        <span>Intern</span> Software Engineer <span className='text-sm'>at</span> Octobus BI
      </div>
      <div>
        <span>Educated</span> <span className='text-sm'>at</span>KDU <span className='text-sm'>(General Sir John Kotelawala Defence University)</span>  
      </div>

      </h2>
      <div className='text-center'>
      Freelance clients off the table
      </div>
    </motion.div>
    </>
  )
}

export default SectionWrapper (Experience, "");