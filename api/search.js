import request from '../utils/request.js'


export function getDefaultText() {
  return request({
    url: '/search/default-text',
  })
}
