import axios from 'axios'
// import { currentSession } from 'src/auth/authHandler'

class HttpService {
  service = null

  constructor() {
    this.service = axios.create()
    this.service.interceptors.response.use(this.handleSuccess, this.handleError)
  }

  sendRequest = async (config) => {
    // const sessionData = await currentSession()
    // config.headers = {
    //   Authorization: `Bearer ${sessionData.accessToken.jwtToken}`,
    // }
    return this.service.request(config)
  }

  handleSuccess = (res) => {
    return res?.data
  }

  handleError = (e) => {
    if (!e.response) {
      return {
        data: {
          success: false,
          message: 'Network Failure',
        },
      }
    }

    // throw e;
    // clear localstorage and redirect login (401 case)
   
    // switch (e.response.status) {
    //   case 502:
    //     window.location.replace('/500')
    //     break
    //   case 401:
    //     localStorage.clear()
    //     window.location.replace('/')
    //     break
    //   case 500:
    //     window.location.replace('/500')
    //     break
    //   default:
    //     throw e
    // }
  }
}

export default HttpService
