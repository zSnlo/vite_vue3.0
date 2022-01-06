import https  from '@/config/axios'


const loginUrl='/login'


export function about(parm = {}) {
  return https.post(loginUrl, parm)
}