import { useState } from "react";
import axios from "axios";
import SearchItem from "../components/SearchItem";

export default function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const searchChange = (e) => {
    setSearch(e.target.value);
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
      })
      .catch((e) => {
        if (e.response.status === 404) {
          document.getElementById("error_404").style.display = "block";
          setResult([]);
        }
      });
  };

  return (
    <>
      <form
        onSubmit={formSbmit}
        onChange={searchResult}
        className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 border'>
        <input
          className='border border-black p-1 md:p-2 w-full bg-transparent'
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
            <SearchItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
