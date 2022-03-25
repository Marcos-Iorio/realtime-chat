import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from './components/ChatRoom/ChatRoom';
import './App.css'

function App() {
  return (
    <Router>
       <Routes>
          <Route path="/" element={<ChatRoom/>}/>
        </Routes>
    </Router>
     
  );
}

export default App;
