import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function Register() {
  const { registerChange, registerData } = useContext(UserContext);

  const navigate = useNavigate();
  const error_pwd = document.getElementById("error_pwd");
  const error_422 = document.getElementById("error_422");
  let error_status;
  let register = (e) => {
    e.preventDefault();
    if (registerData.password === registerData.password_confirmation) {
      axios
        .post("http://127.0.0.1:8000/api/register", registerData)
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
          if (error_status === 422) {
            error_422.style.display = "block";
            error_pwd.style.display = "none";
          }
        });
    } else {
      error_pwd.style.display = "block";
      error_422.style.display = "none";
    }
  };

  return (
    <div className='w-11/12 p-10 border mt-2 max-w-lg mx-auto shadow-xl'>
      <header className='text-center'>
        <h2 className='text-2xl font-bold uppercase mb-1'>Register</h2>
        <p className='mb-4'>Create an account</p>
      </header>

      <p className='my-5 text-center text-red-500 hidden' id='error_pwd'>
        Password and Password Confirmation did not match
      </p>
      <p className='my-5 text-center text-red-500 hidden' id='error_422'>
        All fields are required
      </p>

      <form onSubmit={register}>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Name</label>
          <input
            type='text'
            className='border border-gray-200 p-2 w-full'
            name='name'
            onChange={(e) => registerChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Phone</label>
          <input
            type='phone'
            className='border border-gray-200 p-2 w-full'
            name='phone'
            onChange={(e) => registerChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Email</label>
          <input
            type='email'
            className='border border-gray-200 p-2 w-full'
            name='email'
            onChange={(e) => registerChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Password</label>
          <input
            type='password'
            className='border border-gray-200 p-2 w-full'
            name='password'
            onChange={(e) => registerChange(e)}
            id='pwd'
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Confirm Password</label>
          <input
            type='password'
            className='border border-gray-200 p-2 w-full'
            name='password_confirmation'
            onChange={(e) => registerChange(e)}
            id='pwd_confirm'
          />
        </div>
        <div className='mb-6'>
          <button
            type='submit'
            className='border border-slate-800 py-2 px-4 hover:bg-black hover:text-white'>
            Sign Up
          </button>
        </div>
        <div className='mt-8'>
          <p>
            Already have an account? &nbsp;
            <Link to='/login' className='text-gray-800 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
