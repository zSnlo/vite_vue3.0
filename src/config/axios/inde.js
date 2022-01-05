import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/api', 
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
      // config.headers['Authorization'] = sessionStorage.getItem('user_token') || ''
      // if(config.method=='get'){
      //     let t=new Date().getTime()
      //     config.url+='?t='+t
      // }
      return config
  },
  error => {
      return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
      const res = response.data
          //文件下载
      const headers = response.headers
      if (headers['content-type'] === 'application/octet-stream') {
          return res
      }
      //json报文
      // if the custom code is not 200, it is judged as an error.
      if (res.code !== 200) {
          console.log(res)

          return Promise.reject(new Error(res.message || 'Error'))
      } else {

          return res
      }
  },
  error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
  }
)

export default service