const checkboxes = {
    ads: document.getElementById("ads"),
    trackers: document.getElementById("trackers"),
    malicious: document.getElementById("malicious")
}
const hintElement = document.getElementById("hint")
let hintTimeout = null

const loadSettings = async () => {
    hintElement.innerText = ""

    const { enabledCategories = [] } = await chrome.storage.local.get("enabledCategories")
    for (const key in checkboxes) checkboxes[key].checked = enabledCategories.includes(key)
}

const showHint = text => {
    hintElement.innerText = text
    hintElement.classList.add("visible")

    if (hintTimeout !== null) clearTimeout(hintTimeout)
    hintTimeout = setTimeout(() => {
        hintElement.classList.remove("visible");
        setTimeout(() => hintElement.innerText = "", 500)
        hintTimeout = null
    }, 3000)
}

const saveSettings = async () => {
    const enabledCategories = Object.keys(checkboxes).filter(key => checkboxes[key].checked)
    await chrome.storage.local.set({ enabledCategories })
    chrome.runtime.sendMessage({ type: "updateRules" })

    showHint("Refresh the page to apply the changes")
}


for (const key in checkboxes) checkboxes[key].addEventListener("change", saveSettings)

loadSettings()