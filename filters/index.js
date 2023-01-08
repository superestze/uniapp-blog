import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(rTime)

export function relativeTime(val) {
  return dayjs().to(dayjs(val))
}

export function hotNumber(val) {
  const num = parseInt(val)
  if (val < 1000) {
    return val
  }
  val = val + ''
  return val.substring(0, val.length - 3) + 'k'
}
