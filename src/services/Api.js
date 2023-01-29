import axios from "axios";
//import TokenService from "./token.service";

import TokenService from "./TokenService";

import AppConfigData from "../hooks/AppConfigData";


const instance = axios.create({
  baseURL: AppConfigData.Backend_Url,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      //console.log("test x 0")
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
     //console.log("i am here 0");
    return res;
  },
  async (err) => {

    //console.log("i am here 1", err);


    if(!err.config){

      const new_error = {

        message : " Token Expired Requesting New Token  ",
        istokenReq : true
      }

      return Promise.reject(new_error);
    }


    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {

      //console.log("i am here 2");
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        //console.log("i am here 3");

        try {
          //console.log("i am here 4");
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          //console.log("i am here 5");

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {

          //console.log("i am here 6");
          return Promise.reject(_error);
        }
      }
    }

    //console.log("i am here 7");

    return Promise.reject(err);
  }
);

export default instance;
