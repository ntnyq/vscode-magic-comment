//#region typescript
// @ts-check

// @ts-nocheck dummy

// @ts-ignore dummy

export const num = 25

// @ts-expect-error dummy
num = false
//#endregion

//#region unocss
// @unocss-include

/**
 * @unocss-include
 */

/**
 * @unocss-include
 *
 */
//#endregion

//#region vite
export const url = new URL('./workers', import.meta.url /* @vite-ignore */)
//#endregion

//#region custom
export const foobar = {
  foo: 'foo',
  // @perfectionist-group
  bar: 'bar',
}
//#endregion

//#region prettier
// prettier-ignore

// # prettier-ignore

// <!-- prettier-ignore -->

// <!-- prettier-ignore-attribute -->

// <!-- prettier-ignore-start -->

// <!-- prettier-ignore-end -->
//#endregion

//#region  biome
// biome-ignore lint
//#endregion

//#region case-police
// @case-police-ignore url
//#endregion

//#region autoprefixer
// /* autoprefixer: on */

// /* autoprefixer: off */

// /* autoprefixer: ignore next */
//#endregion

//#region compiler-hint
// /* #__PURE__ */

// /* @__PURE__ */

// /* #__NO_SIDE_EFFECTS__ */

// /* @__NO_SIDE_EFFECTS__ */
//#endregion

//#region v8
// /* v8 ignore next */
// /* v8 ignore next 10 */
// /* v8 ignore next dummy */

// /* v8 ignore start */
// /* v8 ignore start dummy*/

// /* v8 ignore stop */
// /* v8 ignore stop dummy */
//#endregion

//#region webpack
// /* webpackChunkName: dummy */
//#endregion

//#region dprint
// // dprint-ignore-file

// /* dprint-ignore */

// <!-- dprint-ignore -->

// <!-- dprint-ignore-start -->

// <!-- dprint-ignore-end -->
//#endregion

//#region stylelint
// /* stylelint-disable */
// /* stylelint-disable dummy*/

// /* stylelint-enable */
// /* stylelint-enable dummy*/

// /* stylelint-disable-line */
// /* stylelint-disable-line dummy*/

// /* stylelint-disable-next-line */
// /* stylelint-disable-next-line dummy*/
//#endregion

//#region vue
// <!-- @vue-skip -->
// <!-- @vue-skip dummy -->

// <!-- @vue-ignore -->
// <!-- @vue-ignore dummy -->

// <!-- @vue-generic -->
// <!-- @vue-generic dummy -->

// <!-- @vue-expect-error -->
// <!-- @vue-expect-error dummy -->
//#endregion

//#region cspell
// cSpell:disable
// spellchecker:disable
// spell-checker:disable

// cSpell: disable-line

// cSpell: disable-next-line

// cSpell:enable
// spellchecker:enable
// spell-checker:enable
//#endregion
