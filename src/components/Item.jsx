import { FaUserAlt } from "react-icons/fa";
import * as moment from "moment";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <>
      <div className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 shadow-md p-3 border'>
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
        <hr className='my-2 w-full' />
        <Link className='hover:cursor-pointer' to={"/item/" + item.id}>
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
