const addedAddonsListElement = document.querySelector(".sortable-list");
const loadAddonButton = document.getElementById("load_addons_button");
const syncAddonsButton = document.getElementById("sync_addons_button");

addonList = [];

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...addedAddonsListElement.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.getBoundingClientRect().top;
    });

    // Inserting the dragging item before the found sibling
    addedAddonsListElement.insertBefore(draggingItem, nextSibling);

    // Update local addon list
    syncLocalAddonList();
}

function removeAddon(url) {
    // Remove addon from list
    addonList = addonList.filter(addon => addon.transportUrl != url);
    // Remove addon from list
    removeAddonFromList(url);
}

function getAuthKey() {
    // Strip "'s and spaces from AuthKey in case user pasted them in
    return document.getElementById("stremio_authkey_input_field").value.replaceAll('"', '').trim();
}

async function loadAddons() {
    var authKey = getAuthKey();
    if (!authKey) {
        alert("Please enter your Stremio auth key");
        throw new Error("No auth key");
    }
    var json = JSON.stringify({
        type: 'AddonCollectionGet',
        authKey,
        update: true,
    });
    var addons = await fetch('https://api.strem.io/api/addonCollectionGet', {
        method: 'POST',
        body: json,
    })
        .then((res) => res.json())
        .then((data) => data.result.addons);
    return addons;
}

async function syncAddons() {
    var authKey = getAuthKey();
    var json = JSON.stringify({
        type: 'AddonCollectionSet',
        authKey,
        addons: addonList,
    });
    var addons = await fetch('https://api.strem.io/api/addonCollectionSet', {
        method: 'POST',
        body: json,
    })
        .then((res) => res.json())
        .then((data) => {
            if (!("result" in data) || data.result == null) {
                alert("Failed to sync addons with unknown error");
            } else if (!data.result.success) {
                alert("Failed to sync addons: " + data.result.error);
            } else {
                alert("Successfully synced addons!");
            }
        });
    return addons;
}

function addAddonToList(addon) {
    const item = document.createElement("li");
    item.className = "item";
    item.draggable = true;
    item.setAttribute("data-url", addon.transportUrl);
    item.setAttribute("data-addon", JSON.stringify(addon));
    item.innerHTML = `
        <div class="col-8">
            <div class="details">
                <div class="logo_container">
                </div>
                <span>${addon.manifest.name}</span>
            </div>
        </div>
        <div class="col">
    `;

    // Populate logo or use a placeholder if manifest doesn't define one
    if (addon.manifest.logo) {
        item.querySelector(".logo_container").innerHTML = `<img src="${addon.manifest.logo}" alt="${addon.manifest.name}" />`;
    } else {
        item.querySelector(".logo_container").innerHTML = `<img src="https://icongr.am/feather/box.svg?size=12" alt="${addon.manifest.name}" />`;
    }

    addonConfigurable = false;
    if (addon.manifest.behaviorHints && addon.manifest.behaviorHints.configurable) {
        addonConfigurable = true;
        item.innerHTML += `
            <button class="button icon-only visit-url" title="Open addon configuration page in new window">
                <img src="https://icongr.am/feather/arrow-up-right.svg?size=12">
            </button>
        `;
    }
    item.innerHTML += `
            <button class="button icon-only copy-url" title="Copy addon manifest URL to clipboard">
                <img src="https://icongr.am/feather/clipboard.svg?size=12">
            </button>
            `;
    // Only show delete button if addon is not protected
    addonDeletable = true;
    if ("flags" in addon && addon.flags.protected) {
        addonDeletable = false;
    } else {
        item.innerHTML += `
        <button class="button icon-only delete" title="Remove addon from list">
            <img src="https://icongr.am/feather/trash-2.svg?size=12">
        </button>
        `;
    }
    item.innerHTML += `
    <i class="uil uil-draggabledots"></i>
        </div >
        `;
    addedAddonsListElement.appendChild(item);

    // Add elem event listeners
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
    // Add copy url button event listener
    item.querySelector(".button.icon-only.copy-url").addEventListener("click", e => {
        e.preventDefault();
        navigator.clipboard.writeText(addon.transportUrl);
    });
    // Add delete button event listener
    if (addonDeletable) {
        item.querySelector(".button.icon-only.delete").addEventListener("click", e => {
            e.preventDefault();
            removeAddon(addon.transportUrl);
        });
    }
    // Add visit addon configuration endpoint
    if (addonConfigurable) {
        // Add visit url button event listener - replacing protocol with https and path with /configure
        item.querySelector(".button.icon-only.visit-url").addEventListener("click", e => {
            e.preventDefault();
            window.open(addon.transportUrl.replace("stremio://", "https://").replace("/manifest.json", "/configure"));
        });
    }
}

function removeAddonFromList(url) {
    const item = addedAddonsListElement.querySelector(`[data-url="${url}"]`);
    item.remove();
}

function syncLocalAddonList() {
    const items = addedAddonsListElement.querySelectorAll(".item");
    addonList = [];
    items.forEach(item => {
        addonList.push(JSON.parse(item.getAttribute("data-addon")));
    });
}

async function main() {
    addedAddonsListElement.addEventListener("dragover", initSortableList);
    addedAddonsListElement.addEventListener("dragenter", e => e.preventDefault());

    syncAddonsButton.addEventListener("click", syncAddons);
    loadAddonButton.addEventListener("click", async (e) => {
        e.preventDefault();

        await loadAddons().then((addons) => {
            addons.forEach((addon) => {
                addAddonToList(addon);
                addonList.push(addon);
            });
        });
    });
}

main().then(() => console.log('done')).catch(console.error);
