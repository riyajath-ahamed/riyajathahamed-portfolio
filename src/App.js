import { BrowserRouter } from "react-router-dom";

import { About, Contact,  Hero, Navbar, Tech, Works, StarsCanvas, Experience } from "./components";

const App =  () =>  {
  return (
    <BrowserRouter>
    <div className=" relative z-10 bg-primary">
      <div className="bg-primary bg-cover bg-no-repeat bg-center">
        <h1 className="hidden">Hi there! I'm Riyajath Ahamed</h1>
        <div className="flex flex-col items-center">
        <Navbar />
        </div>
        
        <Hero />

      </div>
      <About/>
      <Experience />
    
      <Tech/>
      <Works/>
     
      <div className="relative z-0">
        <Contact />
        <StarsCanvas/>

      </div>

    </div>
    </BrowserRouter>
  );
}

export default App;
