import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <FaExclamationTriangle className='text-red-500' size='5em' />
      <h1>404</h1>
      <p className='lead'>Sorry, this page does not exist</p>
      <Link
        to='/'
        className='m-5 p-2 border border-green-700 text-green-700 hover:text-white hover:bg-green-700'>
        Go Back
      </Link>
    </div>
  );
}
