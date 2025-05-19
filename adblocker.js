const loadDomainList = async category => {
    const url = chrome.runtime.getURL(`assets/jsons/${category}.json`)
    const res = await fetch(url)
    return res.json()
}

const updateRules = async () => {
    const { enabledCategories = [] } = await chrome.storage.local.get("enabledCategories")

    const lists = await Promise.all(enabledCategories.map(loadDomainList))
    const domainsToBlock = lists.flat()

    const rules = domainsToBlock.map((domain, index) => ({
        id: index + 1,
        action: { type: "block" },
        condition: {
            urlFilter: domain,
            resourceTypes: ["main_frame", "sub_frame", "script", "image"]
        }
    }))

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1),
        addRules: rules
    })
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "updateRules") {
        updateRules().then(() => sendResponse({ success: true }))
        return true
    }
})