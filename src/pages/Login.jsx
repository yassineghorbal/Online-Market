import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

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

  return (
    <div className='w-11/12 p-10 border mt-2 max-w-lg mx-auto shadow-xl'>
      <header className='text-center'>
        <h2 className='text-2xl font-bold uppercase mb-1'>Log In</h2>
        <p className='mb-4'>
          Log in to start buying and selling whatever you like
        </p>
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
            className='border border-gray-200 p-2 w-full'
            name='email'
            onChange={(e) => loginChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Password</label>
          <input
            type='password'
            className='border border-gray-200 p-2 w-full'
            name='password'
            onChange={(e) => loginChange(e)}
          />
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
            <Link to='/register' className='text-gray-800 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
