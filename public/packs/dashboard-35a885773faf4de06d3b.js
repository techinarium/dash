/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/element.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = (function (state) {
  function _applyStyles(el, styles) {
    for (var prop in styles) {
      var name = prop.replace(/([a-z\d])([A-Z])/, '$1-$2').toLowerCase();

      // console.log('style: ', name, styles[prop])

      el.style[name] = styles[prop];
    }
  }

  function _attachHandler(el, name, handler) {
    // Handle properties starting with 'on'

    var eventName = name.slice(2).toLowerCase();

    // console.log(eventName)

    el.addEventListener(eventName, handler);
  }

  function _attachChildren(el) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    children.forEach(function (child) {
      if (typeof child === 'string') {
        child = text(child);
      }

      try {
        el.appendChild(child);
      } catch (err) {
        console.warn('failed to attach child', child, 'to parent', el, err);
      }
    });
  }

  function _applyAttribute(el, name, value) {
    switch (name.toLowerCase()) {
      default:
        el.setAttribute(name, value);
        break;
    }
  }

  function _applyProps(el, props) {
    for (var key in props) {
      var k = key.toLowerCase();

      if (/^on/.test(k)) {
        // Is an event handler
        _attachHandler(el, key, props[key]);
      } else if (k === 'styles') {
        _applyStyles(el, props[key]);
      } else {
        // Treat as a regular attribute.
        _applyAttribute(el, key, props[key]);
      }
    }
  }

  function _el(tag, props, children) {
    // console.log('creating element', tag, props, children)

    // Create DOM nodes.
    var el = document.createElement(tag);
    if (props) {
      if (Array.isArray(props) && !children) {
        // Assume children was passed as the second prop.
        children = props;
        props = null;
      } else if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object') {
        _applyProps(el, props);
      }
    }
    if (children && !Array.isArray(children)) {
      children = [children];
    }
    _attachChildren(el, children);
    return el;
  }

  function textbox(props, value) {
    var el = _el('textarea', props);

    _applyStyles(el, {
      position: 'relative',
      border: 0,
      resize: 'none'
    });

    if (typeof value === 'string') {
      el.value = value;
    }

    return el;
  }

  function text(value) {
    // console.log('Instantiating a text element')

    return document.createTextNode(value);
  }

  return {
    text: text,
    textbox: textbox,
    RAW: _el
  };
});

/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/events.js ***!
  \****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = events;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function events() {
  var listeners = {};

  return {
    on: function on(event, func) {
      if (!listeners[event]) {
        listeners[event] = [];
      }

      listeners[event].push(func);
    },
    once: function once(event, func) {
      if (!listeners[event]) {
        listeners[event] = [];
      }

      var selfDestruct = function selfDestruct() {
        func.apply(undefined, arguments);
        listeners[event] = listeners[event].filter(function (f) {
          return f !== selfDestruct;
        });
        console.log('once listener self destructed');
      };

      listeners[event].push(selfDestruct);
    },
    emit: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      if (listeners[event]) {
        listeners[event].forEach(function (func) {
          return func.apply(undefined, _toConsumableArray(data));
        });
      }
    }
  };
}

/***/ }),
/* 2 */,
/* 3 */
/*!*******************************************!*\
  !*** ./app/javascript/packs/dashboard.js ***!
  \*******************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__widget_api__ = __webpack_require__(/*! ../widget-api */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget_layout__ = __webpack_require__(/*! ../widget-layout */ 9);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb




