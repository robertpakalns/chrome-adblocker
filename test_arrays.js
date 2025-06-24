import adsRaw from "./assets/jsons/ads.json" with { type: "json" }
import maliciousRaw from "./assets/jsons/malicious.json" with { type: "json" }
import trackersRaw from "./assets/jsons/trackers.json" with { type: "json" }

const ads = adsRaw.map(el => el.toLowerCase())
const malicious = maliciousRaw.map(el => el.toLowerCase())
const trackers = trackersRaw.map(el => el.toLowerCase())

const checkSubstrings = (list, name) => {
    const issues = []

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if (i !== j && list[i].includes(list[j])) {
                issues.push(`"${list[j]}" is a substring of "${list[i]}"`)
            }
        }
    }

    if (issues.length === 0) console.log(`✅ ${name}: no substring issues found.`)
    else {
        console.log(`❌ ${name}: found substring conflicts:`)
        for (const issue of issues) console.log("   -", issue)
    }
}

const checkSorting = (list, rawList, name) => {
    const sorted = [...list].sort()
    const originalSorted = [...rawList.map(el => el.toLowerCase())]

    if (JSON.stringify(sorted) === JSON.stringify(originalSorted)) console.log(`✅ ${name}: list is already sorted.`)
    else {
        console.log(`🔃 ${name}: list is not sorted. Sorted list:`)
        console.log(JSON.stringify(sorted, null, 2))
    }
}

checkSubstrings(ads, "Ads")
checkSubstrings(malicious, "Malicious")
checkSubstrings(trackers, "Trackers")

checkSorting(ads, adsRaw, "Ads")
checkSorting(malicious, maliciousRaw, "Malicious")
checkSorting(trackers, trackersRaw, "Trackers")