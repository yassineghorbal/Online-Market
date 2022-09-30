import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Item from "../components/Item";

export default function Profile() {
  // show user info
  let [profile, setProfile] = useState([]);
  profile = useRef([]);

  const user_id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getUserInfo = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${user_id}`).then((res) => {
      profile.current = res.data;
      setProfile(profile.current);
      setName(profile.current.name);
      setEmail(profile.current.email);
      setPhone(profile.current.phone);
    });
  }, [profile, setProfile, user_id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  // edit user info
  const user_info = document.getElementById("user_info");
  const edit_info_form = document.getElementById("edit_info_form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  let updateProfileData = {
    name,
    email,
    phone,
  };

  const profileChange = (e) => {
    const newProfile = { ...updateProfileData };
    newProfile[e.target.name] = e.target.value;
    setName(newProfile.name);
    setEmail(newProfile.email);
    setPhone(newProfile.phone);
  };

  const showEditForm = () => {
    user_info.style.display = "none";
    edit_info_form.style.display = "block";
  };

  const hideEditForm = (e) => {
    e.preventDefault();
    user_info.style.display = "block";
    edit_info_form.style.display = "none";
  };

  const error_422 = document.getElementById("error_422");
  let error_status;
  const edit_user_info = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/users/${user_id}`, updateProfileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("name", JSON.stringify(res.data.name));
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
        error_status = e.response.status;
        if (error_status === 422) {
          error_422.style.display = "block";
        }
      });
  };

  // user items
  let [items, setItems] = useState([]);
  items = useRef([]);

  const id = JSON.parse(localStorage.getItem("id"));

  const getUserItems = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/items/user/${id}`).then((res) => {
      items.current = res.data;
      setItems(items.current);
    });
  }, [items, setItems, id]);

  useEffect(() => {
    getUserItems();
  }, [getUserItems]);

  // delete user
  let navigate = useNavigate();

  const deleteUser = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        navigate("/");
        window.location.reload(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const renderUserItems = () => {
    if (items.current.length === 0) {
      return <p className='text-center m-10 text-red-500'>No Posts Yet</p>;
    } else {
      return (
        <>
          <p className='mx-auto text-center text-xl text-green-700 p-5 w-11/12 md:w-1/2 border mt-10 dark:border-[#272727]'>
            Your Posts
          </p>
          <div className='mt-5'>
            <ul>
              {items.current.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </>
      );
    }
  };

  const renderUserInfo = () => {
    if (user_id === null) {
      return (
        <>
          <div className='justify-center w-11/12 md:w-1/2 mx-auto my-5 border flex items-center text-green-700'>
            You need to Log in
            <Link
              to='/login'
              className='m-5 border text-black px-3 py-2 hover:text-white hover:bg-green-700'>
              Log in
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className='mx-auto text-center text-xl text-green-700 p-5 w-11/12 md:w-1/2 border dark:border-[#272727]'>
            Your Contact Informations
          </p>
          <div
            id='user_info'
            className='justify-center w-11/12 md:w-1/2 mx-auto my-5 border items-center shadow-md relative block dark:border-[#272727]'>
            <ul className='m-10'>
              <li className='my-3'>
                Name:&nbsp;
                <span className='text-green-700'>{profile.current.name}</span>
              </li>
              <li className='my-3'>
                Email:&nbsp;
                <span className='text-green-700'>{profile.current.email}</span>
              </li>
              <li className='my-3'>
                Phone:&nbsp;
                <span className='text-green-700'>{profile.current.phone}</span>
              </li>
            </ul>
            <button
              onClick={showEditForm}
              className='m-5 border p-3 hover:text-white hover:bg-green-700 absolute bottom-2 right-28 flex items-center dark:border-[#272727]'>
              <FiEdit2 />
              &nbsp;Edit
            </button>
            <button
              onClick={() => {
                document.getElementById("delete_confirm").style.display =
                  "block";
              }}
              className='m-5 border text-red-500 p-3 hover:text-white hover:bg-red-500 absolute bottom-2 right-2 flex items-center dark:border-[#272727]'>
              <FiTrash2 />
              &nbsp;Delete
            </button>
          </div>
          <div
            id='delete_confirm'
            className='w-11/12 md:w-1/2 lg:w-1/3 border border-red-700 bg-red-400 rounded p-3 mx-auto hidden'>
            <p className='text-white ml-5 text-lg'>
              Are you sure? All your posts will be deleted.
            </p>
            <div className='flex w-full justify-end'>
              <button
                onClick={() => {
                  document.getElementById("delete_confirm").style.display =
                    "none";
                }}
                className='m-2 border border-black text-black bg-white p-3 hover:text-white hover:bg-black hover:border-white flex items-center'>
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className='m-2 border text-white bg-red-500 p-3 hover:text-red-500 hover:bg-white hover:border-red-500 flex items-center'>
                <FiTrash2 />
                &nbsp;Delete
              </button>
            </div>
          </div>
          <div
            id='edit_info_form'
            className='justify-center w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-5 border items-center hidden dark:border-[#272727]'>
            <h1 className='text-lg text-green-700 m-5 p-3 text-center border border-green-700 w-2/3 mx-auto'>
              Edit Your Contact Info
            </h1>
            <p className='my-5 text-center text-red-500 hidden' id='error_422'>
              All fields are required
            </p>
            <form onSubmit={edit_user_info} className='w-11/12 mx-auto'>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Name</label>
                <input
                  type='text'
                  className='p-2 w-full bg-transparent border dark:border-[#272727]'
                  name='name'
                  defaultValue={profile.current.name}
                  onChange={(e) => profileChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Email</label>
                <input
                  type='email'
                  className='p-2 w-full bg-transparent border dark:border-[#272727]'
                  name='email'
                  defaultValue={profile.current.email}
                  onChange={(e) => profileChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Phone</label>
                <input
                  type='phone'
                  className='p-2 w-full bg-transparent border dark:border-[#272727]'
                  name='phone'
                  defaultValue={profile.current.phone}
                  onChange={(e) => profileChange(e)}
                />
              </div>
              <div className='mb-6'>
                <button
                  type='submit'
                  className='border border-slate-800 py-2 px-4 hover:bg-black hover:text-white'>
                  Update
                </button>
                <button
                  onClick={hideEditForm}
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
      <div className='mt-10'>{renderUserInfo()}</div>
      {renderUserItems()}
    </>
  );
}
