import React, { useState } from 'react';
import Navbar from "./components/Navbar.tsx"
import RequestBuilder from "./components/RequestBuilder.tsx"

 const App: React.FC = () => {
  return (
    <div className="dark bg-gray-900 text-white min-h-screen">
    <Navbar/>
    <RequestBuilder/>
      </div>
  );
};
export default App;
