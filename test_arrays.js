import blackListRaw from "./assets/blacklist.json" with { type: "json" };
import whiteListRaw from "./assets/whitelist.json" with { type: "json" };

const processList = (raw, name) => {
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
    console.log(`❌ ${name}: list was not sorted, fixing...`);
  }

  if (!processed) {
    console.log(`✅ ${name}: no conflicts found.`);
  } else {
    console.log("✅ Processed list:\n", JSON.stringify(processedList));
  }
};

processList(blackListRaw, "Blacklist");
processList(whiteListRaw, "Whitelist");