$(document).on('turbolinks:load', function () {
  var on = __WEBPACK_IMPORTED_MODULE_0__widget_api__["a" /* default */].private.on;

  var Dash = __WEBPACK_IMPORTED_MODULE_0__widget_api__["a" /* default */].public;
  var widgets = [];

  var layout = Object(__WEBPACK_IMPORTED_MODULE_1__widget_layout__["a" /* default */])();

  // on('widgetCreated', widget => {
  //     console.log('widget', widget)
  //     Layout.add(widget)
  //   })

  function loadAllWidgetInstances() {
    // Get all widget instances for the current user and load
    // whatever is needed to get them up and running in the dashboard.
    $.get('/widget_instances.json').done(function (instances) {
      instances.forEach(function (instance) {
        loadWidgetInstance(instance);
      });
    }).fail(function (err) {
      console.error(err);
    });
  }

  function loadWidgetInstance(instance) {
    $.get('/widgets/' + instance.widget_id + '.json').done(function (value) {
      var latestCode = value.codes.sort(function (a, b) {
        return a.updated_at > b.updated_at ? 1 : -1;
      })[0];

      if (latestCode) {
        var widget = eval(latestCode.widget_code);
        widget.state.instanceID = instance.id;
        widget.state.widgetID = instance.widget_id;
        widget.state.data = instance.data;

        widget.coords = {
          x: instance.coord_x,
          y: instance.coord_y
        };

        if (instance.size_x && instance.size_y) {
          widget.state.size = instance.size_x + 'x' + instance.size_y;
        }

        widgets.push(widget);
        layout.add(widget);

        widget.on('destroyRequested', function (loadedInstance) {
          console.log('widget instance ' + loadedInstance + ' requested self destruct');
          widget.state.root.parentNode.removeChild(widget.state.root);
          widgets = widgets.filter(function (w) {
            return w !== widget;
          });
          destroyWidgetInstance(loadedInstance);
        });

        widget.on('dataChanged', function (state) {
          console.log('data changed', state);
        });

        widget.on('sizeChanged', function (state) {
          layout.updateSize(widget);
        });

        widget.on('stateChanged', function (state) {
          var _state$size$split$map = state.size.split('x').map(function (n) {
            return parseInt(n);
          }),
              _state$size$split$map2 = _slicedToArray(_state$size$split$map, 2),
              size_x = _state$size$split$map2[0],
              size_y = _state$size$split$map2[1];

          var _state$coords = state.coords,
              x = _state$coords.x,
              y = _state$coords.y;

          var sendable = {
            data: state.data,
            size_x: size_x,
            size_y: size_y,
            coord_x: x,
            coord_y: y
          };

          $.ajax('/widget_instances/' + instance.id + '.json', {
            method: 'PATCH',
            data: {
              widget_instance: sendable
            }
          }).done(function (response) {
            console.log('saved instance data', response);
          }).fail(function (err) {
            console.error(err);
          });
        });
      } else {
        alert('No loadable version of the widget code');
      }
    }).fail(function (err) {
      console.error(err);
      alert(err);
    });
  }

  function createWidgetInstance(id) {
    $.post('/widget_instances.json', {
      widget_instance: {
        widget_id: id,
        data: {}
      }
    }).done(function (result) {
      loadWidgetInstance(result);
    }).fail(function (err) {
      console.error(err);
    });
  }

  function destroyWidgetInstance(instanceID) {
    $.ajax({
      url: '/widget_instances/' + instanceID + '.json',
      method: 'DELETE'
    }).done(function () {
      console.log('Removed widget instance', instanceID);
    }).fail(function (err) {
      console.error('Failed to remove widget instance', instanceID, error);
    });
  }

  window.DashControl = {
    createWidgetInstance: createWidgetInstance,
    destroyWidgetInstance: destroyWidgetInstance,
    loadAllWidgetInstances: loadAllWidgetInstances
  };
  window.Dash = Dash;
  console.log('Dash widget API loaded');

  // Try to load all widget instances
  // to populate the dashboard.
  loadAllWidgetInstances();
});

/***/ }),
/* 4 */
/*!********************************************!*\
  !*** ./app/javascript/widget-api/index.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_v0_index_js__ = __webpack_require__(/*! ./api/v0/index.js */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_v0_events_js__ = __webpack_require__(/*! ./api/v0/events.js */ 1);



