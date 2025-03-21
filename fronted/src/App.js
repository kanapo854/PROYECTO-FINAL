//import logo from '/workspaces/PROYECTO-FINAL/fronted/src/images/BugsBunny.jpg';
import './App.css';
import Login from './components/Login';
import './styles/variables.css';
import Tasks from './components/TaskList';
import UpdateTask from "./components/UpdateTask";
import CreateTask from "./components/CreateTask";
import ResetPassword from "./components/ResetPassword"; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/tasklist" element = {<Tasks/>}/>
        <Route path="/update-task/:taskId" element = {<UpdateTask/>}/>
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/reset-password/:userid" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
