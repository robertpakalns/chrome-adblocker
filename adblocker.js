const _appendChild = Element.prototype.appendChild
Element.prototype.appendChild = function (e) {
    return e.src?.includes("adinplay.com") || _appendChild.call(this, e)
}

const _write = document.write
document.write = function (el) {
    return el.includes("adinplay.com") || _write.call(this, el)
}