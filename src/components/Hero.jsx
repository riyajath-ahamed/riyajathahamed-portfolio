import React from 'react'
import { motion } from 'framer-motion';
import {styles} from '../styles';
import {ModelObjCanvas} from './canvas';

import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#ffc700]'/>
          

        </div>
        <div>
          <h1 className={`${styles.heroHeadText}text-black`}>Hi, I'm<span className='text-[#ffc700] block'> &#123;Riyajath Ahamed &#125;</span></h1>
          <p className={`${styles.heroSubText} text-black-200`}>
            <span className='inline-block'>
            <Typewriter
            options={{
              strings: ['a Student.', 'a Developer.', 'a Designer.', 'a Cloud Enthusiast.'],
              autoStart: true,
              pauseFor: 500,
              delay: 50,
              deleteSpeed: 50,
              loop: true,
              devMode: false,
              wrapperClassName: 'display: inline',
              cursorClassName: 'color-[#ffc700] text-[#ffc700] font-bold',

            }}
          />
          </span>
          
          </p>
          
        </div>
        

      </div>

      {/* config with the loader  */}
      <ModelObjCanvas  />

      {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35]'>

          </div>

        </a>

      </div> */}

      <div className='absolute xs:bottom-5 bottom-20 sm:right-80 right-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[30px] h-[70px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 35, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-yellow-500 mb-1'
            />
          </div>
        </a>
      </div>

    </section>
  )
}

export default Hero