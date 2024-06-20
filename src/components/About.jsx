import React from 'react'
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import {styles} from '../styles';
import {services} from '../constants';
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";
import { storyTi } from '../assets';

const ServiceCard = ({index, title, icon, description}) => {
  return(
    <Tilt className="xs:w-[250px] w-full">
      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.5)}
        className="w-full  rounded-3xl"
      >
        <div
        option={{
          max:10,
          scale:0.1,
          speed:250,
        
        }}
        className="bg-slate-200 rounded-3xl py-3 px-8 min-h-[280px] flex flex-col justify-evenly items-center hover:border-2 hover:border-secondary hover:shadow-xl"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className='bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent text-[20px] font-semibold text-center font-poppins '>{title}</h3>
          <h4 className='font-semibold font-poppins text-sm text-secondary'>{description}</h4>
          
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
      <div className="flex flex-row items-center ">  
      <h2 className={styles.sectionHeadText}>My</h2>
      <img src={storyTi} alt="contact" className={styles.sectionHeaderImage} />
      </div>
    </motion.div>

    <motion.div variants={fadeIn("" , "" , 0.1, 1)} className= "mt-4 w- bg-white pt-20 px-8 pb-8 rounded-3xl text-[17px]  leading-[30px]">
    <p className='text-xl font-medium text-black'>
    <span class="block">
    A dedicated software engineering student on a quest for excellence 
    </span>
    <span class="block">
    and innovation. Expert in front-end development, UI/UX, and cloud computing, 
    </span>
    <span class="block">
    I combine my tech skills with a passion for design. 
    </span>
    <span class="block">
    Off-duty, you'll find me diving into the world of 
    <span className='bg-gradient-to-r from-orange-600 via-amber-400 to-orange-400 bg-clip-text text-transparent'> Naruto </span> 
    or cheering for <span className='bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent'>FC </span> 
    <span className='bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent'>Barcelona</span>. 
    </span>
    <span class="block">
    Ready to code a better world, one line at a time. 
    </span>
    
    </p>
    </motion.div>
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