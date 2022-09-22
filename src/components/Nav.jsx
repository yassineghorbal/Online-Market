import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscAccount, VscSignIn, VscSignOut } from "react-icons/vsc";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Nav() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user_id = JSON.parse(localStorage.getItem("id"));
  const user_name = JSON.parse(localStorage.getItem("name"));

  const { logout } = useContext(UserContext);

  let renderUl = () => {
    if (token === null) {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-10'>
          <li className='text-sm p-2 hover:bg-black hover:text-white'>
            <Link to='/register' className='flex items-start'>
              Register &nbsp; <VscAccount />{" "}
            </Link>
          </li>
          <li className='text-sm p-2 hover:bg-black hover:text-white'>
            <Link to='/login' className='flex'>
              Log in &nbsp;
              <VscSignIn />
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-10'>
          <li className='text-sm p-2 hover:bg-black hover:text-white'>
            <Link to={"/user/" + user_id} className='flex'>
              {user_name} &nbsp;
              <VscAccount />
            </Link>
          </li>
          <li className='text-sm p-2 hover:bg-black hover:text-white'>
            <button onClick={logout} className='flex'>
              Log out &nbsp;
              <VscSignOut />
            </button>
          </li>
        </ul>
      );
    }
  };

  let renderUlSmallNav = () => {
    if (token === null) {
      return (
        <ul className='flex-row'>
          <li className='my-3'>
            <Link to='/register'>Register</Link>
          </li>
          <li className='mb-3'>
            <Link to='/login'>Log in</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='flex-row'>
          <li className='my-3'>
            <Link to={"/user/" + user_id}>{user_name}</Link>
          </li>
          <li className='mb-3'>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      );
    }
  };

  let [show, setShow] = useState(true);
  const smallNav = document.getElementById("nav");

  let change = () => {
    setShow(!show);
    navDisplay();
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768 && show === true) {
      smallNav.style.display = "block";
    } else {
      smallNav.style.display = "none";
    }
  });

  let navDisplay = () => {
    if (show === true) {
      smallNav.style.display = "block";
    } else {
      smallNav.style.display = "none";
    }
  };

  return (
    <>
      <nav
        id='bigNav'
        className='w-full flex justify-between items-center text-gray-900 p-5 h-14'>
        <Link to='/' className='text-2xl flex ml-0 md:ml-10'>
          <img src={logo} alt='Logo' className='h-6 mr-3' />
          <span className='md:block hidden'>Online Market</span>
        </Link>
        <form className='flex'>
          <input className='border border-black p-2' placeholder='Search' />
          <button className='border border-black bg-white px-2 hover:bg-black hover:text-white'>
            Search
          </button>
        </form>
        {renderUl()}
        <button className='md:hidden block' id='toggle' onClick={change}>
          <GiHamburgerMenu className='text-lg' />
        </button>
        <div
          id='nav'
          className='hidden absolute border top-16 w-11/12 py-2 text-center bg-white shadow-lg'
          onClick={change}>
          {renderUlSmallNav()}
        </div>
      </nav>
    </>
  );
}
