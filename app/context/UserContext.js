import React, {useState} from "react";

// Create context to use state provided in UserStateProvider
export const UserContext = React.createContext();

 // Provides the data, wrap whatever element you want to use this state in
export const GlobalStateProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [photoUrl , setPhotoUrl] = useState("");
  const [userProfile, setUserProfile] = useState({
    username: "",
    firstname: "",
    lastname: ""
  });
  const [choosenHoopLocationID, setChoosenHoopLocationID] = useState(0);
  const [sliderRadius, setSliderRadius] = useState(850);



  return (
    <UserContext.Provider 
      value={
        [isLoggedIn, setIsLoggedIn],
        [isSignedIn, setIsSignedIn],
        [photoUrl , setPhotoUrl],
        [userProfile, setUserProfile],
        [choosenHoopLocationID, setChoosenHoopLocationID],
        [sliderRadius, setSliderRadius]
      }
    >
      {props.children}
    </UserContext.Provider>
  );
}