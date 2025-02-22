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
