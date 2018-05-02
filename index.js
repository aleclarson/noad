
const $ = require('dough')

const createElem = $.elem
const applyProps = $._initAttributes
const forEach = Function.call.bind(Array.prototype.forEach)

module.exports = function noad(tag, props) {
  const node = createElem(tag)
  if (props) applyProps(node, props)
  return new Noad(node)
}

function Noad(node) {
  this.n = node
}

Noad.prototype = {
  constructor: Noad,
  class(val) {
    this.n.className = val
    return this
  },
  text(val) {
    this.n.textContent = val
    return this
  },
  html(val) {
    this.n.innerHTML = val
    return this
  },
  attr(arg1, arg2) {
    if (arguments.length == 2) {
      this.n.setAttribute($.kebab(arg1), arg2)
    } else {
      for (let key in arg1) {
        const val = arg1[key]
        this.n.setAttribute($.kebab(key), val)
      }
    }
  },
  children(fn) {
    if (typeof fn == 'function') {
      const parent = this.n
      fn(function noad(tag, props) {
        const node = createElem(tag)
        if (props) applyProps(node, props)
        return new Noad(parent.appendChild(node))
      })
    } else {
      forEach(arguments, append, this.n)
    }
    return this
  },
  clone() {
    return $(this.n.cloneNode(true))
  }
}

function append(val) {
  if (Array.isArray(val)) {
    val.forEach(append, this)
  } else {
    this.appendChild(val.n || val)
  }
}
