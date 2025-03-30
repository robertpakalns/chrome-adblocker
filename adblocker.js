const blockedDomains = [
    "adinplay.com"
]

const domainsSet = new Set(blockedDomains)

const rules = [...domainsSet].map((domain, index) => ({
    id: index + 1,
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