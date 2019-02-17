(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("hyperapp")):"function"==typeof define&&define.amd?define(["exports","hyperapp"],e):e(t.hyperappRouter={},t.hyperapp)}(this,function(t,u){"use strict";function c(t){return t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")}function p(t,e,n,o){return{isExact:t,path:e,url:n,params:o}}function s(t){for(var e=t.length;"/"===t[--e];);return t.slice(0,e+1)}function l(e){try{return decodeURIComponent(e)}catch(t){return e}}var e={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(e){function t(t){e.set({pathname:window.location.pathname,previous:t.detail?window.location.previous=t.detail:window.location.previous})}var n=["pushState","replaceState"].reduce(function(t,e){var o=history[e];return history[e]=function(t,e,n){o.call(this,t,e,n),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=o,t&&t()}},null);return addEventListener("pushstate",t),addEventListener("popstate",t),function(){removeEventListener("pushstate",t),removeEventListener("popstate",t),n()}}};t.Link=function(a,i){return function(t,e){var n=a.to,o=t.location,r=a.onclick;return delete a.to,delete a.location,a.href=n,a.onclick=function(t){var e;r&&r(t),t.defaultPrevented||0!==t.button||t.altKey||t.metaKey||t.ctrlKey||t.shiftKey||"_blank"===a.target||(e=t.currentTarget,c(location)!==c(e))||(t.preventDefault(),n!==o.pathname&&history.pushState(o.pathname,"",n))},u.h("a",a,i)}},t.Route=function(r){return function(t,e){var n=t.location,o=function(t,e,n){if(t===e||!t)return p(t===e,t,e);var o=n&&n.exact,r=s(t).split("/"),a=s(e).split("/");if(!(r.length>a.length||o&&r.length<a.length)){var i=0,u={},c=r.length;for(e="";i<c;i++){if(":"===r[i][0])u[r[i].slice(1)]=a[i]=l(a[i]);else if(r[i]!==a[i])return;e+=a[i]+"/"}return p(!1,t,e.slice(0,-1),u)}}(r.path,n.pathname,{exact:!r.parent});return o&&r.render({match:o,location:n})}},t.Switch=function(t,r){return function(t,e){for(var n,o=0;!(n=r[o]&&r[o](t,e))&&o<r.length;)o++;return n}},t.Redirect=function(o){return function(t,e){var n=t.location;history.replaceState(o.from||n.pathname,"",o.to)}},t.location=e});

},{"hyperapp":2}],2:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;2<o--;)t.push(arguments[o]);for(;t.length;){var l=t.pop();if(l&&l.pop)for(o=l.length;o--;)t.push(l[o]);else null!=l&&!0!==l&&!1!==l&&r.push(l)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,l=[].map,u=r&&r.children[0]||null,i=u&&function n(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:l.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:n(e)})}}(u),f=[],m=!0,a=v(e),c=function e(r,o,l){for(var n in l)"function"==typeof l[n]?function(e,t){l[e]=function(e){var n=t(e);return"function"==typeof n&&(n=n(h(r,a),l)),n&&n!==(o=h(r,a))&&!n.then&&d(a=p(r,v(o,n),a)),n}}(n,l[n]):e(r.concat(n),o[n]=v(o[n]),l[n]=v(l[n]));return l}([],a,v(n));return d(),c;function g(e){return"function"==typeof e?g(e(a,c)):null!=e?e:""}function s(){o=!o;var e=g(t);for(r&&!o&&(u=function e(n,t,r,o,l){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var u=k(o,l);n.insertBefore(u,t),null!=r&&T(n,t,r),t=u}else if(null==r.nodeName)t.nodeValue=o;else{x(t,r.attributes,o.attributes,l=l||"svg"===o.nodeName);for(var i={},f={},a=[],c=r.children,s=o.children,d=0;d<c.length;d++){a[d]=t.childNodes[d];var v=N(c[d]);null!=v&&(i[v]=[a[d],c[d]])}for(var d=0,p=0;p<s.length;){var v=N(c[d]),h=N(s[p]=g(s[p]));if(f[v])d++;else if(null==h||h!==N(c[d+1]))if(null==h||m)null==v&&(e(t,a[d],c[d],s[p],l),p++),d++;else{var y=i[h]||[];v===h?(e(t,y[0],y[1],s[p],l),d++):y[0]?e(t,t.insertBefore(y[0],a[d]),y[1],s[p],l):e(t,a[d],null,s[p],l),f[h]=s[p],p++}else null==v&&T(t,a[d],c[d]),d++}for(;d<c.length;)null==N(c[d])&&T(t,a[d],c[d]),d++;for(var d in i)f[d]||T(t,i[d][0],i[d][1])}return t}(r,u,i,i=e)),m=!1;f.length;)f.pop()()}function d(){o||(o=!0,setTimeout(s))}function v(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function p(e,n,t){var r={};return e.length?(r[e[0]]=1<e.length?p(e.slice(1),n,t[e[0]]):n,v(t,r)):n}function h(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function N(e){return e?e.key:null}function y(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)if("string"==typeof t)e.style.cssText=t;else for(var l in"string"==typeof r&&(r=e.style.cssText=""),v(r,t)){var u=null==t||null==t[l]?"":t[l];"-"===l[0]?e.style.setProperty(l,u):e.style[l]=u}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},(e.events[n]=t)?r||e.addEventListener(n,y):e.removeEventListener(n,y)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),r=e.attributes;if(r){r.oncreate&&f.push(function(){r.oncreate(t)});for(var o=0;o<e.children.length;o++)t.appendChild(k(e.children[o]=g(e.children[o]),n));for(var l in r)b(t,l,r[l],null,n)}return t}function x(e,n,t,r){for(var o in v(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var l=m?t.oncreate:t.onupdate;l&&f.push(function(){l(e,n)})}function T(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (ajaxUrl) {
    return {
        saveEdit: function saveEdit(_ref) {
            var forms = _ref.forms,
                url = _ref.url,
                g_actions = _ref.g_actions;
            return function (state, actions) {
                actions.updateLoading(true);
                var item = forms;

                for (var k in item) {
                    var v = item[k];
                    if (Array.isArray(v)) {
                        item[k] = v.map(function (x) {
                            return {
                                'id': x.id,
                                'name': x.text
                            };
                        });
                    }
                }
                var saveUrl = '';
                var method = '';
                if (item.id) {
                    // UPDATE
                    saveUrl = ajaxUrl + item.id + '/';
                    method = 'PATCH';
                } else {
                    // CREATE
                    saveUrl = ajaxUrl + url;
                    method = 'POST';
                }

                window.setTimeout(function () {
                    fetch(saveUrl, {
                        body: JSON.stringify(item),
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': 'Token ' + state.key
                        },
                        method: method
                    }).then(function (response) {
                        actions.updateLoading(false);

                        if (response.status == 400) {
                            response.json().then(function (errors) {
                                actions.addErrors({ formname: 'edit', errors: errors });
                            });
                        } else if (response.status == 200 || response.status == 201) {
                            response.json().then(function (data) {
                                // Data is the object that was saved
                                g_actions.toasts.add({ text: 'Successfully saved object!', style: 'success' });
                                actions.updateEdit(null);
                                actions.load(state.current);
                            });
                        }
                    }).catch(function (error) {
                        console.log('ERR', error.status);
                    });
                }, 500);
            };
        }
    };
};

},{}],4:[function(require,module,exports){
'use strict';

var _forms = require('./forms.js');

module.exports = {
  login: function login(g_actions) {
    return function (state, actions) {
      actions.updateLoading(true);

      console.log(state.forms.login.username, "this the username");
      var data = {
        username: state.forms.login.username,
        password: state.forms.login.password
      };
      fetch(g_urls.login, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      }).then(function (j) {
        if (j.key) {
          actions.updateLogin({ key: j.key, username: state.forms.login.username });
          g_actions.location.go("/home");
        } else {
          g_actions.toasts.add({ text: "Error while logging in - please try again!", style: "error" });
        }
        actions.updateLoading(false);
      });
    };
  },

  logout: function logout(g_actions) {
    return function (state, actions) {
      actions.updateLoading(true);
      setTimeout(function () {
        return fetch(g_urls.logout, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        }).then(function (r) {
          return r.json();
        }).then(function (j) {
          actions.updateLogin({ key: null, username: null });
          g_actions.location.go("/login");
        });
      }, 500);
    };
  },
  updateLoading: function updateLoading(loading) {
    return function (state) {
      return {
        loading: loading
      };
    };
  },
  updateLogin: function updateLogin(_ref) {
    var key = _ref.key,
        username = _ref.username;
    return function (state) {
      localStorage.setItem("auth", JSON.stringify({ key: key, username: username }));
      return {
        key: key,
        username: username,
        forms: {
          login: {}
        }
      };
    };
  },
  updateField: _forms.updateField
};

},{"./forms.js":5}],5:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {

    updateField: function updateField(_ref) {
        var formname = _ref.formname,
            fieldname = _ref.fieldname,
            value = _ref.value;
        return function (state) {
            console.log("Update ", formname, fieldname, value);
            return {
                forms: Object.assign({}, state.forms, _defineProperty({}, formname, Object.assign({}, state.forms[formname], _defineProperty({}, fieldname, value))))
            };
        };
    },

    addErrors: function addErrors(_ref2) {
        var formname = _ref2.formname,
            errors = _ref2.errors;
        return function (state) {
            console.log("Add errors ", errors);
            return {
                forms: Object.assign({}, state.forms, _defineProperty({}, formname, Object.assign({}, state.forms[formname], {
                    errors: errors
                })))
            };
        };
    },

    searchAction: function searchAction(reset) {
        return function (state, actions) {
            if (reset) {
                actions.load(state.current.split('?')[0]);
                return {
                    forms: Object.assign({}, state['forms'], {
                        search: {}
                    })
                };
            } else {
                var params = Object.keys(state.forms.search).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(state.forms.search[k]);
                }).join('&');
                actions.load(state.current.split('?')[0] + '?' + params);
            }
        };
    }

};

},{}],6:[function(require,module,exports){
'use strict';

var _router = require('@hyperapp/router');

var _auth = require('./auth.js');

var _auth2 = _interopRequireDefault(_auth);

var _toasts = require('./toasts');

var _toasts2 = _interopRequireDefault(_toasts);

var _view_actions = require('./view_actions.js');

var _view_actions2 = _interopRequireDefault(_view_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = module.exports = {
    location: _router.location.actions,
    auth: _auth2.default,
    toasts: _toasts2.default
};

},{"./auth.js":4,"./toasts":7,"./view_actions.js":8,"@hyperapp/router":1}],7:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = {
  add: function add(_ref) {
    var text = _ref.text,
        style = _ref.style;
    return function (state, actions) {
      // Hide toast after 10 s
      window.setTimeout(function () {
        actions.hide(text);
      }, 10000);
      return {
        items: [].concat(_toConsumableArray(state.items), [{ text: text, style: style }])
      };
    };
  },

  hide: function hide(text) {
    return function (state) {
      var idx = state.items.map(function (v) {
        return v.text;
      }).indexOf(text);
      return {
        items: [].concat(_toConsumableArray(state.items.slice(0, idx)), _toConsumableArray(state.items.slice(idx + 1)))
      };
    };
  },
  clear: function clear() {
    return function (state) {
      return {
        items: []
      };
    };
  }
};

},{}],8:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ajax_forms = require("./ajax_forms.js");