var APIs = {
  'v0': __WEBPACK_IMPORTED_MODULE_0__api_v0_index_js__["a" /* default */]

  /*
  
  We want to:
  - Load a widget and its code from the database
  - Execute the widget's code, which sets up the widget
  - Hook the widget setup and restore any saved state
  - Create a grid element for the widget
  - run the widget's setLayout function, which
    calls render() on whichever layout is being set.
  - Take the result of render() and attach to the grid element
  */

  // The public Dash.* API globally available to Dash developers.
};/* harmony default export */ __webpack_exports__["a"] = ((function () {

  var events = Object(__WEBPACK_IMPORTED_MODULE_1__api_v0_events_js__["a" /* default */])();

  function widget(apiVersion, setupFunction) {
    var version = void 0;

    // Make sure apiVersion is a string and the version exists.

    if (typeof apiVersion !== 'string' || apiVersion.toLowerCase()[0] !== 'v') {
      throw new Error('First parameter should be the Widget API version in the vX format: v0, v1, v2, etc.');
    }

    version = apiVersion.toLowerCase();

    if (!APIs[version]) {
      throw new Error('API version ' + apiVersion + ' does not exist. Available: ' + Object.keys(APIs).join(', '));
    }

    // Make sure the setupFunction is a function.

    if (typeof setupFunction !== 'function') {
      throw new Error('Second parameter should be a function that sets up the widget: function(widget) { ... }');
    }

    // The API is called as a function to create a brand new copy for each widget.
    // Each widget will have an ID from the database - for now using 123
    var api = new APIs[version]();

    // TODO: Make the private portion available to the behind-the-scenes dashboard code

    // Send off the public portion to the caller.
    setupFunction.call(null, api.public);

    events.emit('widgetCreated', api.private);

    return api.private;
  }

  return {
    private: {
      on: function on(event, func) {
        events.on(event, func);
      }
    },
    public: { widget: widget }
  };
})());

