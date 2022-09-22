import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

export default function Profile() {
  let [profile, setProfile] = useState([]);
  profile = useRef([]);

  const user_id = JSON.parse(localStorage.getItem("id"));

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

  const renderUserInfo = () => {
    if (user_id === null) {
      return <p>You need to log in</p>;
    } else {
      return (
        <ul>
          <li>{profile.current.id}</li>
          <li>{profile.current.name}</li>
          <li>{profile.current.email}</li>
          <li>{profile.current.phone}</li>
        </ul>
      );
    }
  };

  return (
    <>
      <div className='mt-10'>{renderUserInfo()}</div>
    </>
  );
}