var _ajax_forms2 = _interopRequireDefault(_ajax_forms);

var _forms = require("./forms.js");

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (ajaxUrl) {
  return _extends({
    load: function load(url) {
      return function (state, actions) {
        actions.updateLoading(true);

        setTimeout(function () {
          return fetch(url, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Token ' + state.key

            }
          }).then(function (r) {
            return r.json();
          }).then(function (j) {

            var match = url.match(/\?page=(\d+)/);
            var page = 1;
            if (match) page = 1 * match[1];
            actions.update({ response: j, current: url, page: page });
            actions.updateLoading(false);
          });
        }, 100);
      };
    },

    updateLoading: function updateLoading(loading) {
      return function (state) {
        return {
          loading: loading
        };
      };
    },

    update: function update(_ref) {
      var response = _ref.response,
          current = _ref.current,
          page = _ref.page;
      return function (state) {
        return {
          page: page,
          current: current,
          count: response.count,
          next: response.next,
          previous: response.previous,
          items: response.results
        };
      };
    },

    updateEdit: function updateEdit(item) {
      return function (state) {
        return {
          forms: Object.assign({}, state['forms'], {
            edit: item
          })
        };
      };
    }

  }, _forms2.default, (0, _ajax_forms2.default)(ajaxUrl));
};

},{"./ajax_forms.js":3,"./forms.js":5}],9:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var AbstractInput = function AbstractInput(_ref) {
    var field = _ref.field,
        action = _ref.action,
        realInput = _ref.realInput;
    return (0, _hyperapp.h)(
        'div',
        { 'class': 'form-group ' + (field.errors ? 'has-error' : ''), key: field.key },
        realInput,
        (0, _hyperapp.h)(
            'div',
            { 'class': 'form-input-hint' },
            field.errors ? field.errors[0] : null
        )
    );
};