/***/ }),
/* 5 */
/*!***************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/index.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_js__ = __webpack_require__(/*! ./data.js */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_js__ = __webpack_require__(/*! ./element.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_js__ = __webpack_require__(/*! ./layout.js */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_js__ = __webpack_require__(/*! ./events.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_private_js__ = __webpack_require__(/*! ./render.private.js */ 8);






/* harmony default export */ __webpack_exports__["a"] = (function () {
  // Mutable state object shared by the API functions
  var state = {
    container: null,
    dom: null, // Root node resulting from layout.render()
    root: null, // Container that 'dom' gets attached to
    isRendered: false,
    size: null,
    data: {},
    layouts: []
  };

  var events = Object(__WEBPACK_IMPORTED_MODULE_3__events_js__["a" /* default */])(state);
  var render = Object(__WEBPACK_IMPORTED_MODULE_4__render_private_js__["a" /* default */])(state, events);
  var data = Object(__WEBPACK_IMPORTED_MODULE_0__data_js__["a" /* default */])(state, events);
  var element = Object(__WEBPACK_IMPORTED_MODULE_1__element_js__["a" /* default */])(state, events);

  var _layout2 = Object(__WEBPACK_IMPORTED_MODULE_2__layout_js__["a" /* default */])(state, events),
      layout = _layout2.layout,
      setLayout = _layout2.setLayout;

  events.on('setLayout', function () {
    render();
    events.emit('stateChanged', state);
  });

  events.on('sizeChanged', function () {
    events.emit('stateChanged', state);
  });

  events.on('coordsChanged', function () {
    events.emit('stateChanged', state);
  });

  return {
    private: {
      // This is where the internal lifecycle triggers and things might go
      // Stuff that's used by Dash behind the scenes
      get state() {
        return state;
      },
      sizes: function sizes() {
        return state.layouts.map(function (l) {
          return l.size;
        });
      },
      on: function on(event, func) {
        events.on(event, func);
      },
      once: function once(event, func) {
        events.once(event, func);
      },
      init: function init(container) {
        if (!state.data || Object.keys(state.data).length === 0) data._load();
        state.size = state.size || (state.layouts.find(function (l) {
          return l.default;
        }) || state.layouts[0]).size;

        state.container = container;
        state.root = container.querySelector('.widget-root');

        render();
      },

      set coords(val) {
        state.coords = {
          x: val.x,
          y: val.y
        };
        events.emit('coordsChanged', state);
      },
      get coords() {
        return state.coords;
      },
      render: render
    },
    public: {
      get dom() {
        return state.dom;
      },
      get size() {
        return state.size;
      },
      set size(value) {
        var isValid = ['1x1', '1x2', '2x1', '2x2'].includes(value.toLowerCase());
        var hasLayout = state.layouts.map(function (s) {
          return s.size;
        }).includes(value);

        if (isValid && hasLayout) {
          state.size = value;
          events.emit('sizeChanged', state);
          render();
        } else {
          if (!isValid) {
            throw new Error('Can\'t set size to ' + value + ': must be one of these strings: \'1x1\', \'1x2\', \'2x1\', \'2x2\'');
          }

          if (!hasLayout) {
            throw new Error('Can\'t set size to ' + value + ': No layouts defined for that size.');
          }
        }
      },
      data: {
        get: data.get,
        set: data.set
      },
      element: element,
      layout: layout,
      setLayout: setLayout
    }
  };
});

/***/ }),
/* 6 */
/*!**************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/data.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = (function (state, events) {

  if (!state.data) state.data = {};

  function _save() {
    localStorage.setItem('widget_instance_' + state.instanceID + '_data', JSON.stringify(state.data));

    // console.log('saved', state.data)
  }

  function _load() {
    state.data = JSON.parse(localStorage.getItem('widget_instance_' + state.instanceID + '_data') || '{}');

    // console.log('loaded', state.data)
  }

  function get(property) {
    if (Array.isArray(property)) {
      // Take an array, return an array.
      return property.map(function (p) {
        return state.data[p];
      });
    } else if (typeof property === 'string') {
      // Take a string, return a value.
      return state.data[property];
    } else {
      throw new Error('data.get() takes either an array or a string as the first parameter. Received ' + (typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter)));
    }
  }

  function set(property, value) {
    // Takes a name and a value, or an object of names and values to update.

    if ((typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object') {
      if (typeof value !== 'undefined') {
        throw new Error('data.set() takes either a string and a value, or an object. Received an object as the first parameter and a ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + ' as the second.');
      }
      var props = property;

      // Update by object.
      for (var key in props) {
        state.data[key] = props[key];
      }
    } else if (typeof property === 'string') {
      // Update by value.
      state.data[property] = value;
    } else {
      throw new Error('data.set() takes either a string or an object as the first parameter. Received ' + (typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter)));
    }

    events.emit('dataChanged', state);
    _save(); // Save after every set.
  }

  return { get: get, set: set, _save: _save, _load: _load };
});

/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/layout.js ***!
  \****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = (function (state, events) {

  if (!state.layouts) state.layouts = [];

  function layout(conf) {
    // Validate
    if ((typeof conf === 'undefined' ? 'undefined' : _typeof(conf)) === 'object' && !Array.isArray(conf)) {
      // It's the right type of thing. Make sure it has the right properties.

      if (typeof conf.name !== 'string') {
        // name must exist and be a string
      }

      if (typeof conf.size !== 'string' && !Array.isArray(conf.size)) {
        // size must be a string or array
      }

      if (typeof conf.render !== 'function') {
        // must have a render function
      }

      state.layouts.push(conf); // Everything checks out
    } else {
      if (!conf) {
        throw new Error('api.layout() was called without any layout object.');
      } else {
        throw new Error('api.layout() takes a layout object as the first parameter. Received ' + (typeof conf === 'undefined' ? 'undefined' : _typeof(conf)));
      }
    }
  }

  function setLayout(name, transition) {
    console.log('Setting layout to ' + name);

    state.layoutName = name;
    events.emit('setLayout', name);
    // Render the layout for the current size, save it as state.dom and append it to state.root
  }

  return { layout: layout, setLayout: setLayout };
});

/***/ }),
/* 8 */
/*!************************************************************!*\
  !*** ./app/javascript/widget-api/api/v0/render.private.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_js__ = __webpack_require__(/*! ./element.js */ 0);


