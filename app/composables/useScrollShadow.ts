import type { CSSProperties, MaybeRef, MaybeRefOrGetter } from 'vue'
import { useScroll } from '@vueuse/core'
import { computed, toValue } from 'vue'

export interface UseScrollShadowOptions {
  /**
   * The shadow size in pixels.
   * @defaultValue 24
   */
  size?: MaybeRefOrGetter<number>
  /**
   * The scroll orientation to apply shadows.
   * @defaultValue 'vertical'
   */
  orientation?: MaybeRefOrGetter<'vertical' | 'horizontal'>
}

/**
 * Fades out (via CSS mask) the content near the edges of a scrollable element
 * while it can be scrolled in that direction. A graceful adaptation of
 * Nuxt UI's `useScrollShadow` composable.
 */
export function useScrollShadow(
  element: MaybeRef<HTMLElement | null | undefined>,
  options: UseScrollShadowOptions = {},
) {
  const { arrivedState } = useScroll(element)

  const style = computed<CSSProperties | undefined>(() => {
    const el = toValue(element)
    const horizontal = toValue(options.orientation) === 'horizontal'

    const startKey = horizontal ? 'left' : 'top'
    const endKey = horizontal ? 'right' : 'bottom'

    const showStart = !arrivedState[startKey]
    const showEnd = !arrivedState[endKey]

    if (!showStart && !showEnd) {
      return undefined
    }

    let scrollLength = 0
    let clientLength = 0
    if (el) {
      scrollLength = horizontal ? el.scrollWidth : el.scrollHeight
      clientLength = horizontal ? el.clientWidth : el.clientHeight
    }
    if (scrollLength <= clientLength) {
      return undefined
    }

    const size = `${toValue(options.size) ?? 24}px`
    const angle = horizontal ? '90deg' : '180deg'

    if (showStart && showEnd) {
      return {
        maskImage: `linear-gradient(${angle}, transparent, #000 ${size}, #000 calc(100% - ${size}), transparent)`,
      }
    }
    if (showStart) {
      return { maskImage: `linear-gradient(${angle}, transparent, #000 ${size})` }
    }
    return { maskImage: `linear-gradient(${angle}, #000, #000 calc(100% - ${size}), transparent)` }
  })

  const isOverflowing = computed(() => {
    // Read arrivedState to establish reactive dependency on scroll events
    void (arrivedState.top, arrivedState.bottom, arrivedState.left, arrivedState.right)

    const el = toValue(element)
    if (!el) {
      return false
    }

    const horizontal = toValue(options.orientation) === 'horizontal'
    return horizontal ? el.scrollWidth > el.clientWidth : el.scrollHeight > el.clientHeight
  })

  return {
    style,
    isOverflowing,
    arrivedState,
  }
}