var FormInput = function FormInput(_ref2) {
    var field = _ref2.field,
        action = _ref2.action;
    return AbstractInput({
        field: field,
        action: action,
        realInput: (0, _hyperapp.h)('input', { 'class': 'form-control', required: 'required', type: field.type, id: field.key,
            placeholder: field.label, value: field.value,
            oninput: function oninput(e) {
                return action(e.target.value);
            }
        })
    });
};

module.exports['FormInput'] = FormInput;

},{"hyperapp":2}],10:[function(require,module,exports){
"use strict";

var _router = require("@hyperapp/router");

var _require = require('hyperapp'),
    h = _require.h;

var Menu = function Menu(_ref) {
    var check = _ref.check;
    return h(
        "nav",
        { "class": "navbar-default navbar-side", role: "navigation" },
        h(
            "div",
            { "class": "sidebar-collapse" },
            h(
                "ul",
                { "class": "nav", id: "main-menu" },
                h(
                    "li",
                    { "class": "text-center" },
                    h("img", { src: g_urls.image + "/find_user.png", "class": "user-image img-responsive" })
                ),
                h(
                    "li",
                    null,
                    check == "home" ? h(
                        _router.Link,
                        { to: '/home', "class": "active-menu" },
                        h("i", { "class": "fa fa-home fa-3x" }),
                        " Home "
                    ) : h(
                        _router.Link,
                        { to: '/home' },
                        h("i", { "class": "fa fa-home fa-3x" }),
                        " Home"
                    )
                ),
                h(
                    "li",
                    null,
                    check == "reports" ? h(
                        _router.Link,
                        { to: '/reports', "class": "active-menu" },
                        h("i", { "class": "fa fa-bar-chart-o fa-3x" }),
                        " Resport"
                    ) : h(
                        _router.Link,
                        { to: '/reports' },
                        h("i", { "class": "fa fa-bar-chart-o fa-3x" }),
                        " Resport"
                    )
                ),
                h(
                    "li",
                    null,
                    check == "setting" ? h(
                        _router.Link,
                        { to: '/setting', "class": "active-menu" },
                        h("i", { "class": "fa fa-edit fa-3x" }),
                        " Setting"
                    ) : h(
                        _router.Link,
                        { to: '/setting' },
                        h("i", { "class": "fa fa-edit fa-3x" }),
                        " Setting"
                    )
                )
            )
        )
    );
};

module.exports['Menu'] = Menu;

},{"@hyperapp/router":1,"hyperapp":2}],11:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var Navbar = function Navbar(_ref) {
    var auth = _ref.auth,
        actions = _ref.actions;
    return h(
        "nav",
        { "class": "navbar navbar-default navbar-cls-top ", role: "navigation", style: { marginBottom: 0 } },
        console.log(auth),
        h(
            "div",
            { "class": "navbar-header" },
            h(
                "button",
                { type: "button", "class": "navbar-toggle", "data-toggle": "collapse", "data-target": ".sidebar-collapse" },
                h(
                    "span",
                    { "class": "sr-only" },
                    "Toggle navigation"
                ),
                h("span", { "class": "icon-bar" }),
                h("span", { "class": "icon-bar" }),
                h("span", { "class": "icon-bar" })
            ),
            h(
                "a",
                { "class": "navbar-brand", href: "index.html" },
                "Admin"
            )
        ),
        h(
            "div",
            { "class": "last-access" },
            " Welcome : ",
            auth.username,
            " \xA0 ",
            h(
                "button",
                { "class": "btn btn-danger square-btn-adjust", onclick: function onclick() {
                        return actions.auth.logout(actions);
                    } },
                "Logout"
            ),
            " "
        )
    );
};

