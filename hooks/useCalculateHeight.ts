import { useEffect } from 'react'

/**
 * Calculate height and assign to the given CSS variable
 *
 * reference: https://zenn.dev/tak_dcxi/articles/2ac77656aa94c2cd40bf
 *
 * @param {string} cssVarName
 */
export const useCalculateHeight = (cssVarName: string) => {
  useEffect(() => {
    /**
     * Assign height to CSS variable --vh
     *
     */
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty(cssVarName, `${vh}px`)
    }

    let vw = window.innerWidth;

    const handleResize = () => {
      if (vw === window.innerWidth) return

      vw = window.innerWidth
      setFillHeight()
    }

    window.addEventListener('resize', handleResize)

    // init
    setFillHeight()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
