import http  from '@/config/axios'

export function login(parm = {}) {
  return http({
      url: '/login',
      method: 'post',
      params: parm
  })
}