import request from '../utils/request.js'


export function getDefaultText() {
  return request({
    url: '/search/default-text',
  })
}


export function getSearchHotList() {
  return request({
    url: '/search/hot-list',
  })
}


export function getSearchResult(data) {
  return request({
    url: '/search',
    data
  })
}
