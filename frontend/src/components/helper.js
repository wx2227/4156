export default function startsWith2 (haystack, needles) {
  let i = needles.length
  while (i-- > 0) {
    if (haystack.lastIndexOf(needles[i], 0) === 0) { return true }
  }
  return false
}