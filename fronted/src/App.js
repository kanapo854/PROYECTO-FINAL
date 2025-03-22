//import logo from '/workspaces/PROYECTO-FINAL/fronted/src/images/BugsBunny.jpg';
import './App.css';
import Login from './components/Login';
import './styles/variables.css';
import Tasks from './components/TaskList';
import UpdateTask from "./components/UpdateTask";
import CreateTask from "./components/CreateTask";
import ResetPassword from "./components/ResetPassword"; 
import CreateUser from './components/CreateUser';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element = {<Login/>}/>
        <Route path="/tasklist" element = {<Tasks/>}/>
        <Route path="/update-task/:taskId" element = {<UpdateTask/>}/>
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
