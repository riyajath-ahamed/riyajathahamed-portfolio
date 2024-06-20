import React from 'react'
import { motion } from 'framer-motion';
import {styles} from '../styles';
import {ModelObjCanvas} from './canvas';

import Typewriter from 'typewriter-effect';
import { name, scroll } from '../assets';
import Spline from '@splinetool/react-spline'
import { GridPatternDashed } from './element';


const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <Spline scene="https://prod.spline.design/X0KqFDZLFVxFphgK/scene.splinecode" />
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText}text-black font-curve font-extrabold`}>Hi, I'm</h1>
        </div>
      </div>
      {/* config with the loader  */}
      <GridPatternDashed />

      <div className='absolute xs:bottom-5 bottom-20 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[70px] h-[70px] '>
            <img src={scroll} className='hover:animate-spin-slow duration-700 ' />
            
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
