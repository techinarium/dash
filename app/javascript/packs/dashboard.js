/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import API from '../widget-api'
import Layout from '../widget-layout'

$(document).on('turbolinks:load', () => {
  const { on } = API.private
  const Dash = API.public
  let widgets = []

  const layout = Layout()

  // on('widgetCreated', widget => {
//     console.log('widget', widget)
//     Layout.add(widget)
//   })

  function loadAllWidgetInstances() {
    // Get all widget instances for the current user and load
    // whatever is needed to get them up and running in the dashboard.
    $.get('/widget_instances.json').done(instances => {
      instances.forEach(instance => {
        loadWidgetInstance(instance)
      })
    }).fail(err => {
      console.error(err)
    })
  }

  function loadWidgetInstance(instance) {
    $.get(`/widgets/${instance.widget_id}.json`).done(value => {
      const latestCode = value.codes
        .sort((a, b) => a.updated_at > b.updated_at ? 1 : -1)[0]

      if (latestCode) {
        const widget = eval(latestCode.widget_code)
        widget.state.instanceID = instance.id
        widget.state.widgetID = instance.widget_id
        widget.state.data = typeof instance.data === 'string'
          ? JSON.parse(instance.data)
          : instance.data

        if (instance.size_x && instance.size_y) {
          widget.state.size = instance.size_x + 'x' + instance.size_y
        }

        widgets.push(widget)
        layout.add(widget)

        widget.on('destroyRequested', loadedInstance => {
          console.log(`widget instance ${loadedInstance} requested self destruct`)
          widget.state.root.parentNode.removeChild(widget.state.root)
          widgets = widgets.filter(w => w !== widget)
          destroyWidgetInstance(loadedInstance)
        })

        widget.on('dataChanged', state => {
          console.log('data changed', state)
        })

        widget.on('sizeChanged', state => {
          layout.updateSize(widget)
        })

        widget.on('stateChanged', state => {
          const [size_x, size_y] = state.size.split('x').map(n => parseInt(n))
          const sendable = {
            data: state.data,
            size_x,
            size_y,
            coord_x: 0,
            coord_y: 0,
          }

          $.ajax(`/widget_instances/${instance.id}.json`, {
            method: 'PATCH',
            data: {
              widget_instance: sendable
            }
          }).done(response => {
            console.log('saved instance data', response)
          }).fail(err => {
            console.error(err)
          })
        })

      } else {
        alert('No loadable version of the widget code')
      }
    }).fail(err => {
      console.error(err)
      alert(err)
    })
  }
  
  function createWidgetInstance(id) {
    $.post(`/widget_instances.json`, {
      widget_instance: {
        widget_id: id,
        data: {}
      }
    }).done(result => {
      loadWidgetInstance(result)
    }).fail(err => {
      console.error(err)
    })
  }
  
  function destroyWidgetInstance(instanceID) {
    $.ajax({
      url: `/widget_instances/${instanceID}.json`,
      method: 'DELETE'
    }).done(() => {
      console.log('Removed widget instance', instanceID)
    }).fail(err => {
      console.error('Failed to remove widget instance', instanceID, error)
    })
  }

  window.DashControl = {
    createWidgetInstance,
    destroyWidgetInstance,
    loadAllWidgetInstances,
  }
  window.Dash = Dash
  console.log('Dash widget API loaded')
  
  // Try to load all widget instances
  // to populate the dashboard.
  loadAllWidgetInstances()
})
