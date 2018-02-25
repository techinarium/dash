import _data from './data.js'
import _element from './element.js'
import _layout from './layout.js'
import _events from './events.js'
import _render from './render.private.js'

export default function() {
  // Mutable state object shared by the API functions
  const state = {
    dom: null, // Root node resulting from layout.render()
    root: null, // Container that 'dom' gets attached to
    size: null,
    data: {},
    layouts: []
  }

  const events = _events(state)
  const render = _render(state, events)
  const data = _data(state, events)
  const element = _element(state, events)

  const { layout, setLayout } = _layout(state, events)

  events.on('setLayout', () => {
    render()
  })

  return {
    private: {
      // This is where the internal lifecycle triggers and things might go
      // Stuff that's used by Dash behind the scenes
      get state() {
        return state
      },
      sizes() {
        return state.layouts.map(l => l.size)
      },
      on(event, func) {
        events.on(event, func)
      },
      once(event, func) {
        events.once(event, func)
      },
      init(root) {
        data._load()
        state.size = '2x2'
        render(root)
      },
      setCoords(x, y) {
        state.coords = { x, y }
      },
      render,
    },
    public: {
      get dom() {
        return state.dom
      },
      get size() {
        return state.size
      },
      set size(value) {
        const isValid = ['1x1', '1x2', '2x1', '2x2'].includes(value.toLowerCase())
        const hasLayout = state.layouts.map(s => s.size).includes(value)

        if (isValid && hasLayout) {
          state.size = value
          events.emit('setSize', state)
          render()
        } else {
          if (!isValid) {
            throw new Error(`Can't set size to ${value}: must be one of these strings: '1x1', '1x2', '2x1', '2x2'`)
          }

          if (!hasLayout) {
            throw new Error(`Can't set size to ${value}: No layouts defined for that size.`)
          }
        }
      },
      data: {
        get: data.get,
        set: data.set,
      },
      element,
      layout,
      setLayout,
    },
  }
}
