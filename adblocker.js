const blockedDomains = [
    "adinplay.com",
    "amazon-adsystem.com",
    "doubleclick.net",
    "imasdk.googleapis.com",
    "pagead2.googlesyndication.com",
    "ads-twitter.com",
    "image6.pubmatic.com",

    "adbox.lv"
]

const rules = blockedDomains.map((domain, index) => ({
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