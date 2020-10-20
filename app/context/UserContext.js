import React, {useState} from "react";

// Create context to use state provided in MovieProvider
export const UserContext = React.createContext();

 // Provides the data, wrap whatever element you want to use this state in
export const UserProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl , setPhotoUrl] = useState(false);
  const [choosenHoopLocation, setChoosenHoopLocation] = useState("");
  const [sliderRadius, setSliderRadius] = useState(850);



  return (
    <UserContext.Provider value={
        [isLoggedIn, setIsLoggedIn],
        [isSignedIn, setIsSignedIn],
        [name, setName],
        [photoUrl , setPhotoUrl],
        [choosenHoopLocation, setChoosenHoopLocation],
        [sliderRadius, setSliderRadius]
      }>
      {props.children}
    </UserContext.Provider>
  );
}