/* harmony default export */ __webpack_exports__["a"] = (function (state, events) {
  return function (root) {
    if (state.isRendered) {
      return false;
    }

    var _element2 = Object(__WEBPACK_IMPORTED_MODULE_0__element_js__["a" /* default */])(state),
        RAW = _element2.RAW;

    root = root || state.root;
    state.root = root;

    var layouts = state.layouts.filter(function (l) {
      return l.size === state.size;
    });

    if (state.dom) {
      state.dom.parentNode.removeChild(state.dom);
    }

    if (state.layoutName) {
      var layout = layouts.find(function (l) {
        return l.name === state.layoutName;
      });

      if (layout) {
        state.dom = layout.render();
      } else {
        state.dom = layouts[0].render();
      }
    } else if (layouts[0] || state.layouts[0]) {
      state.dom = layouts[0].render();
    }

    var toolbar = RAW('div', { class: 'widget-toolbar' }, [RAW('a', {
      href: '#',
      class: 'widget-toolbar-button',
      onClick: function onClick(e) {
        e.preventDefault();
        events.emit('destroyRequested', state.instanceID);
      }
    }, [RAW('img', { src: '/widget-x-icon.png' })])]);

    root.appendChild(toolbar);

    // root.appendChild(toolbar)
    root.appendChild(state.dom);

    state.isRendered = true;
  };
});

/***/ }),
/* 9 */
/*!***********************************************!*\
  !*** ./app/javascript/widget-layout/index.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dash_math_js__ = __webpack_require__(/*! ./dash-math.js */ 10);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Manages the layout of the dashboard



var dragCoordOffset = void 0;

function coordsInPixels(_ref, dashMath) {
  var x = _ref.x,
      y = _ref.y;

  return {
    x: x * dashMath.unitSize,
    y: y * dashMath.unitSize
  };
}

function showGridGuide() {
  var $guide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.dashboard-grid-square');

  if ($guide) {
    $guide.removeClass('hidden');
  }
}

function hideGridGuide() {
  var $guide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.dashboard-grid-square');

  if ($guide) {
    $guide.addClass('hidden');
  }
}

function moveGridGuideTo(_ref2) {
  var x = _ref2.x,
      y = _ref2.y;
  var $guide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $('.dashboard-grid-square');

  if ($guide) {
    $guide.css({ transform: 'translate(' + x + 'px, ' + y + 'px)' });
  }
}

function setGridGuideSize(w, h) {
  var $guide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : $('.dashboard-grid-square');

  if ($guide) {
    $guide.css({ width: w + 'px', height: h + 'px' });
  }
}

function getDragCoords(e, $root, widget, unitSize, dragCoordOffset) {
  var x = void 0,
      y = void 0;
  var container = widget.state.container;

  var gridBounds = $root[0].getBoundingClientRect();

  x = e.clientX - gridBounds.left; // - dragStartOffset.x
  y = e.clientY - gridBounds.top; // - dragStartOffset.y

  x /= unitSize;
  y /= unitSize;

  // Throw away fractional component
  x = ~~x;
  y = ~~y;

  // Adjust for coord offset
  x -= dragCoordOffset.x;
  y -= dragCoordOffset.y;

  return { x: x, y: y };
}

