/**
 * @file types
 */

import type { DecorationOptions } from 'vscode'

export interface DecorationMatch extends DecorationOptions {
  /**
   * magic comment name
   */
  magicComment: string
}
