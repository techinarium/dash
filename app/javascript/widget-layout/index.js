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
    const el = $('<div class="widget-root"></div>')
    el.data('instance-id', widget.state.instanceID)
    el.prop('draggable', true)
    $root.append(el)

    el.on('dragstart', function(e) {
      console.log('started dragging')
      $(this).addClass('dragging')
    })

    el.on('dragend', function(e) {
      console.log('stopped dragging')
      $(this).removeClass('dragging')
    })

    widgets.push(widget)

    console.log(`${widgets.length} widget${widgets.length === 1 ? ' is' : 's are'} loaded`)

    widget.init(el[0])
    updateSize(widget)
  }

  function updateSize(widget) {
    const [w, h] = widget.state.size.split('x').map(n => parseInt(n))
    const { root } = widget.state
    const unitSize = dm.unitSize

    console.log({
      width: w * unitSize,
      height: h * unitSize
    })

    // console.log(widget.state)
    console.log(widget.state, w, h)

    root.width = w * unitSize
    root.height = h * unitSize
    root.style.width = w * unitSize + 'px'
    root.style.height = h * unitSize + 'px'
  }

  return {
    add,
    updateSize,
    update
  }
}
