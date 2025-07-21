import React, {useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    
  });

  const value = {
    user,
    isLogin,
    isAdmin,
    setIsAdmin,
    setIsLogin,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};


export const useAuth = () =>{
    return useContext(AuthContext);
}
