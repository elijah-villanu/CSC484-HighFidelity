import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components_screens/Home";
import Events from "./components_screens/Events";
import Messages from "./components_screens/Messages";
import NavBar from "./components_screens/components/NavBar";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        
        <Route path="/home" element={<Home />}/>
        
        <Route path="/events" element={<Events />}/>
        
        <Route path="/messages" element={<Messages />}/>
                
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
