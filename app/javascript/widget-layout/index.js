// Manages the layout of the dashboard

import DashMath from './dash-math.js'

export default function() {
  const widgets = []
  const $root = $('#dashboard-widgets')
  const dm = DashMath($root)

  function update() {
    // Redo layout and make sure everything is rendered.

    widgets.forEach(w => {
      console.log('updating', w)
      updateSize(w)
      w.render()
    })
  }

  function add(widget) {
    const el = $('<div class="widget-container"><div class="widget-root"></div></div>')
    el.data('instance-id', widget.state.instanceID)
    el.prop('draggable', true)
    $root.append(el)

    let dragStartOffset

    el.on('dragstart', function(e) {
      console.log('started dragging')
      $(this).addClass('dragging')

      let x, y
      const unitSize = dm.unitSize
      const gridBounds = $root[0].getBoundingClientRect()

      x = e.clientX - e.offsetX - gridBounds.left
      y = e.clientY - e.offsetY - gridBounds.top

      x /= unitSize
      y /= unitSize

      x = ~~x
      y = ~~x

      console.log(`Started at (${x},${y})`)

      dragStartOffset = {
        x: e.offsetX,
        y: e.offsetY
      }
    })

    el.on('dragend', function(e) {
      console.log('stopped dragging')
      $(this).removeClass('dragging')

      let x, y
      const unitSize = dm.unitSize
      const gridBounds = $root[0].getBoundingClientRect()
      const { container } = widget.state

      x = e.clientX - gridBounds.left
      y = e.clientY - gridBounds.top

      x /= unitSize
      y /= unitSize

      // Throw away fractional component
      x = ~~x
      y = ~~y

      console.log(`Ended at (${x}, ${y})`)

      container.style.transform = `translate(${x * unitSize}px, ${y * unitSize}px)`
    })

    let lastFire = 0
    $root.on('dragover', function(e) {
      const now = Date.now()
      // Debounce. Otherwise this event fires ridiculously often.
      if (now - lastFire > 100) {
        console.log('dragging over grid')

        lastFire = now
      }
    })

    widgets.push(widget)

    console.log(`${widgets.length} widget${widgets.length === 1 ? ' is' : 's are'} loaded`)

    widget.init(el[0])
    updateSize(widget)
  }

  function updateSize(widget) {
    const [w, h] = widget.state.size.split('x').map(n => parseInt(n))
    const { container } = widget.state
    const unitSize = dm.unitSize

    container.width = w * unitSize
    container.height = h * unitSize
    container.style.width = w * unitSize + 'px'
    container.style.height = h * unitSize + 'px'
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
