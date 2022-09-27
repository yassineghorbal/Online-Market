import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import Item from "../components/Item";

export default function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const searchChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const formSbmit = (e) => {
    e.preventDefault();
  };

  const searchResult = () => {
    axios
      .get(`http://127.0.0.1:8000/api/items/search/${search}`)
      .then((res) => {
        setResult(res.data);
        document.getElementById("error_404").style.display = "none";
        console.log(result);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          document.getElementById("error_404").style.display = "block";
          setResult([]);
        }
        console.log(e);
      });
  };

  return (
    <>
      <form
        onSubmit={formSbmit}
        onChange={searchResult}
        className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 shadow-md p-3'>
        <input
          className='border border-black p-1 md:p-2 w-full'
          placeholder='Search for items'
          onChange={searchChange}
        />
      </form>
      <div className='my-5'>
        <p className='my-5 text-center text-red-500 hidden' id='error_404'>
          No results found!
        </p>
        <ul>
          {result.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
