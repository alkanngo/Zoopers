import React, {useState} from "react";

// Create context to use state provided in MovieProvider
export const UserContext = React.createContext();

 // Provides the data, wrap whatever element you want to use this state in
export const UserProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </UserContext.Provider>
  );
}