import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

export default function Account() {
  let [items, setItems] = useState([]);
  items = useRef([]);

  const { id } = useParams();

  const getUserItems = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/items/user/${id}`).then((res) => {
      items.current = res.data;
      setItems(items.current);
      console.log(items.current);
    });
  }, [items, setItems, id]);

  useEffect(() => {
    getUserItems();
  }, [getUserItems]);

  return (
    <>
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
