import "./assets/styles/App.css";
import Login from "./pages/Auth/Login";
import { Navbar } from "./layouts/Navbar";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Login />;
    </div>
  );
}

export default App;

