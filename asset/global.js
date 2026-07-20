// component (sorta clunky but it works)
    function loadBanner() {
        const bannerCT = document.createElement("div");
        bannerCT.id = "banner";
        bannerCT.innerHTML = `
            <img src="asset/images/banner.png">
        `;
        if (pageIsBlog() == true) {
            bannerCT.innerHTML = `
                <img src="../asset/images/banner.png">
            `;
        }
        document.body.prepend(bannerCT);
    }

    function loadNavigator() {
        const navigatorCT = document.createElement("div");
        navigatorCT.id = "navigator";
        navigatorCT.innerHTML = `
            <p>
                <a href="index.html">home</a>
                <a href="about.html">about</a>
                <a href="blog.html">blog</a>
                <a href="projects.html">projects</a>
            </p>
        `
        if (pageIsBlog() == true) {
            navigatorCT.innerHTML = `
                <p>
                    <a href="../index.html">home</a>
                    <a href="../about.html">about</a>
                    <a href="../blog.html">blog</a>
                    <a href="../projects.html">projects</a>
                </p>
            `
        }
        document.body.prepend(navigatorCT);
    }
    
    function loadFooter() {
        const footerCT = document.createElement("div");
        footerCT.id = "footer";
        footerCT.innerHTML = `
            <p>
                © 2026 Xleepree. all content on this website, unless otherwise noted,
                is licensed under a CC BY-NC-SA 4.0 license.
                ::
                est. Nov 3, 2024<br>
                <br>
                <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 3em;max-height:3em;margin-left: .2em;">
                <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 3em;max-height:3em;margin-left: .2em;">
                <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 3em;max-height:3em;margin-left: .2em;">
                <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 3em;max-height:3em;margin-left: .2em;">
            </p>
        `;
        document.body.append(footerCT);
    }
//

// functions for stuffs
    function viewportIsPortrait() { return window.innerHeight > window.innerWidth; }
    function pageIsBlog() { return window.location.pathname.includes("blog/");  }
    function checkForStatusPage() {
        let condition = false;
        if (document.head.title === "xleepree : about") { condition = true; }
        if (document.head.title === "xleepree : home") { condition = true; }
        return condition;
    }
//

// fill in status from "status" JSON folder
let statuses = {};
async function fillInStatus() {
    const homeStatus = document.getElementById("homeStatus");
    const aboutStatuses = document.getElementById("aboutStatuses");
    const statusResponse = await fetch("status.json");
    if (!statusResponse.ok) {
        console.error(`trying to fetch status.json returned ${statusResponse.status}`);
    } else {
        const json = await statusResponse.json();
        statuses = json;
    }
    const latestStatus = Math.max(...Object.keys(statuses).map(k => Number(k)));
    if (homeStatus) {
        homeStatus.innerHTML = 
            `<b>${statuses[latestStatus].date}:</b> "${statuses[latestStatus].text}"`;
    }
    if (aboutStatuses) {
        let big = document.createElement("span");
        let latestStatusElem = document.createElement("p");
        latestStatusElem.classList.add("status-now");
        latestStatusElem.innerHTML =
            `<b>${statuses[latestStatus].date} (latest):</b> "${statuses[latestStatus].text}"`;
        for (const [key, values] of Object.entries(statuses)) {
            if (key == latestStatus) { continue; }
            let elem = document.createElement("p");
            elem.innerHTML = 
                `<b>${values.date}:</b> "${values.text}"`;
            big.prepend(elem);
        }
        big.prepend(latestStatusElem);
        aboutStatuses.appendChild(big);
    }
}

// for quick access to onclick="window.location.pathname = 'blahblah'"
function navC(dest) {
    window.location.pathname = dest;
}

// listen
document.addEventListener("DOMContentLoaded", () => {
    loadNavigator();
    loadBanner();
    loadFooter();
    fillInStatus();
    setTimeout(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('ready');
        });
    }, 100);
});