/**
 * @file markdown
 */

import { MarkdownString } from 'vscode'
import { enabledMagicComments } from '../config'
import { logger } from './logger'

/**
 * Get markdown info by magic comment name
 *
 * @param key - magic comment name
 * @returns - markdown info
 */
export function getMagicCommentMarkdown(key: string) {
  if (!key || !enabledMagicComments.value.length) {
    return
  }

  const matched = enabledMagicComments.value.find(mc => mc.name === key)

  if (!matched) {
    logger.error(`Magic comment '${key}' not found`)
    return
  }

  return new MarkdownString(
    [
      `- Name: ${matched.name}`,
      `- Category: ${matched.category || 'unknown'}`,
      `- URL: ${matched.url || 'unknown'}`,
      `- Description: ${matched.description || 'unknown'}`,
    ].join('\n'),
  )
}
