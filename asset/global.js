// component (sorta clunky but it works)
    const navbarCT = document.createElement("div");
    const screenCT = document.createElement("div");

    navbarCT.innerHTML = `
        <div class="navbar">
            <a href="index.html" id="linkHome">home</a>
            <a href="about.html" id="linkAbout">about</a>
            <a href="blog.html" id="linkBlog">blog</a>
            <a href="projects.html" id="linkProjects">projects</a>
        </div>
    `

    if (pageIsBlog() == true) {
        navbarCT.innerHTML = `
            <div class="navbar">
                <a href="../index.html" id="linkHome">home</a>
                <a href="../about.html" id="linkAbout">about</a>
                <a href="../blog.html" id="linkBlog">blog</a>
                <a href="../projects.html" id="linkProjects">projects</a>
            </div>
        `
    }

    screenCT.innerHTML = `
        <button id="screenButton"><b> > </b></button>
        <div id="screen">
            <img src="https://xleepree.pages.dev/asset/favicon.png" class="screen-icon">
            <h1 style="margin-bottom: -0.5em;">xleepree.pages.dev</h1>
            <p style="margin-bottom: -0.1em;">version 3.0.0 :: est. Nov 3, 2024 :: hosted with Cloudflare</p>
            <div><a href="mailto:xleepree.pages.mail@gmail.com">contact</a> // <a href="https://github.com/Xleepree/xleepree-webtite">repository</a></div>
            <div class="theme-switcher">
                <p>
                    theme:
                    <button onclick="setTheme('')">light</button>
                    <button onclick="setTheme('dark')">dark</button>
                </p>
            </div>
        </div>
    `
//

// functions for stuffs
    function viewportIsPortrait() { return window.innerHeight > window.innerWidth; }
    function pageIsBlog() { return window.location.pathname.includes("blog/");  }
//

// for quick access to onclick="window.location.pathname = 'blahblah'"
function navC(dest) {
    window.location.pathname = dest;
}

// components (loading)
    function loadNavbar() {
        document.body.append(navbarCT);
    }

    function loadScreen() {
        document.body.prepend(screenCT);
    }
//

// theme 
function setTheme(theme) {
    document.documentElement.classList.remove("dark");
    if (theme) { document.documentElement.classList.add(theme); }
    localStorage.setItem("theme", theme);
}

// listen
    window.addEventListener("beforeunload", () => {
        const screenButton = document.getElementById("screenButton");
        requestAnimationFrame(() => {
            document.body.classList.remove('ready');
            screenButton.classList.remove('ready');
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme") || "";
        if (savedTheme) { document.documentElement.classList.add(savedTheme); }

        loadNavbar();
        loadScreen();

        const screen = document.getElementById("screen");
        const screenButton = document.getElementById("screenButton");

        function screenF() {
            if (screen.classList.contains("initialized")) {
                screen.classList.remove("initialized");
            } else {
                screen.classList.add("initialized");
            }
        }

        screenButton.addEventListener("click", () => { screenF(); });

        requestAnimationFrame(() => {
            document.body.classList.add('ready');
            screenButton.classList.add('ready');
        });

        if (viewportIsPortrait() === true ) {
            screenButton.innerHTML = `>`
        }
    });
//