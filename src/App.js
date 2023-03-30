import { BrowserRouter } from "react-router-dom";

import { About, Contact,  Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App =  () =>  {
  return (
    <BrowserRouter>
    <div className=" relative z-10 bg-primary">
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
