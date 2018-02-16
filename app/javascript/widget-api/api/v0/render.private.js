export default function(state) {
  return function(root) {
    state.root = root || state.root

    const layouts = state.layouts
      .filter(l => l.size === state.size)

    while (root.children[0]) {
      root.removeChild[root.children[0]]
    }

    root.appendChild(layouts[0].render())
  }
}
