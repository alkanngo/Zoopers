import React, {useState} from "react";

// Create context to use state provided in MovieProvider
export const UserContext = React.createContext();

 // Provides the data, wrap whatever element you want to use this state in
export const UserProvider = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <UserContext.Provider value={[email, setEmail], [password, setPassword]}>
            {props.children}
        </UserContext.Provider>
    );
}