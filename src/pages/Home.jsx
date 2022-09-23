import hero_img from "../assets/hero_img.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef } from "react";
import ItemsContext from "../context/ItemsContext";
import Item from "../components/Item";

export default function Home() {
  const token = JSON.parse(localStorage.getItem("token"));
  let { items, setItems, itemData, itemDataChange } = useContext(ItemsContext);

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

  const logged_in_hero = document.getElementById("logged_in_hero");
  const create_form = document.getElementById("create_form");

  const showForm = () => {
    create_form.style.display = "block";
    logged_in_hero.style.display = "none";
  };

  const showLoggedInHero = (e) => {
    e.preventDefault();
    create_form.style.display = "none";
    logged_in_hero.style.display = "flex";
  };

  const error_422 = document.getElementById("error_422");
  let error_status;
  const createItem = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/items", itemData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e.response);
        error_status = e.response.status;
        if (error_status === 422) {
          error_422.style.display = "block";
        }
      });
  };

  const renderHero = () => {
    if (token === null) {
      return (
        <div
          id='hero'
          className='md:flex shadow-md items-center justify-center m-10 border w-11/12 mx-auto md:py-7 py-0'>
          <div className='md:text-center text-left'>
            <p className='md:text-2xl text-lg md:ml-0 ml-5 md:mt-0 mt-5'>
              Post Ads For What ever You Need To Sell For Free
            </p>
            <div className='flex md:justify-center justify-start'>
              <Link to='/register'>
                <button className='m-5 text-green-700 border border-green-700 p-3 md:p-5 hover:bg-green-700 hover:text-white'>
                  Create An Account
                </button>
              </Link>
              <Link to='/login'>
                <button className='m-5 text-green-700 border border-green-700 p-3 md:p-5 hover:bg-green-700 hover:text-white'>
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <div id='img' className='w-1/2 md:block hidden'>
            <img src={hero_img} alt='hero' />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div
            id='logged_in_hero'
            className='justify-center w-11/12 md:w-1/2 mx-auto my-5 border block md:flex items-center'>
            <p className='text-lg text-green-700 m-3 md:m-5'>
              You need to sell something ?
            </p>
            <button
              onClick={showForm}
              className='border border-black m-3 px-2 text-sm hover:border-green-700 hover:bg-green-700 hover:text-white py-2'>
              Start Now
            </button>
          </div>
          <div
            id='create_form'
            className='justify-center w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-5 border items-center hidden'>
            <h1 className='text-lg text-green-700 m-5 p-3 text-center border border-green-700 w-2/3 mx-auto'>
              Add an item to sell
            </h1>
            <p className='my-5 text-center text-red-500 hidden' id='error_422'>
              All fields are required
            </p>
            <form onSubmit={createItem} className='w-11/12 mx-auto'>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Name</label>
                <input
                  type='text'
                  className='border border-gray-200 p-2 w-full'
                  name='item_name'
                  onChange={(e) => itemDataChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Description</label>
                <textarea
                  className='border border-gray-200 p-2 w-full'
                  name='description'
                  onChange={(e) => itemDataChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Price</label>
                <input
                  type='number'
                  className='border border-gray-200 p-2 w-full'
                  name='price'
                  onChange={(e) => itemDataChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Image</label>
                <input
                  type='url'
                  className='border border-gray-200 p-2 w-full'
                  name='src'
                  placeholder='put a link to your hosted image here'
                  onChange={(e) => itemDataChange(e)}
                />
              </div>
              <div className='mb-6'>
                <button
                  type='submit'
                  className='border border-slate-800 py-2 px-4 hover:bg-black hover:text-white'>
                  Create
                </button>
                <button
                  onClick={showLoggedInHero}
                  className='ml-3 border border-green-700 text-green-700 py-2 px-4 hover:bg-green-700 hover:text-white'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
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
