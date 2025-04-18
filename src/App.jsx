import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";  // Importing Hero component

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />  {/* Using Hero component here */}
    </div>
  );
};

export default App;
