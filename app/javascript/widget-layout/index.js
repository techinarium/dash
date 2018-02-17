// Manages the layout of the dashboard

export default (function() {
  const widgets = []

  function update() {
    // Redo layout and make sure everything is rendered.

    widgets.forEach(w => {
      console.log('updating', w)
      w.render()
    })
  }

  return {
    add(widget) {
      const el = $('<div class="widget-root"></div>')
      $('#dashboard-widgets').append(el)

      console.log(widget, el)

      widget.init(el[0])
    },
    update
  }
})()