module.exports['Navbar'] = Navbar;

},{"hyperapp":2}],12:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _router = require('@hyperapp/router');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _Main = require('./views/Main.js');

var _Main2 = _interopRequireDefault(_Main);

var _state = require('./state.js');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = (0, _hyperapp.app)(_state2.default, _actions2.default, _Main2.default, document.getElementById('wrapper'));

var unsubscribe = _router.location.subscribe(application.location);

var hideToasts = function hideToasts() {
  application.toasts.clear();
};

if (_state2.default.auth.key == null) {
  _actions2.default.location.go('/login');
} else {
  _actions2.default.location.go('/home');
}

addEventListener('pushstate', hideToasts);
addEventListener('popstate', hideToasts);

},{"./actions":6,"./state.js":13,"./views/Main.js":17,"@hyperapp/router":1,"hyperapp":2}],13:[function(require,module,exports){
'use strict';

var _auth = require('./util/auth.js');

var genericState = {
  loading: false,
  page: null,
  count: 0,
  next: null,
  previous: null,
  items: []

};

var existingAuth = (0, _auth.getExistingAuth)();

var state = module.exports = {
  auth: {
    key: existingAuth.key,
    username: existingAuth.username,
    loading: false,
    forms: {
      login: {},
      register: {}
    }
  },
  location: location.state,
  toasts: {
    items: []
  },

  shope: Object.assign({}, genericState, {
    key: existingAuth.key,
    forms: Object.assign({}, genericState['forms'], {
      name: {}
    })
  }),

  managercode: Object.assign({}, genericState, {
    key: existingAuth.key
  }),

  staffs: Object.assign({}, genericState, {
    key: existingAuth.key
  }),

  products: Object.assign({}, genericState, {
    key: existingAuth.key
  })

};

},{"./util/auth.js":14}],14:[function(require,module,exports){
'use strict';

var checkAuth = function checkAuth(list, auth) {
  if (auth.key) return list;
  return list.slice(0, -1);
};

var getExistingAuth = function getExistingAuth() {
  var existingAuth = localStorage.getItem('auth');

  if (existingAuth) {
    try {
      existingAuth = JSON.parse(existingAuth);
    } catch (error) {
      existingAuth = null;
    }
  }
  if (!existingAuth) existingAuth = { key: '', username: '' };
  return existingAuth;
};

module.exports = {
  checkAuth: checkAuth, getExistingAuth: getExistingAuth
};

},{}],15:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Menu = require('../components/Menu.js');

