// Manages the layout of the dashboard

import DashMath from './dash-math.js'

let dragCoordOffset

function coordsInPixels({ x, y }, dashMath) {
  return {
    x: x * dashMath.unitSize,
    y: y * dashMath.unitSize
  }
}

function showGridGuide($guide = $('.dashboard-grid-square')) {
  if ($guide) {
    $guide.removeClass('hidden')
  }
}

function hideGridGuide($guide = $('.dashboard-grid-square')) {
  if ($guide) {
    $guide.addClass('hidden')
  }
}

function moveGridGuideTo({ x, y }, $guide = $('.dashboard-grid-square')) {
  if ($guide) {
    $guide.css({ transform: `translate(${x}px, ${y}px)`})
  }
}

function setGridGuideSize(w, h, $guide = $('.dashboard-grid-square')) {
  if ($guide) {
    $guide.css({ width: w + 'px', height: h + 'px' })
  }
}

function getDragCoords(e, $root, widget, unitSize, dragCoordOffset) {
  let x, y
  const { container } = widget.state
  const gridBounds = $root[0].getBoundingClientRect()

  x = e.clientX - gridBounds.left// - dragStartOffset.x
  y = e.clientY - gridBounds.top// - dragStartOffset.y

  x /= unitSize
  y /= unitSize

  // Throw away fractional component
  x = ~~x
  y = ~~y

  // Adjust for coord offset
  x -= dragCoordOffset.x
  y -= dragCoordOffset.y

  return { x, y }
}

function setUpEvents($el, $root, widget, dm, update) {
  let dragImage
  const $gridGuide = $('.dashboard-grid-square')

  $el.on('dragstart', function(e) {
    dragImage = dragImage || document.querySelector('#placeholder-pixel')
    e.originalEvent.dataTransfer.setDragImage(dragImage, 0, 0)
    $(this).addClass('dragging')

    const unitSize = dm.unitSize
    const [width, height] = widget.state.size
      .split('x')
      .map(n => parseInt(n) * unitSize)

    setGridGuideSize(width, height, $gridGuide)
    showGridGuide($gridGuide)

    dragCoordOffset = {
      x: ~~(e.offsetX / unitSize),
      y: ~~(e.offsetY / unitSize)
    }
  })

  $el.on('dragend', function(e) {
    e.originalEvent.preventDefault()
    $(this).removeClass('dragging')

    hideGridGuide($gridGuide)

    widget.coords = getDragCoords(e, $root, widget, dm.unitSize, dragCoordOffset)

    update()
  })

  let lastFire = 0
  let last = { x: null, y: null }
  $root.on('dragover', function(e) {
    const now = Date.now()
    // Debounce. Otherwise this event fires ridiculously often.
    if (now - lastFire > 60) {
      const coords = getDragCoords(e, $root, widget, dm.unitSize, dragCoordOffset)
      const coordsAreDifferent = !(coords.x === last.x && coords.y === last.y)

      if (coordsAreDifferent) {
        moveGridGuideTo(coordsInPixels(coords, dm), $gridGuide)

        last = coords
      }

      lastFire = now
    }
  })
}

export default function() {
  const widgets = []
  const $root = $('#dashboard-widgets')
  const $guide = $(`
    <div class="dashboard-grid-square">
      <div class="dashboard-grid-fill"></div>
    </div>`)
  $root.append($guide)
  const dm = DashMath($root)

  function update() {
    // Redo layout and make sure everything is rendered.

    widgets.forEach(w => {
      const { x, y } = coordsInPixels(w.coords || { x: 0, y: 0 }, dm)
      updateSize(w)
      w.state.container.style.transform = `translate(${x}px, ${y}px)`
      w.render()
    })
  }

  function add(widget) {
    const $el = $('<div class="widget-container"><div class="widget-root"></div></div>')
    $el.data('instance-id', widget.state.instanceID)
    $el.prop('draggable', true)
    $root.append($el)

    widgets.push(widget)

    // console.log(`${widgets.length} widget${widgets.length === 1 ? ' is' : 's are'} loaded`)

    setUpEvents($el, $root, widget, dm, update)
    widget.init($el[0])
    updateSize(widget)
  }

  function updateSize(widget) {
    const { container } = widget.state
    const unitSize = dm.unitSize
    const [w, h] = widget.state.size
      .split('x')
      .map(n => parseInt(n) * unitSize)

    container.width = w
    container.height = h
    container.style.width = w + 'px'
    container.style.height = h + 'px'
  }

  window.addEventListener('resize', () => {
    update()
  })

  return {
    add,
    updateSize,
    update
  }
}
