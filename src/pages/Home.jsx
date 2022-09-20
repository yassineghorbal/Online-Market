import "../scss/home.scss";
import hero_img from "../assets/hero_img.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  const token = JSON.parse(localStorage.getItem("token"));

  const renderHero = () => {
    if (token === null) {
      return (
        <div
          id='hero'
          className='md:flex shadow-md items-center justify-center m-10'>
          <div className='md:w-1/2 w-full md:ml-20 md:text-center text-left'>
            <p className='text-2xl md:ml-0 ml-5 md:mt-0 mt-5'>
              Sell or Buy What ever You Like For Free
            </p>
            <div className='flex justify-center'>
              <Link to='/register'>
                <button className='m-5 text-green-700 border border-green-700 p-5 hover:rounded-full hover:bg-green-700 hover:text-white'>
                  Create An Account
                </button>
              </Link>
              <Link to='/login'>
                <button className='m-5 text-green-700 border border-green-700 p-5 hover:rounded-full hover:bg-green-700 hover:text-white'>
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <div id='img' className='w-1/2 mr-20 md:block hidden'>
            <img src={hero_img} alt='hero' />
          </div>
        </div>
      );
    } else {
      return;
    }
  };
  return (
    <>
      {renderHero()}
      <div></div>
    </>
  );
}