var _FormInput = require('../components/FormInput.js');

var Home = module.exports = function (state, actions, g_actions) {
    return (0, _hyperapp.h)(
        'div',
        { 'class': 'nav' },
        (0, _hyperapp.h)(
            'div',
            { 'class': 'modal fade', id: 'myModal', role: 'dialog' },
            (0, _hyperapp.h)(
                'div',
                { 'class': 'modal-dialog' },
                (0, _hyperapp.h)(
                    'div',
                    { 'class': 'modal-content' },
                    (0, _hyperapp.h)(
                        'div',
                        { 'class': 'modal-header' },
                        (0, _hyperapp.h)(
                            'button',
                            { type: 'button', 'class': 'close', 'data-dismiss': 'modal' },
                            '\xD7'
                        ),
                        (0, _hyperapp.h)(
                            'h4',
                            { 'class': 'modal-title' },
                            'Website automation testing'
                        )
                    ),
                    (0, _hyperapp.h)(
                        'div',
                        { 'class': 'modal-body' },
                        (0, _hyperapp.h)(_FormInput.FormInput, {
                            field: { label: 'Enter your site url', value: state.forms.login.url, type: 'text' },
                            action: function action(value) {
                                return actions.updateField({ formname: 'login', fieldname: 'url', value: value });
                            } })
                    ),
                    (0, _hyperapp.h)(
                        'div',
                        { 'class': 'modal-footer' },
                        (0, _hyperapp.h)(
                            'button',
                            { type: 'button', 'class': 'btn btn-danger', 'data-dismiss': 'modal' },
                            'Close'
                        ),
                        (0, _hyperapp.h)(
                            'button',
                            { type: 'button', 'class': 'btn btn-primary', 'data-dismiss': 'modal' },
                            'Let\'s GO'
                        )
                    )
                )
            )
        ),
        (0, _hyperapp.h)(_Menu.Menu, { check: 'home' }),
        (0, _hyperapp.h)(
            'div',
            { id: 'page-wrapper' },
            (0, _hyperapp.h)(
                'div',
                { id: 'page-inner' },
                (0, _hyperapp.h)(
                    'div',
                    { 'class': 'row' },
                    (0, _hyperapp.h)(
                        'div',
                        { 'class': 'col-md-12' },
                        (0, _hyperapp.h)(
                            'h2',
                            null,
                            'Admin Dashboard \xA0 \xA0',
                            (0, _hyperapp.h)(
                                'button',
                                { type: 'button', id: 'btnSubmit', 'class': 'btn btn-primary', 'data-toggle': 'modal', 'data-target': '#myModal' },
                                (0, _hyperapp.h)('i', { 'class': 'fa fa-plus fa-2x' })
                            )
                        )
                    )
                ),
                (0, _hyperapp.h)('hr', null)
            )
        )
    );
};

},{"../components/FormInput.js":9,"../components/Menu.js":10,"hyperapp":2}],16:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _FormInput = require("../components/FormInput.js");

