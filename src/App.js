import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { UserProvider } from './context/UserContext'
import { ItemsProvider } from "./context/ItemsContext";
import ShowItem from "./pages/ShowItem";
import Profile from './pages/Profile'
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import EditItem from "./pages/EditItem";

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
            <Route path='/item/:id' element={<ShowItem />} />
            <Route path='/item/:id/edit' element={<EditItem />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/search' element={<Search />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ItemsProvider>
    </UserProvider>
  );
}

export default App;
