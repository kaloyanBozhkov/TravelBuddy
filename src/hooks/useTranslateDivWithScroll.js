import { useEffect } from 'react'
/**
 * @param  {ref} parentRef -> parent ref
 * @param  {ref} childRef -> child elem to translate Y based on scroll
 */
const useTranslateDivWithScroll = (parentRef, childRef) => {
  const handleScrollPosition = () => {
    const { top, bottom, height } = parentRef.current.getBoundingClientRect()
    console.log(top, bottom)

    const hasReachedBottom = parseFloat(bottom) - parseFloat(childRef.current.offsetHeight) - 20 < 0
    const newTop = hasReachedBottom
      ? parseFloat(height) - parseFloat(childRef.current.offsetHeight) - 50
      : top < 0
      ? Math.floor(Math.abs(top))
      : 0
    childRef.current.style.transform = `translateY(${newTop}px)`
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosition)

    return () => window.removeEventListener('scroll', handleScrollPosition)
  }, [])
}

export default useTranslateDivWithScroll