var _router = require("@hyperapp/router");

var login = function login(e, actions, g_actions) {
    actions.login(g_actions);

    //console.log(g_actions);
    e.preventDefault();
    return false;
};

var Login = module.exports = function (state, actions, g_actions) {
    return (0, _hyperapp.h)(
        "div",
        { "class": "form-background" },
        (0, _hyperapp.h)(
            "div",
            { "class": "login-form" },
            (0, _hyperapp.h)(
                "form",
                { method: "post" },
                (0, _hyperapp.h)(
                    "h2",
                    { "class": "h2-login" },
                    "Log in"
                ),
                (0, _hyperapp.h)(_FormInput.FormInput, {
                    field: { label: 'Username', value: state.forms.login.username, type: 'text' },
                    action: function action(value) {
                        return actions.updateField({ formname: 'login', fieldname: 'username', value: value });
                    } }),
                (0, _hyperapp.h)(_FormInput.FormInput, {
                    field: { label: 'Password', value: state.forms.login.password, type: 'password' },
                    action: function action(value) {
                        return actions.updateField({ formname: 'login', fieldname: 'password', value: value });
                    } }),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group" },
                    (0, _hyperapp.h)(
                        "button",
                        { type: "submit", "class": "btn btn-primary btn-block", onclick: function onclick(e) {
                                login(e, actions, g_actions);
                            } },
                        "Log in"
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "clearfix" },
                    (0, _hyperapp.h)(
                        "label",
                        { "class": "pull-left checkbox-inline" },
                        (0, _hyperapp.h)("input", { type: "checkbox" }),
                        " Remember me"
                    ),
                    (0, _hyperapp.h)(
                        _router.Link,
                        { to: '/forgotpassword', "class": "pull-right" },
                        "Forgot Password?"
                    )
                )
            )
        )
    );
};

},{"../components/FormInput.js":9,"@hyperapp/router":1,"hyperapp":2}],17:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _router = require('@hyperapp/router');

