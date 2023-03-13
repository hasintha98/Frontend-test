//import axios from "axios";


import Api from "./Api"

import TokenService from "./TokenService";

const register = async(username, email, password, roles, active) => {
  const response = await Api.post("/auth/signUp", {
    username,
    email,
    password,
    roles,
    active,
  });

  return response;
};

const login = async (name, password) => {
  const response = await Api.post("/auth/signIn", {
    name,
    password,
  });

  //console.log("user ->", response.data);
  if (response.data.accessToken) {
    response.data['pin'] = { navigation: false, actions: false }
    TokenService.setUser(response.data);
  }
  return response;
};

const logout = async () => {
  TokenService.removeUser();

  const response = await Api.post("/auth/signOut");
  
};

const getCurrentUser = () => {

  ////////////////console.log("here 11")
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
