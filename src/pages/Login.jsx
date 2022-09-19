import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Login() {
  const { login, loginChange } = useContext(UserContext);

  return (
    <div className='w-11/12 p-10 rounded max-w-lg mx-auto shadow-xl'>
      <header className='text-center'>
        <h2 className='text-2xl font-bold uppercase mb-1'>Log In</h2>
        <p className='mb-4'>
          Log in to start buying and selling whatever you like
        </p>
      </header>

      <p className='my-5 text-center text-red-500 hidden' id='error_401'>
        Invalid Credentials
      </p>

      <form onSubmit={login}>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Email</label>
          <input
            type='email'
            className='border border-gray-200 rounded p-2 w-full'
            name='email'
            onChange={(e) => loginChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Password</label>
          <input
            type='password'
            className='border border-gray-200 rounded p-2 w-full'
            name='password'
            onChange={(e) => loginChange(e)}
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
