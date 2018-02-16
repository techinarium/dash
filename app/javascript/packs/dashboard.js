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

$(() => {
  const { on } = API.private
  const Dash = API.public

  on('widgetCreated', widget => {
    console.log('widget', widget)
    Layout.add(widget)
  })

  window.Overlord = {
    loadWidget(id) {
      console.log('loading widget', id)

      $.get(`/widgets/${id}.json`).done(value => {
        const latestCode = value.codes
          .sort((a, b) => a.updated_at > b.updated_at ? 1 : -1)
          [0]

        if (latestCode) {
          eval(latestCode.widget_code)
        } else {
          alert('No loadable version of the widget code')
        }
      }).fail(err => {
        console.error(err)
      })
    }
  }
  window.Dash = Dash
  console.log('Dash widget API loaded')
})
