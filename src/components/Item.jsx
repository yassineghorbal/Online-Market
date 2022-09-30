import { FaUserAlt } from "react-icons/fa";
import * as moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

export default function Item({ item }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const id = JSON.parse(localStorage.getItem("id"));

  // delete
  const deleteItem = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/items/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.error(e);
        return;
      });
  };

  let location = useLocation();
  const deleteBtn = React.createRef();
  const editBtn = React.createRef();
  const showBtns = useCallback(() => {
    if (location.pathname === "/profile") {
      deleteBtn.current.style.display = "flex";
      editBtn.current.style.display = "flex";
    } else {
      return;
    }
  }, [deleteBtn, editBtn, location]);

  useEffect(() => {
    showBtns();
  }, [showBtns]);

  // save to favorites
  const saveBtn = React.createRef();
  const removeBtn = React.createRef();

  const user_id = id;
  const item_id = item.id;

  const itemToAddData = {
    user_id,
    item_id,
  };

  const addItemToFavorites = () => {
    axios
      .post("http://127.0.0.1:8000/api/favorites", itemToAddData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 shadow-md relative dark:bg-[#272727] dark:rounded border border-gray-300 dark:border-gray-900'>
        <Link to={"/account"}>
          <div className='flex m-3'>
            <span className='border border-green-400 rounded-full p-3 text-xl dark:border-green-300'>
              <FaUserAlt />
            </span>{" "}
            <div className='block'>
              <span className='text-sm mt-1 ml-2'>{item.name}</span>
              <span className='text-xs block ml-2'>
                <strong>Posted &nbsp;</strong>
                {moment(item.created_at).fromNow()}
              </span>
            </div>
          </div>
        </Link>
        <Link className='hover:cursor-pointer' to={`/item/${item.id}`}>
          <div>
            <img className='mx-0 my-2' src={item.src} alt={item.item_name} />
            <p className='ml-3 mt-5'>{item.item_name}</p>
            <p className='ml-3 my-2'>
              <strong>Price: </strong>${item.price}
            </p>
          </div>
        </Link>
        <button
          ref={deleteBtn}
          className='hidden m-5 border text-red-500 p-3 hover:text-white hover:bg-red-500 absolute bottom-0.5 right-0.5 items-center'
          onClick={deleteItem}>
          <FiTrash2 />
        </button>
        <Link
          to={`/item/${item.id}/edit`}
          ref={editBtn}
          className='hidden m-5 border text-green-500 p-3 hover:text-white hover:bg-green-500 absolute bottom-0.5 right-12 items-center'>
          <FiEdit2 />
        </Link>
        <button
          onClick={() => {
            saveBtn.current.style.display = "none";
            removeBtn.current.style.display = "block";
            addItemToFavorites();
            console.log("added to favorites");
          }}
          ref={saveBtn}
          className='absolute bottom-5 right-7 text-xl hover:border rounded-full p-3 dark:border-gray-500'>
          <MdOutlineFavoriteBorder />
        </button>
        <button
          onClick={() => {
            saveBtn.current.style.display = "block";
            removeBtn.current.style.display = "none";
            console.log("removed from favorites");
          }}
          ref={removeBtn}
          className='hidden absolute bottom-5 right-7 text-xl hover:border rounded-full p-3 dark:border-gray-500'>
          <MdOutlineFavorite />
        </button>
      </div>
    </>
  );
}
