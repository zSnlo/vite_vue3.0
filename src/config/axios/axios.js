import axios from 'axios'
import baseConfig from './config'

console.log(baseConfig)
// create an axios instance
const service = axios.create({
    baseURL: baseConfig.axios_baseURL_dev,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: baseConfig.axios_timeout||3000, // request timeout
    ...(baseConfig.axios_config||{})
})

// request interceptor
service.interceptors.request.use(
    config => {
        // 设置请求头
        config.headers['Authorization'] = sessionStorage.getItem('user_token') || ''
        config.headers["Content-Type"] = "application/json;charset=utf-8"
        // get 请求 添加时间戳
        if(config.method=='get'){
            let t=new Date().getTime()
            config.url+='?t='+t
        }
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
function apiAxios (method, url, params, type) {
    return new Promise((resolve, reject) => {
        service({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' || type === 'GET' ? params : null,
            params: method === 'GET' || method === 'DELETE' || type === 'POST' ? params : null,
        }).then(response => {
            resolve(response.data)
        }).catch(function (err) {
            reject(err.response)
        })
    })
}

const https = {
    get: function (url, params) {
        return apiAxios('GET', url, params)
    },
    post: function (url, params) {
        return apiAxios('POST', url, params)
    },
    put: function (url, params) {
        return apiAxios('PUT', url, params)
    },
    delete: function (url, params, type) {
        return apiAxios('DELETE', url, params, type)
    },
    /**
     *  添加拓展接口  type表示参数类型  GET表示get方式传参 POST表示post方式传参
     * */
    my: function (method, url, params, type) {
        return apiAxios(method, url, params, type)
    },
}

export default https