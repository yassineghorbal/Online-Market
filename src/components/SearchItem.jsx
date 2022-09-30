import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  return (
    <>
      <div className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-3 shadow-md p-3 border relative dark:bg-[#272727] dark:border-none'>
        <Link className='hover:cursor-pointer flex' to={`/item/${item.id}`}>
          <div className='w-2/3'>
            <img className='mx-auto' src={item.src} alt={item.item_name} />
          </div>
          <div className='ml-3'>
            <p className='ml-3 mt-2'>{item.item_name}</p>
            <p className='ml-3 mt-2'>
              <strong>Price: </strong>${item.price}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
