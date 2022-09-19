import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    let handleChange = (e) => {
        const newData = { ...user };
        newData[e.target.name] = e.target.value;
        setUser(newData);
    };

    let submit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/login", user)
            .then((res) => {
                console.log(res);
                console.log(res.data.token);
                localStorage.setItem('token', JSON.stringify(res.data.token))
                window.location.reload(false);
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    let logout = () => {
        localStorage.removeItem('token')
        window.location.reload(false);
    }

    return (
        <UserContext.Provider value={{ handleChange, submit, user, logout }}>{children}</UserContext.Provider >
    )
}

export default UserContext