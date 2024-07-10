// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
'use strict';

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var state = {
  maxHp: 100,
  deck: [],
  hand: [],
  graveyard: [],
  relicBelt: [],
  relicPool: [],
  cardPool: [],
  hp: 100,
  gold: 0,
  level: 0,
  currentScreen: "path",
  presentedPathOptions: [],
  presentedRewardOptions: [],
  currentEnemy: null,
  restHealAmount: 25
};
var pathOptions = [{
  name: "Three Carrots",
  level: 0,
  hp: 3,
  goldReward: 3,
  screen: "combat"
}, {
  name: "Four Carrots",
  level: 0,
  hp: 4,
  goldReward: 4,
  screen: "combat"
}, {
  name: "Five Carrots",
  level: 0,
  hp: 5,
  goldReward: 5,
  screen: "combat"
}, {
  name: "Six Carrots",
  level: 0,
  hp: 6,
  goldReward: 6,
  screen: "combat"
}, {
  name: "Rest",
  level: 0,
  screen: "rest"
}];
var rewardOptions = [{
  name: "Extra ten gold",
  level: 1,
  goldReward: 10,
  type: "instant"
}, {
  name: "Heal ten HP",
  level: 1,
  hpHeal: 10,
  type: "instant"
}, {
  name: "Small relic",
  level: 1,
  type: "relic"
}, {
  name: "card",
  level: 1,
  type: "card"
}, {
  name: "Card removal",
  level: 1,
  type: "deck service"
}, {
  name: "Card upgrade",
  level: 1,
  type: "deck service"
}];
function path() {
  state.currentScreen = "path";
  var appropriatePathOptions = pathOptions.filter(function (pathOption) {
    return pathOption.level == state.level;
  });
  var presentedPathOptions = [];
  for (var i = 0; i < 3; i++) {
    var presentedPathOptionIndex = Math.floor(appropriatePathOptions.length * Math.random());
    presentedPathOptions.push(appropriatePathOptions[presentedPathOptionIndex]);
    appropriatePathOptions.splice(presentedPathOptionIndex, 1);
  }
  state.presentedPathOptions = presentedPathOptions;
  render(state);
}
function rest() {
  state.currentScreen = "rest";
  state.hp = Math.min(state.hp + state.restHealAmount, state.maxHp);
  state.level = state.level + 1;
  render(state);
}
function combat() {
  state.currentScreen = "combat";
  state.level = state.level + 1;
  state.hp = state.hp - 1;
  render(state);
}
function reward() {
  state.currentScreen = 'reward';
  var appropriateRewardOptions = rewardOptions.filter(function (rewardOption) {
    return rewardOption.level == state.level;
  });
  var presentedRewardOptions = [];
  for (var i = 0; i < 3; i++) {
    var presentedRewardOptionIndex = Math.floor(appropriateRewardOptions.length * Math.random());
    presentedRewardOptions.push(appropriateRewardOptions[presentedRewardOptionIndex]);
    appropriateRewardOptions.splice(presentedRewardOptionIndex, 1);
  }
  state.presentedRewardOptions = presentedRewardOptions;
  render(state);
}
function applyReward(option) {
  if (option.type == "instant") {
    state.hp = Math.min(state.hp + (option.hpHeal || 0), state.maxHp);
    state.gold = state.gold + (option.goldReward || 0);
  } else if (option.type == 'relic') {
    // move the selected option from the relic pool to the relic belt.
  } else if (option.type == 'card') {
    // add a copy of the selected option to your deck
  } else if (option.type == 'deck service') {
    // launches the subscreen where you can peruse your deck and select 1 card for an effect (removal or upgrade)
  } else {
    throw "unknown reward type" + option.type;
  }
}
function render(state) {
  renderHud();
  if (state.currentScreen == "path") {
    var options = state.presentedPathOptions;
    var html = '';
    for (var optionIndex in options) {
      var option = options[optionIndex];
      html += '<button data-index="' + optionIndex + '">';
      html += option.name;
      html += '</button>';
    }
    var outputDiv = document.querySelector('#output');
    outputDiv.innerHTML = html;
    var btnElems = document.querySelectorAll('#output button');
    var _iterator = _createForOfIteratorHelper(btnElems),
      _step;
    try {
      var _loop = function _loop() {
        var btnElem = _step.value;
        btnElem.addEventListener('click', function () {
          var name = btnElem.innerHTML;
          alert('You clicked ' + name);
          var option = options[btnElem.dataset.index];
          state.currentScreen = option.screen;
          if (state.currentScreen == 'combat') {
            state.currentEnemy = option;
            combat();
          } else if (state.currentScreen == 'rest') {
            rest();
          } else {
            throw "Unknown screen: " + state.currentScreen;
          }
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (state.currentScreen == "rest") {
    //play animation for 3 seconds - ideally, fade to black, little fireplace crackling, big green +# hp heal visual, and the HP # ticks up visibly, then fade back to path select.
    var _html = 'REST ' + state.hp;
    var _outputDiv = document.querySelector('#output');
    _outputDiv.innerHTML = _html;
    setTimeout(function () {
      path();
    }, 3000);
  } else if (state.currentScreen == "combat") {
    reward();
  } else if (state.currentScreen == 'reward') {
    var _options = state.presentedRewardOptions;
    var _html2 = '';
    for (var _optionIndex in _options) {
      var _option = _options[_optionIndex];
      _html2 += '<button data-index="' + _optionIndex + '">';
      _html2 += _option.name;
      _html2 += '</button>';
    }
    var _outputDiv2 = document.querySelector('#output');
    _outputDiv2.innerHTML = _html2;
    var _btnElems = document.querySelectorAll('#output button');
    var _iterator2 = _createForOfIteratorHelper(_btnElems),
      _step2;
    try {
      var _loop2 = function _loop2() {
        var btnElem = _step2.value;
        btnElem.addEventListener('click', function () {
          var name = btnElem.innerHTML;
          alert('You clicked ' + name);
          var option = _options[btnElem.dataset.index];
          //reward effect
          applyReward(option);
          renderHud();
          renderRelicBelt();
          path();
        });
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else {
    throw "unknown screen" + state.currentScreen;
  }
}
function renderHud() {
  var html = '';
  html += 'HP: ' + state.hp + "/" + state.maxHp + ", ";
  html += 'Gold: ' + state.gold + ", ";
  html += 'Level ' + state.level + ", ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  html += 'Deck ' + state.deck.length;
  document.querySelector('#hud').innerHTML = html;
}
function renderRelicBelt() {}
path();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64097" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map