var _Home = require('./Home.js');

var _Home2 = _interopRequireDefault(_Home);

var _Reports = require('./Reports.js');

var _Reports2 = _interopRequireDefault(_Reports);

var _Setting = require('./Setting.js');

var _Setting2 = _interopRequireDefault(_Setting);

var _Login = require('./Login.js');

var _Login2 = _interopRequireDefault(_Login);

var _Navbar = require('../components/Navbar.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, actions) {
  return (0, _hyperapp.h)(
    'div',
    null,
    state.auth.key != null ? (0, _hyperapp.h)(_Navbar.Navbar, { auth: state.auth, actions: actions }) : console.log("why"),
    (0, _hyperapp.h)(
      _router.Switch,
      null,
      (0, _hyperapp.h)(_router.Route, { path: '/login', render: function render() {
          return (0, _Login2.default)(state.auth, actions.auth, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/home', render: function render() {
          return (0, _Home2.default)(state.auth, actions.auth, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/reports', render: function render() {
          return (0, _Reports2.default)(state, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/setting', render: function render() {
          return (0, _Setting2.default)(state, actions);
        } })
    )
  );
};

},{"../components/Navbar.js":11,"./Home.js":15,"./Login.js":16,"./Reports.js":18,"./Setting.js":19,"@hyperapp/router":1,"hyperapp":2}],18:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _Menu = require("../components/Menu.js");

var Reports = module.exports = function (state, actions) {
   return (0, _hyperapp.h)(
      "div",
      { "class": "nav" },
      (0, _hyperapp.h)(_Menu.Menu, { check: "reports" }),
      (0, _hyperapp.h)(
         "div",
         { id: "page-wrapper" },
         (0, _hyperapp.h)(
            "div",
            { id: "page-inner" },
            (0, _hyperapp.h)(
               "div",
               { "class": "row" },
               (0, _hyperapp.h)(
                  "div",
                  { "class": "col-md-12" },
                  (0, _hyperapp.h)(
                     "h2",
                     null,
                     "Admin Dashboard"
                  ),
                  (0, _hyperapp.h)(
                     "h5",
                     null,
                     "Welcome Jhon Deo , Love to see you back. "
                  )
               )
            ),
            (0, _hyperapp.h)("hr", null)
         )
      )
   );
};

},{"../components/Menu.js":10,"hyperapp":2}],19:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _Menu = require("../components/Menu.js");

var Setting = module.exports = function (state, actions) {
   return (0, _hyperapp.h)(
      "div",
      { "class": "nav" },
      (0, _hyperapp.h)(_Menu.Menu, { check: "setting" }),
      (0, _hyperapp.h)(
         "div",
         { id: "page-wrapper" },
         (0, _hyperapp.h)(
            "div",
            { id: "page-inner" },
            (0, _hyperapp.h)(
               "div",
               { "class": "row" },
               (0, _hyperapp.h)(
                  "div",
                  { "class": "col-md-12" },
                  (0, _hyperapp.h)(
                     "h2",
                     null,
                     "Admin Dashboard"
                  ),
                  (0, _hyperapp.h)(
                     "h5",
                     null,
                     "Welcome Jhon Deo , Love to see you back. "
                  )
               )
            ),
            (0, _hyperapp.h)("hr", null)
         )
      )
   );
};

},{"../components/Menu.js":10,"hyperapp":2}]},{},[12]);
