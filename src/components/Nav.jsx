import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Nav() {
  const token = JSON.parse(localStorage.getItem("token"));

  const { logout } = useContext(UserContext);

  let renderUl = () => {
    if (token === null) {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-10'>
          <li className=''>
            <Link to='/register'>Register</Link>
          </li>
          <li className=''>
            <Link to='/login'>Log in</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-10'>
          <li className=''>
            <Link to='/account'>Account</Link>
          </li>
          <li className=''>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      );
    }
  };

  let [show, setShow] = useState(true);
  let smallNav = document.getElementById("nav");
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
      <nav className='w-full flex justify-between items-center mb-4 text-gray-900 p-5 bg-gray-300'>
        <Link to='/' className='text-2xl flex ml-0 md:ml-10'>
          <img src={logo} alt='Logo' className='h-6 mr-3' />
          Online Market
        </Link>
        <form className='hidden md:flex'>
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
          className='md:hidden absolute border top-16 w-11/12 py-2 text-center bg-white shadow-lg'>
          <ul className='flex-row'>
            <li className='mb-3'>
              <form>
                <input
                  className='border border-black p-3'
                  placeholder='Search'
                />
                <button className='border border-black bg-white px-2 hover:bg-black hover:text-white p-3'>
                  Search
                </button>
              </form>
            </li>
            <li className='mb-3'>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
