//import logo from '/workspaces/PROYECTO-FINAL/fronted/src/images/BugsBunny.jpg';
import './App.css';
import Login from './components/Login';
import './styles/variables.css';
import Tasks from './components/TaskList';
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header/>
      <Tasks/>
    </div>
  );
}

export default App;
