import https  from '@/config/axios'


const loginUrl='/login'


export function login(parm = {}) {
  return https.post(loginUrl, parm)
}