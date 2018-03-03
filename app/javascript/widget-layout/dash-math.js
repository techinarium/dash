export default function($root, $grid) {
  let props = {}

  window.addEventListener('resize', () => {
    console.log('resized')
    recalculate()
  })

  function recalculate() {
    const width = $root.parent().width()
    let columns
    let unitSize

    if (width > 1200) {
      columns = 12
      unitSize = 100
    } else if (width > 800) {
      columns = 8
      unitSize = 100
    } else if (width > 600) {
      columns = 6
      unitSize = 100
    } else if (width > 400) {
      columns = 4
      unitSize = 100
    } else {
      columns = 2
      unitSize = width / columns
    }

    props.unitSize = unitSize
    props.columns = columns

    console.log('recalculated', props)
  }

  function showGrid() {
    $grid.find('.dashboard-grid-square')
      .width(props.unitSize)
      .height(props.unitSize)
    $grid.show()
  }

  function hideGrid() {
    $grid.hide()
  }

  function getUnitSize() {
    return props.unitSize || 100
  }

  recalculate()

  return {
    get unitSize() {
      return getUnitSize()
    },
    recalculate,
    showGrid,
    hideGrid
  }
}