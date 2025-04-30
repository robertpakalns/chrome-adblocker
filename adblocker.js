const adDomains = [
    "adinplay.com",
    "amazon-adsystem.com",
    "doubleclick.net",
    "imasdk.googleapis.com",
    "pagead2.googlesyndication.com",
    "ads-twitter.com",
    "image6.pubmatic.com",
    "googleadservices.com",
    "adrecover.com",
    "bet365partners.com",

    "adbox.lv"
]

const trackerDomains = [
    "google-analytics.com",
    "googletagmanager.com"
]

const maliciousDomains = [
    "steamecommunjty.com",
    "sneamcommnumnlty.com",
    "steamconmmunity.cfd",
    "steamecommunnity.cfd",
    "casumonster.top",
    "e.vg"
]

const rules = [...trackerDomains, ...adDomains, ...maliciousDomains].map((domain, index) => ({
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