import { request } from '../utils'

export function login (params) {
  return request('/api/login', {
    method: 'post',
    data: params
  })
}

export function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}
