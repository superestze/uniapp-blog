import request from '../utils/request.js'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}


/**
 * 关注用户
 */
export function userFollow(data) {
  return request({
    url: '/user/follow',
    data
  });
}
