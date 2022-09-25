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

    const [search, setSearch] = useState("");

    const searchChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    let result = []

    const searchResult = (e) => {
        e.preventDefault();
        axios
            .get(`http://127.0.0.1:8000/api/items/search/${search}`)
            .then((res) => {
                result = res.data;
                console.log(result)
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <ItemsContext.Provider value={{ items, setItems, itemData, itemDataChange, searchChange, searchResult, result }}>{children}</ItemsContext.Provider >
    )
}

export default ItemsContext