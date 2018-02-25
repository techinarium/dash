export default function($root) {
  window.addEventListener('resize', () => {
    console.log('resized')
    recalculate()
  })

  function recalculate() {

  }

  function showGrid() {

  }

  function hideGrid() {

  }

  function getUnitSize() {
    return 100
  }

  return {
    get unitSize() {
      return getUnitSize()
    }
  }
}