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
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { BiUpArrowAlt } from "react-icons/bi";

export default function Nav() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user_name = JSON.parse(localStorage.getItem("name"));

  const { logout } = useContext(UserContext);

  let renderUl = () => {
    if (token === null) {
      return (
        <ul className='hidden md:flex space-x-6 text-lg'>
          <Link to={"/search"}>
            <li className='text-sm p-2 hover:border-b-2 flex items-center'>
              Search &nbsp;
              <BiSearchAlt />
            </li>
          </Link>
          <Link to='/register'>
            <li className='text-sm p-2 hover:border-b-2 flex items-center'>
              Register &nbsp; <VscAccount />
            </li>
          </Link>
          <Link to='/login'>
            <li className='text-sm p-2 hover:border-b-2 flex items-center'>
              Log in &nbsp;
              <VscSignIn />
            </li>
          </Link>
        </ul>
      );
    } else {
      return (
        <ul className='hidden md:flex space-x-6 text-lg'>
          <Link to={"/search"}>
            <li className='text-sm p-2 hover:border-b-2 flex items-center'>
              Search &nbsp;
              <BiSearchAlt />
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className='text-sm p-2 hover:border-b-2 flex items-center'>
              {user_name} &nbsp;
              <VscAccount />
            </li>
          </Link>
          <button onClick={logout}>
            <li className='text-sm p-2 border hover:border-b-2 flex items-center'>
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
            <Link to='/search' className='hover:border p-3'>
              Search
            </Link>
          </li>
          <li className='my-5'>
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
            <Link to='/search' className='hover:border p-3'>
              Search
            </Link>
          </li>
          <li className='my-5'>
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

  // theme
  const darkMode = React.createRef();
  const lightMode = React.createRef();

  const showDarkThemeBtn = () => {
    lightMode.current.style.display = "none";
    darkMode.current.style.display = "block";
  };

  const showLightThemeBtn = () => {
    lightMode.current.style.display = "block";
    darkMode.current.style.display = "none";
  };

  useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
      showLightThemeBtn();
    } else {
      document.documentElement.classList.remove("dark");
      showDarkThemeBtn();
    }
  });

  const toggleLightTheme = () => {
    showDarkThemeBtn();
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  };

  const toggleDarkTheme = () => {
    showLightThemeBtn();
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  };

  // go back up button
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const box = document.querySelector("#box");
  const goUpBtn = document.querySelector("#goUpBtn");

  document.addEventListener(
    "scroll",
    function () {
      isInViewport(box)
        ? (goUpBtn.style.display = "none")
        : (goUpBtn.style.display = "block");
    },
    {
      passive: true,
    }
  );

  return (
    <>
      <nav
        id='box'
        className='w-full lg:w-2/3 mx-auto flex justify-between items-center p-5 h-14 shadow dark:border dark:border-[#272727]'>
        <Link to='/' className='text-2xl flex ml-0 hover:translate-x-1'>
          <img src={logo} alt='Logo' className='h-6 mr-3' />
          <span>Online Market</span>
        </Link>

        <div className='flex gap-2'>
          {renderUl()}
          <button
            ref={darkMode}
            className='bg-white border rounded-full p-3 shadow-2xl dark:bg-[#272727] border-gray-700 ml-0'
            onClick={() => {
              toggleDarkTheme();
            }}>
            <MdDarkMode />
          </button>
          <button
            ref={lightMode}
            className='hidden bg-white border rounded-full p-3 shadow-2xl dark:bg-[#272727] border-gray-700 ml-0'
            onClick={() => {
              toggleLightTheme();
            }}>
            <BsSun />
          </button>
          <button
            ref={showBtn}
            className='md:hidden block bg-white border rounded-full p-3 shadow-2xl dark:bg-[#272727] border-gray-700 ml-0'
            id='toggle'
            onClick={showNav}>
            <GiHamburgerMenu className='text-lg' />
          </button>
          <button
            ref={hideBtn}
            className='md:hidden hidden bg-white border rounded-full p-3 shadow-2xl dark:bg-[#272727] border-gray-700 ml-0'
            id='toggle'
            onClick={hideNav}>
            <VscChromeClose className='text-lg' />
          </button>
        </div>
        <div
          ref={smallNav}
          className='hidden md:hidden absolute border top-14 w-11/12 py-2 text-center bg-white shadow-lg z-50 dark:bg-[#272727] dark:border-[#272727]'>
          {renderUlSmallNav()}
        </div>
      </nav>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        id='goUpBtn'
        className='hidden fixed z-50 bottom-3 right-5 bg-white text-3xl border rounded-full p-3 shadow-2xl dark:bg-[#272727] border-gray-700'>
        <BiUpArrowAlt />
      </button>
    </>
  );
}
