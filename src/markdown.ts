import { MarkdownString } from 'vscode'

export function getMarkdown(name: string) {
  if (!name) return

  return new MarkdownString(``)
}
