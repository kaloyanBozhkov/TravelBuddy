import { useEffect } from 'react'
import useWidnowWidth from './useWindowWidth'
/**
 * @param  {ref} parentRef -> parent ref
 * @param  {ref} childRef -> child elem to translate Y based on scroll
 * @param  {number} margin -> any margin to add for when to stop scrollign the child in parent?
 */
const useTranslateDivWithScroll = ({ parentRef, childRef, margin = 0, stopAt = 575 }) => {
  const windowWidth = useWidnowWidth()
  useEffect(() => {
    if (windowWidth > stopAt) {
      const handler = () => handleScrollPosition(parentRef, childRef, margin)

      window.addEventListener('scroll', handler)
      window.addEventListener('load', handler)

      return () => {
        window.removeEventListener('scroll', handler)
        window.removeEventListener('load', handler)
      }
    } else {
      childRef.current.style.transform = ''
    }
  }, [parentRef, childRef, margin, windowWidth, stopAt])
}

const handleScrollPosition = (parentRef, childRef, margin) => {
  const { top, bottom, height } = parentRef.current.getBoundingClientRect()

  const hasReachedBottom = parseFloat(bottom) - parseFloat(childRef.current.offsetHeight) < margin
  const newTop = hasReachedBottom
    ? parseFloat(height) - parseFloat(childRef.current.offsetHeight) - margin
    : top < 0
    ? Math.floor(Math.abs(top))
    : 0
  childRef.current.style.transform = `translateY(${newTop}px)`
}

export default useTranslateDivWithScroll

/*
  // make sure to trigger the scroll event when the parent div size changes (becomes smaller for example), in order to update the child's position again!
  E.g. 
  useLayoutEffect(() => {
    window.scrollBy(0, 0)
  }, [destinations])

*/
