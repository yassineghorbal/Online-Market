import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { UserProvider } from './context/UserContext'
import { ItemsProvider } from "./context/ItemsContext";
import Create from "./pages/Create";

function App() {
  return (
    <UserProvider>
      <ItemsProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/user/:id" element={<Account />} />
            <Route path="/user/:id/create" element={<Create />} />
          </Routes>
        </Router>
      </ItemsProvider>
    </UserProvider>
  );
}

export default App;
