export interface MagicComment {
  /**
   * magic comment name
   */
  name: string

  /**
   * magic comment patterns
   */
  patterns: string | RegExp | RegExp[] | string[]

  /**
   * magic comment category
   */
  category?: string

  /**
   * magic comment description, markdown is supported
   */
  description?: string

  /**
   * magic comment url
   */
  url?: string
}
