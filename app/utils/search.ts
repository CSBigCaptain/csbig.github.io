import type { FuseResultMatch } from 'fuse.js'

/**
 * @description 将 Fuse.js 匹配到的区间用 <span class="highlight"> 包裹，生成高亮 HTML
 * @param text 原始文本
 * @param matches Fuse.js 返回的匹配信息
 * @param key 需要高亮的字段名
 * @returns 带有高亮标签的 HTML 字符串
 */
export function highlightMatch(
  text: string,
  matches: readonly FuseResultMatch[] | undefined,
  key: string,
): string {
  // 如果没有文本或匹配信息，直接返回原文本
  if (!text || !matches)
    return text

  // 查找对应字段的匹配信息
  const match = matches.find(m => m.key === key)
  if (!match || !match.indices || !match.indices.length)
    return text

  // 根据匹配索引构建高亮文本
  let result = ''
  let lastIndex = 0

  // 按顺序处理每个匹配区间
  match.indices.forEach(([start, end]) => {
    // 添加匹配前的文本
    result += text.substring(lastIndex, start)
    // 添加带高亮的匹配文本
    result += `<span class="highlight">${text.substring(start, end + 1)}</span>`
    // 更新上次处理位置
    lastIndex = end + 1
  })

  // 添加最后一个匹配后的文本
  result += text.substring(lastIndex)

  return result
}
