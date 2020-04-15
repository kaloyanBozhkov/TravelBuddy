import { useEffect } from 'react'
/**
 * @param  {ref} parentRef -> parent ref
 * @param  {ref} childRef -> child elem to translate Y based on scroll
 */
const useTranslateDivWithScroll = (parentRef, childRef) => {
  useEffect(() => {
    const handler = () => handleScrollPosition(parentRef, childRef)

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [parentRef, childRef])
}

const handleScrollPosition = (parentRef, childRef) => {
  const { top, bottom, height } = parentRef.current.getBoundingClientRect()

  const hasReachedBottom = parseFloat(bottom) - parseFloat(childRef.current.offsetHeight) - 20 < 50
  const newTop = hasReachedBottom
    ? parseFloat(height) - parseFloat(childRef.current.offsetHeight) - 50
    : top < 0
    ? Math.floor(Math.abs(top))
    : 0
  childRef.current.style.transform = `translateY(${newTop}px)`
}

export default useTranslateDivWithScroll
