export function hotNumber(val) {
  const num = parseInt(val)
  if (val < 1000) {
    return val
  }
  val = val + ''
  return val.substring(0, val.length - 3) + 'k'
}
