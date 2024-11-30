export interface MagicComment {
  /**
   * magic comment name
   */
  name: string

  /**
   * magic comment pattern
   */
  pattern: string | RegExp

  /**
   * magic comment category
   */
  category?: string

  /**
   * magic comment description
   */
  description?: string

  /***
   * magic comment examples
   */
  examples?: string[]

  /**
   * magic comment languages
   */
  languages?: string[]

  /**
   * magic comment url
   */
  url?: string
}
