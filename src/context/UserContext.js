import { createContext, useState } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {

    // login
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    let loginChange = (e) => {
        const newData = { ...user };
        newData[e.target.name] = e.target.value;
        setUser(newData);
    };

    let logout = () => {
        localStorage.removeItem("token");
        window.location.reload(false);
    };



    // register
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    let registerChange = (e) => {
        const newData = { ...registerData };
        newData[e.target.name] = e.target.value;
        setRegisterData(newData);
        console.log(registerData)
    };

    return (
        <UserContext.Provider value={{ user, logout, loginChange, registerChange, registerData }}>{children}</UserContext.Provider >
    )
}

export default UserContext