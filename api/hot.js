import request from "../utils/request";

/**
 * 热搜文章类型
 */
export function getHotTabs() {
  return request({
    url: '/hot/tabs'
  })
}

/**
 * @param {Object} type热搜文章列表
 */
export function getHotListFormTabType(type) {
  return request({
    url: '/hot/list',
    data: {
      type
    }
  })
}
