import { createContext, useState } from 'react';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  let [items, setItems] = useState([]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

export default ItemsContext;
