import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";

export default function EditItem() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  let [item, setItem] = useState({});
  item = useRef({});

  const [item_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [src, setSrc] = useState("");
  const [user_id, setId] = useState("");

  const getItem = useCallback(() => {
    axios
      .get(`http://127.0.0.1:8000/api/items/${id}`)
      .then((res) => {
        item.current = res.data[0];
        setItem(item.current);
        setName(item.current.item_name);
        setDescription(item.current.description);
        setPrice(item.current.price);
        setSrc(item.current.src);
        setId(item.current.user_id);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [item, setItem, id]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  let updateItemData = {
    user_id,
    item_name,
    description,
    price,
    src,
  };

  const itemChange = (e) => {
    const newItem = { ...updateItemData };
    newItem[e.target.name] = e.target.value;
    setName(newItem.item_name);
    setDescription(newItem.description);
    setPrice(newItem.price);
    setSrc(newItem.src);
  };

  const error_422 = document.getElementById("error_422");
  let error_status;
  let navigate = useNavigate();
  const edit_item_info = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/items/${id}`, updateItemData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/profile");
      })
      .catch((e) => {
        console.log(e.response);
        error_status = e.response.status;
        if (error_status === 422) {
          error_422.style.display = "block";
        }
      });
  };

  return (
    <div className='justify-center w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-5 border items-center dark:border-[#272727]'>
      <h1 className='text-lg text-green-700 m-5 p-3 text-center border border-green-700 w-2/3 mx-auto'>
        Edit Item
      </h1>
      <p className='my-5 text-center text-red-500 hidden' id='error_422'>
        All fields are required
      </p>
      <form onSubmit={edit_item_info} className='w-11/12 mx-auto'>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Name</label>
          <input
            type='text'
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='item_name'
            defaultValue={item.current.item_name}
            onChange={(e) => itemChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Description</label>
          <textarea
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='description'
            defaultValue={item.current.description}
            onChange={(e) => itemChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Price</label>
          <input
            type='number'
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='price'
            defaultValue={item.current.price}
            onChange={(e) => itemChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='inline-block text-lg mb-2'>Image</label>
          <input
            type='url'
            className='p-2 w-full bg-transparent border dark:border-[#272727]'
            name='src'
            defaultValue={item.current.src}
            onChange={(e) => itemChange(e)}
          />
        </div>
        <div className='mb-6'>
          <button
            type='submit'
            className='border border-slate-800 py-2 px-4 hover:bg-black hover:text-white'>
            Update
          </button>
          <Link
            to={"/profile"}
            className='ml-3 border border-green-700 text-green-700 py-2 px-4 hover:bg-green-700 hover:text-white'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
