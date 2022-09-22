import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import * as moment from "moment";

export default function ShowItem() {
  let [item, setItem] = useState([]);
  item = useRef([]);

  const { id } = useParams();

  const getItem = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/items/${id}`).then((res) => {
      item.current = res.data;
      setItem(item.current);
      console.log(item.current);
    });
  }, [item, setItem, id]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  return (
    <>
      {item.current.map((item) => (
        <div
          key={item.id}
          className='w-11/12 md:w-3/4 mx-auto my-3 shadow-md p-3 border'>
          <img src={item.src} alt={item.name} className='mb-5 mx-auto' />
          <div className='block md:flex'>
            <div className='w-100 md:w-1/2 border p-2'>
              <Link to={"/user/" + item.user_id}>
                <div className='flex'>
                  <span className='border border-green-400 rounded-full p-3 text-xl'>
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
              <div className='m-3'>
                <p className='text-3xl mb-2'>Contact Seller</p>
                <p>
                  <strong className='text-green-700'>Email:&nbsp;</strong>
                  {item.email}
                </p>
                <p>
                  <strong className='text-green-700'>Phone:&nbsp;</strong>
                  {item.phone}
                </p>
              </div>
            </div>
            <div className='w-100 md:w-1/2 p-5 border'>
              <p className='text-2xl mb-3'>{item.item_name}</p>
              <p>
                <span className='text-green-700'>Price: </span>
                <small>${item.price}</small>
              </p>
              <p>
                <span className='text-green-700'>Description</span>:{" "}
                <small>{item.description}</small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
