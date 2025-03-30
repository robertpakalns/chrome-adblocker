const blockedDomains = [
    "adinplay.com"
]

const rules = blockedDomains.map(domain => ({
    id: blockedDomains.indexOf(domain) + 1,
    action: { type: "block" },
    condition: {
        urlFilter: domain,
        resourceTypes: ["main_frame", "sub_frame", "script", "image"]
    }
}))

chrome.declarativeNetRequest.updateDynamicRules({
    addRules: rules,
    removeRuleIds: rules.map(rule => rule.id)
})