document.addEventListener("DOMContentLoaded", function () {
    const siteInput = document.getElementById("siteInput");
    const addSiteBtn = document.getElementById("addSiteBtn");
    const siteList = document.getElementById("siteList");

    // Load stored blocked sites
    chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];
        updateSiteList(blockedSites);
    });

    // Add site to blocklist
    addSiteBtn.addEventListener("click", function () {
        let site = siteInput.value.trim();
        if (!site) return;
        
        chrome.storage.sync.get("blockedSites", function (data) {
            let blockedSites = data.blockedSites || [];
            if (!blockedSites.includes(site)) {
                blockedSites.push(site);
                chrome.storage.sync.set({ blockedSites }, () => updateSiteList(blockedSites));
            }
        });

        siteInput.value = "";
    });

    // Remove site from blocklist
    function removeSite(site) {
        chrome.storage.sync.get("blockedSites", function (data) {
            let blockedSites = data.blockedSites || [];
            blockedSites = blockedSites.filter(s => s !== site);
            chrome.storage.sync.set({ blockedSites }, () => updateSiteList(blockedSites));
        });
    }

    // Update site list UI
    function updateSiteList(blockedSites) {
        siteList.innerHTML = "";
        blockedSites.forEach(site => {
            const li = document.createElement("li");
            li.innerHTML = `${site} <button class="remove-btn" data-site="${site}">❌</button>`;
            siteList.appendChild(li);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                removeSite(this.dataset.site);
            });
        });

        // Update blocking rules
        updateBlockingRules(blockedSites);
    }

    // Update extension blocking rules
    function updateBlockingRules(blockedSites) {
        let rules = blockedSites.map((site, index) => ({
            id: 1000 + index,
            priority: 1,
            action: { type: "redirect", redirect: { url: "http://localhost:3000/blocked" } },
            condition: { urlFilter: `*://*.${site}/*`, resourceTypes: ["main_frame"] }
        }));

        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1000, 1001, 1002], addRules: rules });
    }
});
document.getElementById("startFocus").addEventListener("click", function () {
    let minutes = document.getElementById("focusDuration").value;
    if (!minutes || minutes <= 0) return alert("Enter a valid duration!");

    chrome.storage.sync.set({ focusActive: true, focusEndTime: Date.now() + minutes * 60000 }, function () {
        document.getElementById("startFocus").disabled = true;
        document.getElementById("endFocus").disabled = false;
    });
});

document.getElementById("endFocus").addEventListener("click", function () {
    chrome.storage.sync.set({ focusActive: false }, function () {
        document.getElementById("startFocus").disabled = false;
        document.getElementById("endFocus").disabled = true;
    });
});

// Auto update buttons on load
chrome.storage.sync.get("focusActive", function (data) {
    document.getElementById("startFocus").disabled = data.focusActive || false;
    document.getElementById("endFocus").disabled = !data.focusActive;
});
