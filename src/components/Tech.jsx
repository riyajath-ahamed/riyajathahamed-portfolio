import React from 'react'

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div >
      <p className="bg-gradient-to-r from-slate-900 via-violet-600 to-slate-700 bg-clip-text text-transparent sm:text-[18px] text-[14px] font-semibold uppercase tracking-wider">PROFESSIONALISM</p>
      
      <h2 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-poppins font-semibold md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] py-5">My Skills</h2>
    <div className='flex flex-row flex-wrap justify-center gap-10'>

    {/* {technologies.map((technology) => (
      <div className='w-28 h-28' key={technology.name}>
        <BallCanvas icon={technology.icon} className="shadow-md" />
        
      </div>
    ))} */}
  </div>
  </div>
  )
}

export default SectionWrapper(Tech, "");