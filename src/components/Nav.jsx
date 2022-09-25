import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import {
  VscAccount,
  VscSignIn,
  VscSignOut,
  VscChromeClose,
} from "react-icons/vsc";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import React from "react";
import ItemsContext from "../context/ItemsContext";

export default function Nav() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user_name = JSON.parse(localStorage.getItem("name"));

  const { logout } = useContext(UserContext);

  let renderUl = () => {
    if (token === null) {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-0 lg:mr-10'>
          <Link to='/register' className=''>
            <li className='text-sm p-2 hover:bg-black hover:text-white flex items-center'>
              Register &nbsp; <VscAccount />
            </li>
          </Link>
          <Link to='/login' className=''>
            <li className='text-sm p-2 hover:bg-black hover:text-white flex items-center'>
              Log in &nbsp;
              <VscSignIn />
            </li>
          </Link>
        </ul>
      );
    } else {
      return (
        <ul className='hidden md:flex space-x-6 text-lg mr-0 lg:mr-28'>
          <Link to={"/profile"} className=''>
            <li className='text-sm p-2 hover:bg-black hover:text-white flex items-center'>
              {user_name} &nbsp;
              <VscAccount />
            </li>
          </Link>
          <button onClick={logout} className=''>
            <li className='text-sm p-2 hover:bg-black hover:text-white flex items-center'>
              Log out &nbsp;
              <VscSignOut />
            </li>
          </button>
        </ul>
      );
    }
  };

  let renderUlSmallNav = () => {
    if (token === null) {
      return (
        <ul className='flex-row'>
          <li className='my-3'>
            <Link to='/register' className='hover:border p-3'>
              Register
            </Link>
          </li>
          <li className='my-5'>
            <Link className='hover:border p-3' to='/login'>
              Log in
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='flex-row'>
          <li className='my-3'>
            <Link to={"/profile"} className='hover:border p-3'>
              {user_name}
            </Link>
          </li>
          <li className='mb-3'>
            <button className='hover:border p-3' onClick={logout}>
              Log out
            </button>
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

  const hideNav = useCallback(() => {
    smallNav.current.style.display = "none";
    hideBtn.current.style.display = "none";
    showBtn.current.style.display = "block";
  }, [hideBtn, showBtn, smallNav]);

  let location = useLocation();

  let [currentlocation, setCurrentLocation] = useState(location);
  useEffect(() => {
    if (currentlocation !== location) {
      setCurrentLocation(location);
      hideNav();
      if (window.innerWidth < 768) {
        showBtn.current.style.display = "block";
      } else {
        showBtn.current.style.display = "none";
      }
    }
  }, [location, currentlocation, hideNav, showBtn]);

  // search

  const { searchChange, searchResult } = useContext(ItemsContext);

  return (
    <>
      <nav className='w-full flex justify-between items-center text-gray-900 p-5 h-14 shadow'>
        <Link
          to='/'
          className='text-2xl flex ml-0 md:ml-5 lg:ml-28 hover:translate-x-1'>
          <img src={logo} alt='Logo' className='h-6 mr-3' />
          <span className='md:block hidden'>Online Market</span>
        </Link>
        <form onSubmit={searchResult} className='flex mx-2 md:mx-auto'>
          <input
            className='border border-black p-1 md:p-2'
            placeholder='Search'
            onChange={searchChange}
          />
          <button className='border border-black bg-white px-3 hover:bg-black hover:text-white'>
            <BiSearchAlt className='text-xl' />
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
          className='hidden md:hidden absolute border top-14 w-11/12 py-2 text-center bg-white shadow-lg'>
          {renderUlSmallNav()}
        </div>
      </nav>
    </>
  );
}
