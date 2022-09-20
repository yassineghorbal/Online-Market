import "../scss/home.scss";
import hero_img from "../assets/hero_img.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef } from "react";
import ItemsContext from "../context/ItemsContext";
import Item from "../components/Item";

export default function Home() {
  const token = JSON.parse(localStorage.getItem("token"));
  let { items, setItems } = useContext(ItemsContext);

  items = useRef([]);

  const getItems = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/items`).then((res) => {
      items.current = res.data;
      setItems(items.current);
      console.log(items.current);
    });
  }, [items, setItems]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const renderHero = () => {
    if (token === null) {
      return (
        <div
          id='hero'
          className='md:flex shadow-md items-center justify-center m-10'>
          <div className='md:w-1/2 w-full md:ml-20 md:text-center text-left'>
            <p className='md:text-2xl text-lg md:ml-0 ml-5 md:mt-0 mt-5'>
              Sell or Buy What ever You Like For Free
            </p>
            <div className='flex md:justify-center justify-start'>
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
      return (
        <div className='justify-center w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-5 border flex'>
          <p className='text-lg text-green-700 m-5'>
            You need to sell something ?
          </p>
          <button className='border border-black m-3 px-2 text-sm hover:border-green-700 hover:bg-green-700 hover:text-white'>
            Start Now
          </button>
        </div>
      );
    }
  };
  return (
    <>
      {renderHero()}
      <div className='mt-10'>
        <ul>
          {items.current.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
