import { MarkdownString } from 'vscode'
import type { MagicCommentInfo } from '../core'

export function createCommentHover(
  comments: readonly MagicCommentInfo[],
): MarkdownString {
  const markdown = new MarkdownString()
  comments.forEach((comment, index) => {
    if (index) {
      markdown.appendMarkdown('\n\n---\n\n')
    }
    markdown.appendText(
      `Name: ${comment.name}\nCategory: ${comment.category ?? 'unknown'}\nURL: ${comment.url ?? 'unknown'}\n`,
    )
    markdown.appendMarkdown(`\n\n${comment.description ?? ''}`)
  })
  markdown.isTrusted = false
  return markdown
}
