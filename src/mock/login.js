import Mock from 'mockjs'
import axiosC from '@/config/axios/config'
 
const user = Mock.mock({
  userName:'zhang',
  token:'962485450'
})
 
Mock.mock(axiosC.axios_baseURL_dev+'/login', 'post', ({body}) => {
  let result = {}
  const {name, password} = JSON.parse(body)
 
  if (name !== 'admin' || password !== '888888') {
    result.code = 404
    result.message = '账户名或密码错误（admin/888888）'
  } else {
    result.code = 200
    result.message = '张，欢迎回来'
    result.data = {}
    result.data.user = user
  }
  return result
})