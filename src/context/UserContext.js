import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    let loginChange = (e) => {
        const newData = { ...user };
        newData[e.target.name] = e.target.value;
        setUser(newData);
    };

    let error_status;

    let login = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/login", user)
            .then((res) => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                window.location.reload(false);
            })
            .catch((e) => {
                console.log(e.response)
                // console.log(e.response.status);
                error_status = e.response.status;
                // console.log(error_status)
            });
    };

    let logout = () => {
        localStorage.removeItem('token')
        window.location.reload(false);
    }

    return (
        <UserContext.Provider value={{ loginChange, login, user, logout, error_status }}>{children}</UserContext.Provider >
    )
}

export default UserContext