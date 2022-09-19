import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(data);
  };
  let submit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response.status);
      });
  };
  return (
    <div className='w-11/12 p-10 rounded max-w-lg mx-auto shadow-xl'>
      <header className='text-center'>
        <h2 className='text-2xl font-bold uppercase mb-1'>Log In</h2>
        <p className='mb-4'>
          Log in to start buying and selling whatever you like
        </p>
      </header>

      <form onSubmit={submit}>
        <div className='mb-6'>
          <label for='email' className='inline-block text-lg mb-2'>
            Email
          </label>
          <input
            type='email'
            className='border border-gray-200 rounded p-2 w-full'
            name='email'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label for='password' className='inline-block text-lg mb-2'>
            Password
          </label>
          <input
            type='password'
            className='border border-gray-200 rounded p-2 w-full'
            name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='mb-6'>
          <button
            type='submit'
            className='border border-slate-800 rounded py-2 px-4 hover:bg-black hover:text-white'>
            Sign In
          </button>
        </div>
        <div className='mt-8'>
          <p>
            Don't have an account?
            <Link to='/register' className='text-gray-800 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
