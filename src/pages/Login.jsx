import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import React from "react";

export default function Login() {
  const { user, loginChange } = useContext(UserContext);

  let error_status;
  const error_401 = document.getElementById("error_401");
  const error_422 = document.getElementById("error_422");
  let navigate = useNavigate();
  let login = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("id", JSON.stringify(res.data.user.id));
        localStorage.setItem("name", JSON.stringify(res.data.user.name));
        navigate("/");
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e.response);
        error_status = e.response.status;
        if (error_status === 401) {
          error_401.style.display = "block";
          error_422.style.display = "none";
        } else if (error_status === 422) {
          error_422.style.display = "block";
          error_401.style.display = "none";
        }
      });
  };

  // show and hide password
  const password = React.createRef();
  const showPwd = React.createRef();
  const hidePwd = React.createRef();

  const showPassword = function (e) {
    e.preventDefault();
    if (user.password === "") return;
    password.current.setAttribute("type", "text");
    showPwd.current.style.display = "none";
    hidePwd.current.style.display = "block";
  };

  const hidePassword = function (e) {
    e.preventDefault();
    password.current.setAttribute("type", "password");
    showPwd.current.style.display = "block";
    hidePwd.current.style.display = "none";
  };

  return (
    <div className='w-11/12 p-10 border mt-2 max-w-lg mx-auto shadow-xl dark:border-[#272727]'>
      <header className='text-center'>
        <h2 className='text-2xl font-bold uppercase mb-1'>Log In</h2>
        <p className='mb-4'>Log in to sell whatever you like</p>
      </header>

      <p className='my-5 text-center text-red-500 hidden' id='error_401'>
        Invalid Credentials
      </p>
      <p className='my-5 text-center text-red-500 hidden' id='error_422'>
        All fields are required
      </p>

      <form onSubmit={login}>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Email</label>
          <input
            type='email'
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='email'
            onChange={(e) => loginChange(e)}
          />
        </div>
        <div className='mb-6 relative'>
          <label className='inline-block text-lg mb-2'>Password</label>
          <input
            ref={password}
            type='password'
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='password'
            onChange={(e) => loginChange(e)}
          />
          <button
            ref={showPwd}
            className='absolute text-xl right-5 bottom-3'
            onClick={showPassword}>
            <BiShow />
          </button>
          <button
            ref={hidePwd}
            className='hidden absolute text-xl right-5 bottom-3'
            onClick={hidePassword}>
            <BiHide />
          </button>
        </div>
        <div className='mb-6'>
          <button
            type='submit'
            className='border border-slate-800 py-2 px-4 hover:bg-black hover:text-white'>
            Sign In
          </button>
        </div>
        <div className='mt-8'>
          <p>
            Don't have an account? &nbsp;
            <Link to='/register' className='hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
