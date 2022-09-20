export default function Item({ item }) {
  return (
    <>
      <div className='w-11/12 md:w-1/2 lg:w-1/3 border border-red-500 mx-auto my-3 shadow-md hover:shadow-lg p-3 rounded'>
        {item.item_name}
      </div>
    </>
  );
}