function setUpEvents($el, $root, widget, dm, update, widgets) {
  var dragImage = void 0;
  var $gridGuide = $('.dashboard-grid-square');

  $el.on('dragstart', function (e) {
    dragImage = dragImage || document.querySelector('#placeholder-pixel');
    e.originalEvent.dataTransfer.setDragImage(dragImage, 0, 0);
    $(this).addClass('dragging');

    var unitSize = dm.unitSize;

    var _widget$state$size$sp = widget.state.size.split('x').map(function (n) {
      return parseInt(n) * unitSize;
    }),
        _widget$state$size$sp2 = _slicedToArray(_widget$state$size$sp, 2),
        width = _widget$state$size$sp2[0],
        height = _widget$state$size$sp2[1];

    setGridGuideSize(width, height, $gridGuide);
    showGridGuide($gridGuide);

    dragCoordOffset = {
      x: ~~(e.offsetX / unitSize),
      y: ~~(e.offsetY / unitSize)
    };
  });

  $el.on('dragend', function (e) {
    e.originalEvent.preventDefault();
    $(this).removeClass('dragging');

    hideGridGuide($gridGuide);

    widget.coords = getDragCoords(e, $root, widget, dm.unitSize, dragCoordOffset);

    update();
  });

  var lastFire = 0;
  var last = { x: null, y: null };
  $root.on('dragover', function (e) {
    var now = Date.now();
    // Debounce. Otherwise this event fires ridiculously often.
    if (now - lastFire > 60) {
      var coords = getDragCoords(e, $root, widget, dm.unitSize, dragCoordOffset);
      var coordsAreDifferent = !(coords.x === last.x && coords.y === last.y);

      if (coordsAreDifferent) {
        moveGridGuideTo(coordsInPixels(coords, dm), $gridGuide);
        last = coords;
      }

      lastFire = now;
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var widgets = [];
  var $root = $('#dashboard-widgets');
  var $guide = $('\n    <div class="dashboard-grid-square">\n      <div class="dashboard-grid-fill"></div>\n    </div>');
  $root.append($guide);
  var dm = Object(__WEBPACK_IMPORTED_MODULE_0__dash_math_js__["a" /* default */])($root);

  function updateWidget(widget) {
    var _coordsInPixels = coordsInPixels(widget.coords || { x: 0, y: 0 }, dm),
        x = _coordsInPixels.x,
        y = _coordsInPixels.y;

    updateSize(widget);
    widget.state.container.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    widget.render();
  }

  function update() {
    widgets.forEach(updateWidget);
  }

  function add(widget) {
    var $el = $('<div class="widget-container"><div class="widget-root"></div></div>');
    $el.data('instance-id', widget.state.instanceID);
    $el.prop('draggable', true);
    $root.append($el);

    widgets.push(widget);

    // console.log(`${widgets.length} widget${widgets.length === 1 ? ' is' : 's are'} loaded`)

    setUpEvents($el, $root, widget, dm, update, widgets);
    widget.init($el[0]);
    updateWidget(widget);
  }

  function updateSize(widget) {
    var container = widget.state.container;

    var unitSize = dm.unitSize;

    var _widget$state$size$sp3 = widget.state.size.split('x').map(function (n) {
      return parseInt(n) * unitSize;
    }),
        _widget$state$size$sp4 = _slicedToArray(_widget$state$size$sp3, 2),
        w = _widget$state$size$sp4[0],
        h = _widget$state$size$sp4[1];

    container.width = w;
    container.height = h;
    container.style.width = w + 'px';
    container.style.height = h + 'px';
  }

  window.addEventListener('resize', function () {
    update();
  });

  return {
    add: add,
    updateSize: updateSize,
    update: update
  };
});

/***/ }),
/* 10 */
/*!***************************************************!*\
  !*** ./app/javascript/widget-layout/dash-math.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function ($root, $grid) {
  var props = {};

  window.addEventListener('resize', function () {
    console.log('resized');
    recalculate();
  });

  function recalculate() {
    var width = $root.parent().width();
    var columns = void 0;
    var unitSize = void 0;

    if (width > 1200) {
      columns = 12;
      unitSize = 100;
    } else if (width > 800) {
      columns = 8;
      unitSize = 100;
    } else if (width > 600) {
      columns = 6;
      unitSize = 100;
    } else if (width > 400) {
      columns = 4;
      unitSize = 100;
    } else {
      columns = 2;
      unitSize = width / columns;
    }

    props.unitSize = unitSize;
    props.columns = columns;

    console.log('recalculated', props);
  }

  function showGrid() {
    $grid.find('.dashboard-grid-square').width(props.unitSize).height(props.unitSize);
    $grid.show();
  }

  function hideGrid() {
    $grid.hide();
  }

  function getUnitSize() {
    return props.unitSize || 100;
  }

  recalculate();

  return {
    get unitSize() {
      return getUnitSize();
    },
    recalculate: recalculate,
    showGrid: showGrid,
    hideGrid: hideGrid
  };
});

/***/ })
/******/ ]);
//# sourceMappingURL=dashboard-35a885773faf4de06d3b.js.map