// component (sorta clunky but it works)
    const navigatorCT = document.createElement("div");
    navigatorCT.id = "navigator";
    navigatorCT.innerHTML = `
        <div class="navigator-links" style="float: left">
            <a href="index.html">home</a>
            <a href="about.html">about</a>
        </div>
        <div id="navigatorMenuIcon" onclick="toggleNavigatorMenu()">
            <img src="asset/favicon.png">
        </div>
        <div class="navigator-links" style="float: right">
            <a href="blog.html">blog</a>
            <a href="projects.html">projects</a>
        </div>
    `
    if (pageIsBlog() == true) {
        navigatorCT.innerHTML = `
            <div class="navigator-links" style="float: left">
                <a href="../index.html">home</a>
                <a href="../about.html">about</a>
            </div>
            <div id="navigatorMenuIcon" onclick="toggleNavigatorMenu()">
                <img src="../asset/favicon.png">
            </div>
            <div class="navigator-links" style="float: right">
                <a href="../blog.html">blog</a>
                <a href="../projects.html">projects</a>
            </div>
        `
    }
    function loadNavigator() {
        document.body.prepend(navigatorCT);
    }

    const pageBackgroundCT = document.createElement("div");
    pageBackgroundCT.id = "pageBackground";
    function loadPageBackground() {
        document.body.prepend(pageBackgroundCT);
    }

    const navigatorMenuCT = document.createElement("div");
    navigatorMenuCT.id = "navigatorMenu";
    navigatorMenuCT.innerHTML = `
        <h1 style="margin-bottom: -0.5em">xleepree.pages.dev</h1>
        <p style="margin-bottom: -0.8em">version 3.0.0 :: est. Nov 3, 2024 :: hosted with Cloudflare</p>
        <p>
            <a href="https://github.com/Xleepree/xleepree-webtite">repository </a>
            ::
            <a href="mailto:xleepree.pages.mail@gmail.com"> contact</a>
        </p>
        <span id="navigatorMenuThemeButtons">
            <button onclick="setTheme('')">light</button>
            <button onclick="setTheme('dark')">dark</button>
        </span>
    `;
    let navigatorMenuToggleInt = 0;
    function toggleNavigatorMenu() {
        if (navigatorMenuToggleInt == 0) {
            document.body.prepend(navigatorMenuCT);
            const navigatorMenu = document.getElementById("navigatorMenu");
            navigatorMenu.style.animation = "animFadeIn 0.2s ease-in-out";
            navigatorMenu.style.opacity = "1";
            navigatorMenuToggleInt = 1;
        } else if (navigatorMenuToggleInt == 1) {
            const navigatorMenu = document.getElementById("navigatorMenu");
            navigatorMenu.style.animation = "animFadeOut 0.2s ease-in-out"
            navigatorMenu.style.opacity = "0";
            setTimeout(() => { navigatorMenu.remove(); }, 300);
            navigatorMenuToggleInt = 0;
        }
    }
//

// functions for stuffs
    function viewportIsPortrait() { return window.innerHeight > window.innerWidth; }
    function pageIsBlog() { return window.location.pathname.includes("blog/");  }
//

// for quick access to onclick="window.location.pathname = 'blahblah'"
function navC(dest) {
    window.location.pathname = dest;
}

// theme 
function setTheme(theme) {
    document.documentElement.classList.remove("dark");
    if (theme) { document.documentElement.classList.add(theme); }
    localStorage.setItem("theme", theme);
}

// listen
    window.addEventListener("beforeunload", () => {
        requestAnimationFrame(() => {
            document.body.classList.remove('ready');
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme") || "";
        if (savedTheme) { document.documentElement.classList.add(savedTheme); }

        loadNavigator();
        loadPageBackground();

        requestAnimationFrame(() => {
            document.body.classList.add('ready');
        });
    });
//