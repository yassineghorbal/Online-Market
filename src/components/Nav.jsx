import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  VscAccount,
  VscSignIn,
  VscSignOut,
  VscChromeClose,
} from "react-icons/vsc";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import React from "react";

export default function Nav() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user_name = JSON.parse(localStorage.getItem("name"));

  const { logout } = useContext(UserContext);

  let renderUl = () => {
    if (token === null) {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-0 lg:mr-10'>
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
        <ul className='hidden md:flex space-x-6 text-lg mr-0 lg:mr-10'>
          <li className='text-sm p-2 hover:bg-black hover:text-white'>
            <Link to={"/profile"} className='flex'>
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
            <Link to={"/profile"}>{user_name}</Link>
          </li>
          <li className='mb-3'>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      );
    }
  };

  const smallNav = React.createRef();
  const showBtn = React.createRef();
  const hideBtn = React.createRef();

  window.onresize = () => {
    if (window.innerWidth < 768) {
      smallNav.current.style.display = "none";
      showBtn.current.style.display = "block";
      hideBtn.current.style.display = "none";
    } else {
      smallNav.current.style.display = "none";
      hideBtn.current.style.display = "none";
      showBtn.current.style.display = "none";
    }
  };

  const showNav = () => {
    smallNav.current.style.display = "block";
    showBtn.current.style.display = "none";
    hideBtn.current.style.display = "block";
  };

  const hideNav = () => {
    smallNav.current.style.display = "none";
    hideBtn.current.style.display = "none";
    showBtn.current.style.display = "block";
  };

  return (
    <>
      <nav className='w-full flex justify-between items-center text-gray-900 p-5 h-14 shadow'>
        <Link to='/' className='text-2xl flex ml-0 md:ml-5 lg:ml-10'>
          <img src={logo} alt='Logo' className='h-6 mr-3' />
          <span className='md:block hidden'>Online Market</span>
        </Link>
        <form className='flex mx-2 md:mx-auto'>
          <input
            className='border border-black p-1 md:p-2'
            placeholder='Search'
          />
          <button className='border border-black bg-white px-2 hover:bg-black hover:text-white'>
            Search
          </button>
        </form>
        {renderUl()}
        <button
          ref={showBtn}
          className='md:hidden block'
          id='toggle'
          onClick={showNav}>
          <GiHamburgerMenu className='text-lg' />
        </button>
        <button
          ref={hideBtn}
          className='md:hidden hidden'
          id='toggle'
          onClick={hideNav}>
          <VscChromeClose className='text-lg' />
        </button>
        <div
          ref={smallNav}
          className='hidden md:hidden absolute border top-16 w-11/12 py-2 text-center bg-white shadow-lg'
          onClick={hideNav}>
          {renderUlSmallNav()}
        </div>
      </nav>
    </>
  );
}
