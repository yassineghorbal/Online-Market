import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  return <></>;
}
