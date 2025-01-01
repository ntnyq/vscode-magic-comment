/**
 * @file markdown
 */

import { MarkdownString } from 'vscode'
import { logger } from './logger'
import type { MagicComment } from '../types/core'

export function getMagicCommentMarkdown(
  magicComment: string,
  allMagicComments: MagicComment[] = [],
) {
  if (!magicComment || !allMagicComments.length) {
    return
  }

  const matched = allMagicComments.find(mc => mc.name === magicComment)

  if (!matched) {
    logger.error(`Magic comment '${magicComment}' not found`)
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
