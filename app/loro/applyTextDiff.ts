import type { LoroText } from 'loro-crdt'
import fastDiff from 'fast-diff'

/** Apply a plain-string edit (UTF-16 indices) onto Loro text. */
export function applyTextDiff(text: LoroText, oldStr: string, newStr: string) {
  if (oldStr === newStr) return
  const d = fastDiff(oldStr, newStr)
  let pos = 0
  for (const [op, str] of d) {
    if (op === 0) {
      pos += str.length
    } else if (op === 1) {
      text.insert(pos, str)
      pos += str.length
    } else {
      text.delete(pos, str.length)
    }
  }
}
