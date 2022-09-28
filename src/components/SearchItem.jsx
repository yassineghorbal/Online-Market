import { FaUserAlt } from "react-icons/fa";
import * as moment from "moment";
import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  return (
    <>
      <div className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 shadow-md p-3 border relative'>
        <Link className='hover:cursor-pointer' to={`/item/${item.id}`}>
          <div>
            <img className='mx-auto' src={item.src} alt={item.item_name} />
            <hr className='my-2 w-full' />
            <p className='ml-3 mt-2 text-gray-700'>{item.item_name}</p>
            <p className='ml-3 mt-2 text-gray-700'>
              <strong>Price: </strong>${item.price}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
