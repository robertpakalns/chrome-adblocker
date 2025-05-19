const checkboxes = {
    ads: document.getElementById("ads"),
    trackers: document.getElementById("trackers"),
    malicious: document.getElementById("malicious")
}

const loadSettings = async () => {
    const { enabledCategories = [] } = await chrome.storage.local.get("enabledCategories")
    for (const key in checkboxes) checkboxes[key].checked = enabledCategories.includes(key)
}

const saveSettings = async () => {
    const enabledCategories = Object.keys(checkboxes).filter(key => checkboxes[key].checked)
    await chrome.storage.local.set({ enabledCategories })
    chrome.runtime.sendMessage({ type: "updateRules" })
}

for (const key in checkboxes) checkboxes[key].addEventListener("change", saveSettings)

loadSettings()