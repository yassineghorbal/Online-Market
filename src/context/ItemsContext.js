import { createContext, useState } from "react";
import axios from 'axios'

const ItemsContext = createContext()

export function ItemsProvider({ children }) {
    let [items, setItems] = useState([])

    const user_id = JSON.parse(localStorage.getItem("id"));

    let [itemData, setItemData] = useState({
        item_name: '',
        description: '',
        price: '',
        src: '',
        user_id: '',
    })

    let itemDataChange = (e) => {
        const newItemData = { ...itemData }
        newItemData[e.target.name] = e.target.value
        newItemData['user_id'] = user_id
        setItemData(newItemData)
        console.log(itemData)
    }

    return (
        <ItemsContext.Provider value={{ items, setItems, itemData, itemDataChange }}>{children}</ItemsContext.Provider >
    )
}

export default ItemsContext