const script = document.createElement("script")
script.src = chrome.runtime.getURL("adblocker.js")
document.documentElement.appendChild(script)