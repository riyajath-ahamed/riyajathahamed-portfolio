import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact,  Hero, Navbar, Tech, Works, StarsCanvas, Underdev } from "./components";

const App =  () =>  {
  const [showDevelopment, setShowDevelopment] = useState(true);
  return (
    <BrowserRouter>
    <div className=" relative z-10 bg-primary">
      {
        showDevelopment && <Underdev setShowDevelopment={setShowDevelopment}/>
      }
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <h1 className="hidden">Hi there! I'm Riyajath Ahamed</h1>
        <Navbar />
        <Hero />

      </div>
      <About/>
    
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
