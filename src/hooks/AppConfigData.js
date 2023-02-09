


const IdleTimer = 1000 * 1 * 7200; //5 hours idle timer

const ApiRequestInterval =  1000 * 30 * 1; // 30 seconds 

const Backend_Url = "https://riviruapi4.escarta.lk/api"
//const Backend_Url = "http://localhost:5000/api";  ///"http://localhost:5000/api",

//const Backend_Url = "http://localhost:5000/api"; 


const Backend_Url_Proxy = "https://riviruapi4.escarta.lk/";  

// const Backend_Url_Proxy = "http://localhost:5000";  


const AppConfigData = {
  IdleTimer,
  ApiRequestInterval,
  Backend_Url,
  Backend_Url_Proxy,
};


export default AppConfigData;