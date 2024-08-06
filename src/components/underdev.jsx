import React from 'react'

const Underdev = ({setShowDevelopment}) => {
    const handeleShowBanner = () => {
        setShowDevelopment(prevState => !prevState)
    }
  return (
    <div className='fixed w-full h-screen mx-auto bg-whiteCardOverlay z-50 rounded- backdrop-blur-md' >
        <div className='flex flex-col justify-center items-center h-full '>
            <h1 className='text-4xl font-bold text-center text-black mx-5'>Under Development 2.0 🚀</h1>
            <p className='text-lg text-center text-tertiary mx-8 mt-4'> This Just an Old one which is kinda Outdated :( </p>
            <div className='flex gap-4 mt-4'>
                <a href='
                https://www.linkedin.com/in/ahamedriyajath/'
                className='bg-primary text-blue-700 px-4 py-2 rounded-lg'>LinkedIn</a>
                <a href='
                https://github.com/riyajath-ahamed'
                className='bg-primary text-black-100 px-4 py-2 rounded-lg'>Github</a>
            </div>
            <div className='flex gap-4 mt-4'>
                <div 
                onClick={() => handeleShowBanner()} 
                className='bg-primary text-tertiary text-lg px-4 py-2 rounded-lg hover:cursor-pointer'>Issoke Wanna see the Old One</div>
            </div>

        </div>
    </div>
  )
}

export default Underdev