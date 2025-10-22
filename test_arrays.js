import { writeFileSync } from "fs";
import { join, resolve } from "path";
import adsRaw from "./assets/jsons/ads.json" with { type: "json" };
import maliciousRaw from "./assets/jsons/malicious.json" with { type: "json" };
import trackersRaw from "./assets/jsons/trackers.json" with { type: "json" };
import scamsRaw from "./assets/jsons/scams.json" with { type: "json" };

const processList = (raw, name, path) => {
  let processed = false;
  const lowerList = raw.map((el) => el.toLowerCase());
  const list = [...new Set(lowerList)];

  const toRemove = new Set();
  const issues = [];

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (i !== j && list[i].includes(list[j])) {
        issues.push(`"${list[j]}" is a substring of "${list[i]}"`);
        toRemove.add(list[i]);
      }
    }
  }

  if (issues.length > 0) {
    processed = true;
    console.log(`❌ ${name}: found substring conflicts:`);
    for (const issue of issues) console.log("   -", issue);
  }

  const processedList = [...list.filter((el) => !toRemove.has(el))].sort();
  if (JSON.stringify(lowerList) !== JSON.stringify(processedList)) {
    processed = true;
    console.log(`❌ ${name}: list was not sorted or had conflicts, fixing...`);
  }

  if (!processed) {
    console.log(`✅ ${name}: no conflicts found.`);
  } else {
    console.log(`✅ ${name}: writing processed list to file...`);
    writeFileSync(path, JSON.stringify(processedList, null, 2), "utf-8");
  }
};

const jsonsDir = resolve("./assets/jsons");

processList(adsRaw, "Ads", join(jsonsDir, "ads.json"));
processList(maliciousRaw, "Malicious", join(jsonsDir, "malicious.json"));
processList(trackersRaw, "Trackers", join(jsonsDir, "trackers.json"));
processList(scamsRaw, "Scams", join(jsonsDir, "scams.json"));
