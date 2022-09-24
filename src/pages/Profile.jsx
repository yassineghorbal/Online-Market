import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

export default function Profile() {
  // show user info
  let [profile, setProfile] = useState([]);
  profile = useRef([]);

  const user_id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getUserItems = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${user_id}`).then((res) => {
      profile.current = res.data;
      setProfile(profile.current);
      console.log(profile.current);
    });
  }, [profile, setProfile, user_id]);

  useEffect(() => {
    getUserItems();
  }, [getUserItems]);

  // edit user info
  const user_info = document.getElementById("user_info");
  const edit_info_form = document.getElementById("edit_info_form");

  const showEditForm = () => {
    user_info.style.display = "none";
    edit_info_form.style.display = "block";
  };
  const hideEditForm = (e) => {
    e.preventDefault();
    user_info.style.display = "block";
    edit_info_form.style.display = "none";
  };

  const [updateProfileData, setUpdateProileData] = useState({});

  const updateProfileChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateProileData((updateProfileData) => {
      const newUpdateProfileData = {
        ...updateProfileData,
        [name]: value,
      };
      console.log(newUpdateProfileData);
      return newUpdateProfileData;
    });
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
        console.log(e.response);
        error_status = e.response.status;
        if (error_status === 422) {
          error_422.style.display = "block";
        }
      });
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
          <p className='mx-auto text-center text-xl text-green-700 p-5 w-11/12 md:w-1/2 border'>
            Your Contact Informations
          </p>
          <div
            id='user_info'
            className='justify-center w-11/12 md:w-1/2 mx-auto my-5 border items-center shadow-md relative block'>
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
              className='m-5 border text-black p-3 hover:text-white hover:bg-green-700 absolute bottom-2 right-2 flex items-center'>
              <FiEdit2 />
              &nbsp;Edit
            </button>
          </div>
          <div
            id='edit_info_form'
            className='justify-center w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-5 border items-center hidden'>
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
                  className='border border-gray-200 p-2 w-full'
                  name='name'
                  onChange={(e) => updateProfileChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Email</label>
                <input
                  type='text'
                  className='border border-gray-200 p-2 w-full'
                  name='email'
                  onChange={(e) => updateProfileChange(e)}
                />
              </div>
              <div className='mb-6'>
                <label className='inline-block text-lg mb-2'>Phone</label>
                <input
                  type='text'
                  className='border border-gray-200 p-2 w-full'
                  name='phone'
                  onChange={(e) => updateProfileChange(e)}
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
          <p className='mx-auto text-center text-xl text-green-700 p-5 w-11/12 md:w-1/2 border'>
            Your Posts
          </p>
        </>
      );
    }
  };

  return (
    <>
      <div className='mt-10'>{renderUserInfo()}</div>
    </>
  );
}
