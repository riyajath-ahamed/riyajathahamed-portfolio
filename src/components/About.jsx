import React from 'react'
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import {styles} from '../styles';
import {services} from '../constants';
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";

const ServiceCard = ({index, title, icon}) => {
  return(
    <Tilt className="xs:w-[250px] w-full">
      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full  rounded-3xl"
      >
        <div
        option={{
          max:10,
          scale:0.1,
          speed:250,
        
        }}
        className="bg-gradient-to-bl from-slate-400 to-zinc-50 rounded-3xl py-3 px-8 min-h-[280px] flex flex-col justify-evenly items-center hover:border-2 hover:border-secondary hover:shadow-xl"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className='bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent text-[20px] font-semibold text-center font-poppins '>{title}</h3>
          
        </div>

      </motion.div>

    </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>

    <motion.p variants={fadeIn("" , "" , 0.1, 1)} className= "mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
    A passionate Software Engineer strive towards excellence & professionalism for making the world a better place with software. I am a driven individual with skills and expertise in the field of Software Design & Development, UI/UX and Cloud Computing.

    </motion.p>
    <div className='mt-20 flex flex-wrap gap-10 text-black-100'>
      {
        services.map((service,index) =>(
          <ServiceCard key={service.title} index={index} {...service}/>
        ))
      }

    </div>

    </>
  )
}

export default SectionWrapper (About, "about");