const letters = '0123456789ABCDEF'
const randomColor = () =>
  '#' +
  Array(6)
    .fill(undefined)
    .map(() => letters[Math.floor(Math.random() * 16)])
    .join('')
export default randomColor
